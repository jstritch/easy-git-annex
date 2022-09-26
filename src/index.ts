/**
 * The easy-git-annex library entry point.
 */

import { GitAnnexAccessor } from './git-annex-accessor';
import { GitAnnexAPI } from './interfaces/git-annex-api';

/**
 * The createAccessor function obtains an implementation of the {@link GitAnnexAPI} interface.
 * The returned accessor exposes Git and git-annex behavior.
 *
 * @param repositoryPath The path to the repository root directory.
 * The directory must exist but may be empty.
 * @returns An interface for interacting with Git and git-annex.
 * @category Entry Point
 */
export function createAccessor(repositoryPath: string): GitAnnexAPI {
  return GitAnnexAccessor.create(repositoryPath);
}

export * from './helpers/git-path';
export * from './helpers/get-branches';
export * from './helpers/get-finds';
export * from './helpers/get-line-starting';
export * from './helpers/get-logs';
export * from './helpers/get-refs';
export * from './helpers/get-shows';
export * from './helpers/get-tags';
export * from './helpers/get-whereis';
export * from './helpers/parsers';
export * from './helpers/safe-parse';
export * from './helpers/type-predicates';

export * from './interfaces/action';
export * from './interfaces/action-result';
export * from './interfaces/add-anx-options';
export * from './interfaces/add-git-options';
export * from './interfaces/adjust-options';
export * from './interfaces/annex-options';
export * from './interfaces/api-options';
export * from './interfaces/action-progress';
export * from './interfaces/branch-list-options';
export * from './interfaces/branch-options';
export * from './interfaces/checkout-options';
export * from './interfaces/cherry-pick-options';
export * from './interfaces/clone-options';
export * from './interfaces/command-result';
export * from './interfaces/commit-options';
export * from './interfaces/config-anx-options';
export * from './interfaces/config-git-options';
export * from './interfaces/copy-options';
export * from './interfaces/diff-common-options';
export * from './interfaces/diff-options';
export * from './interfaces/drop-options';
export * from './interfaces/dropunused-options';
export * from './interfaces/for-each-ref-options';
export * from './interfaces/fetch-common-options';
export * from './interfaces/fetch-options';
export * from './interfaces/find-options';
export * from './interfaces/fsck-anx-options';
export * from './interfaces/fsck-git-options';
export * from './interfaces/get-options';
export * from './interfaces/git-annex-api';
export * from './interfaces/info-options';
export * from './interfaces/init-anx-options';
export * from './interfaces/init-git-options';
export * from './interfaces/initremote-options';
export * from './interfaces/list-options';
export * from './interfaces/lock-options';
export * from './interfaces/log-options';
export * from './interfaces/ls-files-options';
export * from './interfaces/merge-anx-options';
export * from './interfaces/merge-git-options';
export * from './interfaces/move-options';
export * from './interfaces/mv-options';
export * from './interfaces/parser';
export * from './interfaces/pull-options';
export * from './interfaces/push-options';
export * from './interfaces/rebase-options';
export * from './interfaces/remote-options';
export * from './interfaces/repository-info';
export * from './interfaces/reset-options';
export * from './interfaces/restore-options';
export * from './interfaces/revert-options';
export * from './interfaces/rev-parse-options';
export * from './interfaces/rm-options';
export * from './interfaces/show-options';
export * from './interfaces/stash-options';
export * from './interfaces/status-anx';
export * from './interfaces/status-anx-options';
export * from './interfaces/status-git';
export * from './interfaces/status-git-options';
export * from './interfaces/switch-options';
export * from './interfaces/sync-options';
export * from './interfaces/tag-options';
export * from './interfaces/unannex-options';
export * from './interfaces/unlock-options';
export * from './interfaces/unused-options';
export * from './interfaces/version-anx';
export * from './interfaces/version-anx-options';
export * from './interfaces/version-git';
export * from './interfaces/version-git-options';
export * from './interfaces/whereis-options';
export * from './interfaces/whereused-options';
