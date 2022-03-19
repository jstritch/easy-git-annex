import { FetchCommonOptions } from './fetch-common-options';

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
   * See also [[--no-autostash]].
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
   * See also [[--ff-only]] and [[--no-ff]].
   */
  '--ff'?: null;

  /**
   * Updates to the new history only if there is no divergent local history.
   * See also [[--ff]] and [[--no-ff]].
   */
  '--ff-only'?: null;

  /**
   * GPG-sign commits.
   * See also [[--no-gpg-sign]].
   */
  '--gpg-sign'?: string | null;

  /**
   * Includes log message with one-line descriptions from at most <n> actual commits that are being merged.
   * See also [[--no-log]].
   */
  '--log'?: number | string | null;

  /**
   * The complement of [[--autostash]].
   */
  '--no-autostash'?: null;

  /**
   * Performs the merge and stops just before creating a merge commit.
   */
  '--no-commit'?: null;

  /**
   * Creates a merge commit in all cases.
   * See also [[--ff]] and [[--ff-only]].
   */
  '--no-ff'?: null;

  /**
   * The complement of [[--gpg-sign]].
   */
  '--no-gpg-sign'?: null;

  /**
   * The complement of [[--log]].
   */
  '--no-log'?: null;

  /**
   * The complement of [[--rebase]].
   */
  '--no-rebase'?: string | null;

  /**
   * Disables recursive fetching of submodules.
   */
  '--no-recurse-submodules'?: null;

  /**
   * Does not add a Signed-off-by trailer by the committer at the end of the commit log message.
   * See also [[--signoff]].
   */
  '--no-signoff'?: null;

  /**
   * Performs the merge and commit the result.
   * See also [[--squash]].
   */
  '--no-squash'?: null;

  /**
   * Does not show a diffstat at the end of the merge.
   * See also [[--stat]].
   */
  '--no-stat'?: null;

  /**
   * Bypasses the pre-merge and commit-msg hooks.
   * See also [[--no-verify]].
   */
  '--no-verify'?: null;

  /**
   * Does not verify the tip commit of the side branch being merged is signed with a valid key.
   * See also [[--verify-signatures]].
   */
  '--no-verify-signatures'?: null;

  /**
   * Squelches output during merging.
   */
  '--quiet'?: null;

  /**
   * Controls rebasing.
   * See also [[--no-rebase]].
   */
  '--rebase'?: string | null;

  /**
   * Controls if and under what conditions new commits of populated submodules should be fetched.
   */
  '--recurse-submodules'?: string | null;

  /**
   * Adds a Signed-off-by trailer by the committer at the end of the commit log message.
   * See also [[--no-signoff]].
   */
  '--signoff'?: null;

  /**
   * Produces the working tree and index state as if a real merge happened, but does not actually make a commit.
   * See also [[--no-squash]].
   */
  '--squash'?: null;

  /**
   * Shows a diffstat at the end of the merge.
   * See also [[--no-stat]].
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
   * The complement of [[--no-verify]].
   */
  '--verify'?: null;

  /**
   * Verifies the tip commit of the side branch being merged is signed with a valid key.
   * See also [[--no-verify-signatures]].
   */
  '--verify-signatures'?: null;
}
