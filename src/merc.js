/*
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 * @flow
 * @format
 */

import type {SerializableAppState} from './types';

import invariant from 'assert';
import yargs from 'yargs';
import {update} from './HgUtils';
import {dumpSubtree} from './debug';
import debugLog from './debugLog';
import getFileDependencies from './subtree/getFileDependencies';
import getSubtree from './subtree/getSubtree';
import {moveSubtree} from './subtree/moveSubtree';
import {
  getInitializedAppState,
  getUninitializedAppState,
  saveState,
} from './AppStateUtils';
import {initShadowRepo} from './RepoUtils';
import {Observable} from 'rxjs';
import {startTrackingChangesForSync, sync, syncTracked} from './sync';
import {endWatchman} from './watchman';

const trackedSyncState = {
  clock: '',
};

yargs
  .usage('$0 <cmd> [args]')
  .command('break', 'Start managing current branch with merc', argv => {
    debugLog('Breaking stuff');
    run(
      getUninitializedAppState().switchMap(appState => {
        const {sourceRepoRoot} = appState;
        debugLog('Repo root is: ', sourceRepoRoot);

        return getSubtree(sourceRepoRoot)
          .switchMap(sourceSubtree => {
            const sourceRoot = sourceSubtree.root;
            const baseFiles = getFileDependencies(sourceRoot);
            debugLog('The base files are: ', baseFiles);
            debugLog(sourceRepoRoot, sourceRoot.hash);
            return update(sourceRepoRoot, sourceRoot.hash)
              .concat(initShadowRepo(sourceRepoRoot, baseFiles))
              .switchMap(shadowRepoRoot =>
                Observable.concat(
                  startTrackingChangesForSync(shadowRepoRoot, trackedSyncState),
                  moveSubtree({
                    sourceRepoRoot,
                    sourceRoot,
                    currentHash: sourceSubtree.currentCommit.hash,
                    destRepoRoot: shadowRepoRoot,
                    destParentHash: '.',
                  }),
                  syncTracked(shadowRepoRoot, sourceRepoRoot, trackedSyncState),
                ),
              )
              .map(shadowRoot => ({shadowRoot, sourceRoot}));
          })
          .map(({shadowRoot, sourceRoot}) => {
            return {
              ...appState,
              initialized: true,
              shadowRootSources: new Map([[shadowRoot.hash, sourceRoot.hash]]),
            };
          });
      }),
    );
  })
  .command(
    'unbreak',
    'Stop managing current branch with merc and reattach it to the main repository',
    argv => {
      debugLog('Unbreaking stuff');
      run(
        getInitializedAppState().switchMap(appState => {
          const {sourceRepoRoot} = appState;
          debugLog('Repo root is: ', sourceRepoRoot);
          const shadowRoot = appState.shadowSubtree.root;
          const shadowRootHash = shadowRoot.hash;
          const mainRootHash = appState.shadowRootSources.get(shadowRootHash);
          invariant(mainRootHash != null);

          // Move the shadow repo back to the main one.
          return moveSubtree({
            sourceRepoRoot: appState.shadowRepoRoot,
            sourceRoot: appState.shadowSubtree.root,
            currentHash: appState.shadowSubtree.currentCommit.hash,
            destRepoRoot: appState.sourceRepoRoot,
            destParentHash: mainRootHash,
          }).map(() => {
            // Now that the shadow root is gone, we no longer need to remember where it came from.
            const shadowRootSources = new Map(appState.shadowRootSources);
            shadowRootSources.delete(shadowRootHash);
            return {
              sourceRepoRoot: appState.sourceRepoRoot,
              shadowRepoRoot: appState.shadowRepoRoot,
              shadowRootSources,
            };
          });
        }),
      );
    },
  )
  .command(
    'sync',
    'Sync the changes in the main repo to the shadow one',
    argv => {
      debugLog('Syncing stuff');
      run(
        getInitializedAppState().switchMap(appState => {
          const sourceHash = appState.shadowRootSources.get(
            appState.shadowSubtree.root.hash,
          );
          invariant(sourceHash);

          return sync(
            appState.sourceRepoRoot,
            appState.shadowSubtree,
            sourceHash,
            appState.shadowIsDirty,
            appState.wClock,
          );
        }),
      );
    },
  )
  .command('debug', 'Options: getSubtree', ({argv}) => {
    if (argv._[1] === 'getSubtree') {
      getSubtree(process.cwd()).subscribe(res => dumpSubtree(res));
    }
  })
  .help().argv;

/**
 * Subscribe to the provided observable, and serialize the end state to the disk.
 */
function run(command: Observable<SerializableAppState>): void {
  command.switchMap(saveState).finally(() => endWatchman()).subscribe(
    () => {},
    // eslint-disable-next-line no-console
    err => console.error(err),
    () => {
      debugLog('Done!');
    },
  );
}
