/*
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 * @flow
 * @format
 */

import yargs from 'yargs';
import {getRepoRoot, update} from './HgUtils';
import getSubtree from './getSubtree';
import {moveSubtree} from './moveSubtree';
import {dumpSubtree} from './debug';
import getFileDependencies from './getFileDependencies';
import {initShadowRepo} from './RepoUtils';
import {compact} from 'nuclide-commons/observable';

yargs
  .usage('$0 <cmd> [args]')
  .command('break', 'Start managing current branch with merc', argv => {
    // eslint-disable-next-line no-console
    console.log('Breaking stuff');
    compact(getRepoRoot(process.cwd()))
      .switchMap(repoRoot => {
        // eslint-disable-next-line no-console
        console.log('Repo root is: ', repoRoot);

        return getSubtree(repoRoot).switchMap(subtree => {
          const baseFiles = getFileDependencies(subtree);
          // eslint-disable-next-line no-console
          console.log('The base files are: ', baseFiles);

          return update(repoRoot, subtree.hash)
            .concat(initShadowRepo(repoRoot, baseFiles))
            .switchMap(shadowRepoRoot => {
              return moveSubtree({
                sourceRepoRoot: repoRoot,
                sourceRoot: subtree,
                destRepoRoot: shadowRepoRoot,
                destParentHash: '.',
              });
            });
        });
      })
      .subscribe(
        () => {},
        // eslint-disable-next-line no-console
        err => console.error(err),
        () => {
          // eslint-disable-next-line no-console
          console.log('Done!');
        },
      );
  })
  .command('debug', 'Options: getSubtree', ({argv}) => {
    if (argv._[1] === 'getSubtree') {
      getSubtree(process.cwd()).subscribe(res => dumpSubtree(res));
    }
  })
  .help().argv;
