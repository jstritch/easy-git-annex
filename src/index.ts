/**
 * The easy-git-annex library entry point.
 */

import { GitAnnexAccessor } from './git-annex-accessor.js';
import { GitAnnexAPI } from './interfaces/git-annex-api.js';

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

export * from './helpers/chmodr.js';
export * from './helpers/get-branches.js';
export * from './helpers/get-finds.js';
export * from './helpers/get-line-starting.js';
export * from './helpers/get-logs.js';
export * from './helpers/get-refs.js';
export * from './helpers/get-shows.js';
export * from './helpers/get-tags.js';
export * from './helpers/get-whereis.js';
export * from './helpers/git-path.js';
export * from './helpers/list-files.js';
export * from './helpers/parsers.js';
export * from './helpers/path-exists.js';
export * from './helpers/safe-parse.js';
export * from './helpers/type-predicates.js';

export * from './interfaces/action.js';
export * from './interfaces/action-result.js';
export * from './interfaces/add-anx-options.js';
export * from './interfaces/add-git-options.js';
export * from './interfaces/adjust-options.js';
export * from './interfaces/annex-options.js';
export * from './interfaces/api-options.js';
export * from './interfaces/action-progress.js';
export * from './interfaces/branch-list-options.js';
export * from './interfaces/branch-options.js';
export * from './interfaces/checkout-options.js';
export * from './interfaces/cherry-pick-options.js';
export * from './interfaces/clean-options.js';
export * from './interfaces/clone-options.js';
export * from './interfaces/command-result.js';
export * from './interfaces/commit-options.js';
export * from './interfaces/config-anx-options.js';
export * from './interfaces/config-git-options.js';
export * from './interfaces/console-data-handler.js';
export * from './interfaces/copy-options.js';
export * from './interfaces/diff-common-options.js';
export * from './interfaces/diff-options.js';
export * from './interfaces/drop-options.js';
export * from './interfaces/dropunused-options.js';
export * from './interfaces/expire-options.js';
export * from './interfaces/for-each-ref-options.js';
export * from './interfaces/fetch-common-options.js';
export * from './interfaces/fetch-options.js';
export * from './interfaces/find-options.js';
export * from './interfaces/fsck-anx-options.js';
export * from './interfaces/fsck-git-options.js';
export * from './interfaces/get-options.js';
export * from './interfaces/git-annex-api.js';
export * from './interfaces/grep-options.js';
export * from './interfaces/info-options.js';
export * from './interfaces/init-anx-options.js';
export * from './interfaces/init-git-options.js';
export * from './interfaces/initremote-options.js';
export * from './interfaces/list-options.js';
export * from './interfaces/lock-options.js';
export * from './interfaces/log-options.js';
export * from './interfaces/ls-files-options.js';
export * from './interfaces/merge-anx-options.js';
export * from './interfaces/merge-git-options.js';
export * from './interfaces/move-options.js';
export * from './interfaces/mv-options.js';
export * from './interfaces/parser.js';
export * from './interfaces/pull-options.js';
export * from './interfaces/push-options.js';
export * from './interfaces/rebase-options.js';
export * from './interfaces/remote-options.js';
export * from './interfaces/repository-info.js';
export * from './interfaces/reset-options.js';
export * from './interfaces/restore-options.js';
export * from './interfaces/revert-options.js';
export * from './interfaces/rev-parse-options.js';
export * from './interfaces/rm-options.js';
export * from './interfaces/show-options.js';
export * from './interfaces/stash-options.js';
export * from './interfaces/status-anx.js';
export * from './interfaces/status-anx-options.js';
export * from './interfaces/status-git.js';
export * from './interfaces/status-git-options.js';
export * from './interfaces/submodule-options.js';
export * from './interfaces/switch-options.js';
export * from './interfaces/sync-options.js';
export * from './interfaces/tag-options.js';
export * from './interfaces/unannex-options.js';
export * from './interfaces/unlock-options.js';
export * from './interfaces/unused-options.js';
export * from './interfaces/version-anx.js';
export * from './interfaces/version-anx-options.js';
export * from './interfaces/version-git.js';
export * from './interfaces/version-git-options.js';
export * from './interfaces/whereis-options.js';
export * from './interfaces/whereused-options.js';
