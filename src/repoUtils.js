/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 * @format
 */

import {Observable} from 'rxjs';
import {resolve} from 'path';
import fsPromise from 'nuclide-commons/fsPromise';
import {pathSetOfFiles} from './pathSetUtils';
import {
  add,
  commit,
  getCurrentRevisionHash,
  initRepo,
  setPhase,
} from './hgUtils';

export function initShadowRepo(
  repoPath: string,
  baseFiles: Set<string>,
): Observable<string> {
  const shadowRoot = resolve(repoPath, '.hg', 'merc');
  const paths = pathSetOfFiles(baseFiles);

  return initRepo(shadowRoot)
    .concat(_copyIfExists(repoPath, shadowRoot, resolve('.hg', 'hgrc')))
    .concat(_mkDirs(shadowRoot, paths))
    .concat(_copyHgIgnores(repoPath, shadowRoot, paths))
    .concat(_makePublicCommit(shadowRoot, 'Initial commit'))
    .concat(_copyBaseFiles(repoPath, shadowRoot, baseFiles))
    .concat(_makePublicCommit(shadowRoot, 'MergeBase commit'))
    .ignoreElements()
    .concat(Observable.of(shadowRoot));
}

function _copyIfExists(
  sourceRepo: string,
  targetRepo: string,
  name: string,
): Observable<void> {
  const sourceFileName = resolve(sourceRepo, name);
  const destFileName = resolve(targetRepo, name);
  return Observable.defer(() =>
    Observable.fromPromise(fsPromise.exists(sourceFileName)),
  ).switchMap(exists => {
    if (exists) {
      return Observable.fromPromise(
        fsPromise.copy(sourceFileName, destFileName),
      );
    }

    return Observable.empty();
  });
}

function _copyHgIgnores(
  sourceRepo: string,
  targetRepo: string,
  paths: Set<string>,
): Observable<void> {
  return _hgIgnores(sourceRepo, paths).switchMap(hgIgnores => {
    if (hgIgnores.size === 0) {
      return Observable.fromPromise(
        fsPromise.writeFile(resolve(targetRepo, '.hgignore'), ''),
      );
    }

    return Observable.from(hgIgnores).mergeMap(name =>
      _copyIfExists(sourceRepo, targetRepo, name),
    );
  });
}

function _hgIgnores(root: string, paths: Set<string>): Observable<Set<string>> {
  return Observable.defer(() =>
    Observable.from(paths)
      .mergeMap(path => {
        const name = resolve(path, '.hgignore');

        return Observable.fromPromise(
          fsPromise.exists(resolve(root, name)),
        ).map(exists => {
          return {name, exists};
        });
      })
      .filter(entry => entry.exists)
      .map(entry => entry.name)
      .reduce((set, name) => {
        const copy = new Set(set);
        copy.add(name);
        return copy;
      }, new Set()),
  );
}

function _mkDirs(root: string, paths: Set<string>): Observable<void> {
  return Observable.from(paths)
    .concatMap(path => {
      const pathToCreate = resolve(root, path);
      return Observable.defer(() =>
        Observable.fromPromise(fsPromise.mkdirp(pathToCreate)),
      );
    })
    .ignoreElements();
}

function _makePublicCommit(root: string, message): Observable<void> {
  return Observable.defer(() => add(root, '.'))
    .concat(Observable.defer(() => commit(root, message)))
    .concat(
      Observable.defer(() =>
        getCurrentRevisionHash(root).switchMap(hash =>
          setPhase(root, 'public', hash),
        ),
      ),
    );
}

function _copyBaseFiles(
  sourceRepo: string,
  targetRepo: string,
  baseFiles: Set<string>,
): Observable<void> {
  const files = new Set(baseFiles);
  // In case we are in an empty branch, default to at least one files that's likely to exist
  if (files.size === 0) {
    files.add('.arcconfig');
  }

  return Observable.defer(() => {
    return Observable.from(files).mergeMap(name =>
      _copyIfExists(sourceRepo, targetRepo, name),
    );
  });
}
