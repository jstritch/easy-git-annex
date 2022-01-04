/**
 * The git-annex-js library entry point.
 */

import { GitAnnexAccessor } from './git-annex-accessor';
import { GitAnnexAPI } from './interfaces/git-annex-api';

/**
 * The createAccessor function obtains an implementation of the [[GitAnnexAPI]] interface.
 * The returned accessor exposes git-annex behavior.
 *
 * @param repositoryPath The path to the repository root directory.
 * @returns An interface for interacting with git-annex.
 * @category Entry point
 */
export function createAccessor(repositoryPath: string): GitAnnexAPI {
  return new GitAnnexAccessor(repositoryPath);
}

export * from './interfaces/add-anx-options';
export * from './interfaces/annex-options';
export * from './interfaces/api-options';
export * from './interfaces/clone-options';
export * from './interfaces/command-result';
export * from './interfaces/commit-options';
export * from './interfaces/config-anx-options';
export * from './interfaces/config-git-options';
export * from './interfaces/git-annex-api';
export * from './interfaces/init-git-options';
export * from './interfaces/initremote-options';
export * from './interfaces/lock-options';
export * from './interfaces/remote-options';
export * from './interfaces/repository-info';
export * from './interfaces/rm-options';
export * from './interfaces/status-anx-options';
export * from './interfaces/sync-options';
export * from './interfaces/tag-options';
export * from './interfaces/unlock-options';
export * from './interfaces/version-anx-options';
export * from './interfaces/version-git-options';
export * from './helpers/git-path';
export * from './helpers/get-line-starting';
