import { FetchCommonOptions } from './fetch-common-options.js';

/**
 * PullOptions defines the supported options for the Git pull command.
 * @category Command Options
 */
export interface PullOptions extends FetchCommonOptions {

  /**
   * Permits merge histories that do not share a common ancestor.
   */
  '--allow-unrelated-histories'?: null;

  /**
   * Automatically creates a temporary stash entry before the operation begins.
   * See also {@link --no-autostash}.
   */
  '--autostash'?: null;

  /**
   * Determines how the merge message will be cleaned up before committing.
   */
  '--cleanup'?: string;

  /**
   * Performs the merge and commits the result.
   */
  '--commit'?: null;

  /**
   * Resolves the merge as a fast-forward when possible; otherwise, creates a merge commit.
   * See also {@link --ff-only} and {@link --no-ff}.
   */
  '--ff'?: null;

  /**
   * Updates to the new history only if there is no divergent local history.
   * See also {@link --ff} and {@link --no-ff}.
   */
  '--ff-only'?: null;

  /**
   * GPG-sign commits.
   * See also {@link --no-gpg-sign}.
   */
  '--gpg-sign'?: string | null;

  /**
   * Includes log message with one-line descriptions from at most <n> actual commits that are being merged.
   * See also {@link --no-log}.
   */
  '--log'?: number | string | null;

  /**
   * The complement of {@link --autostash}.
   */
  '--no-autostash'?: null;

  /**
   * Performs the merge and stops just before creating a merge commit.
   */
  '--no-commit'?: null;

  /**
   * Creates a merge commit in all cases.
   * See also {@link --ff} and {@link --ff-only}.
   */
  '--no-ff'?: null;

  /**
   * The complement of {@link --gpg-sign}.
   */
  '--no-gpg-sign'?: null;

  /**
   * The complement of {@link --log}.
   */
  '--no-log'?: null;

  /**
   * The complement of {@link --rebase}.
   */
  '--no-rebase'?: string | null;

  /**
   * Disables recursive fetching of submodules.
   */
  '--no-recurse-submodules'?: null;

  /**
   * Does not add a Signed-off-by trailer by the committer at the end of the commit log message.
   * See also {@link --signoff}.
   */
  '--no-signoff'?: null;

  /**
   * Performs the merge and commit the result.
   * See also {@link --squash}.
   */
  '--no-squash'?: null;

  /**
   * Does not show a diffstat at the end of the merge.
   * See also {@link --stat}.
   */
  '--no-stat'?: null;

  /**
   * Bypasses the pre-merge and commit-msg hooks.
   * See also {@link --no-verify}.
   */
  '--no-verify'?: null;

  /**
   * Does not verify the tip commit of the side branch being merged is signed with a valid key.
   * See also {@link --verify-signatures}.
   */
  '--no-verify-signatures'?: null;

  /**
   * Squelches output during merging.
   */
  '--quiet'?: null;

  /**
   * Controls rebasing.
   * See also {@link --no-rebase}.
   */
  '--rebase'?: string | null;

  /**
   * Controls if and under what conditions new commits of populated submodules should be fetched.
   */
  '--recurse-submodules'?: string | null;

  /**
   * Adds a Signed-off-by trailer by the committer at the end of the commit log message.
   * See also {@link --no-signoff}.
   */
  '--signoff'?: null;

  /**
   * Produces the working tree and index state as if a real merge happened, but does not actually make a commit.
   * See also {@link --no-squash}.
   */
  '--squash'?: null;

  /**
   * Shows a diffstat at the end of the merge.
   * See also {@link --no-stat}.
   */
  '--stat'?: null;

  /**
   * Uses the given merge strategy.
   */
  '--strategy'?: string | string[];

  /**
   * Passes merge strategy-specific option through to the merge strategy.
   */
  '--strategy-option'?: string;

  /**
   * Passes --verbose to git-fetch and git-merge.
   */
  '--verbose'?: null;

  /**
   * The complement of {@link --no-verify}.
   */
  '--verify'?: null;

  /**
   * Verifies the tip commit of the side branch being merged is signed with a valid key.
   * See also {@link --no-verify-signatures}.
   */
  '--verify-signatures'?: null;
}
