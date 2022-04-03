/**
 * RebaseOptions defines the supported options for the Git rebase command.
 * @category Command Options
 */
export interface RebaseOptions {

  /**
   * Aborts the rebase operation and resets HEAD to the original branch.
   */
  '--abort'?: null;

  /**
   * Uses applying strategies to rebase.
   */
  '--apply'?: null;

  /**
   * Special handling for commits with log messages beginning "squash!" or "fixup!" or "amend!".
   * See also [[--no-autosquash]].
   */
  '--autosquash'?: null;

  /**
   * Uses the author date of the commit being rebased as the committer date.
   */
  '--committer-date-is-author-date'?: null;

  /**
   * Restarts the rebasing process after having resolved a merge conflict.
   */
  '--continue'?: null;

  /**
   * Specifies handling of commits that are not empty to start and are not clean cherry-picks of any upstream commit, but which become empty after rebasing.
   */
  '--empty'?: string;

  /**
   * Uses reflog to find a better common ancestor.
   * See also [[--no-fork-point]].
   */
  '--fork-point'?: null;

  /**
   * GPG-sign commits.
   * See also [[--no-gpg-sign]].
   */
  '--gpg-sign'?: string | null;

  /**
   * Uses the current time as the author date of the rebased commit.
   */
  '--ignore-date'?: null;

  /**
   * Ignores whitespace differences when trying to reconcile differences.
   */
  '--ignore-whitespace'?: null;

  /**
   * Sets the starting point at which to create the new commits.
   */
  '--keep-base'?: null;

  /**
   * The complement of [[--no-keep-empty]].
   */
  '--keep-empty'?: null;

  /**
   * Uses merging strategies to rebase.
   */
  '--merge'?: null;

  /**
   * The complement of [[--autosquash]].
   */
  '--no-autosquash'?: null;

  /**
   * Replays all rebased commits instead of fast-forwarding over the unchanged ones.
   */
  '--no-ff'?: null;

  /**
   * The complement of [[--fork-point]].
   */
  '--no-fork-point'?: null;

  /**
   * The complement of [[--gpg-sign]].
   */
  '--no-gpg-sign'?: null;

  /**
   * Does not keep commits that start empty before the rebase.
   * See also [[--keep-empty]].
   */
  '--no-keep-empty'?: null;

  /**
   * The complement of [[--reapply-cherry-picks]].
   */
  '--no-reapply-cherry-picks'?: null;

  /**
   * The complement of [[--rerere-autoupdate]].
   */
  '--no-rerere-autoupdate'?: null;

  /**
   * Does not show a diffstat of what changed upstream since the last rebase.
   * See also [[--stat]].
   */
  '--no-stat'?: null;

  /**
   * Bypasses the pre-rebase hook to run.
   * See also [[--verify]].
   */
  '--no-verify'?: null;

  /**
   * Starting point at which to create the new commits.
   */
  '--onto'?: string;

  /**
   * Be quiet. Implies --no-stat.
   */
  '--quiet'?: null;

  /**
   * Aborts the rebase operation but HEAD is not reset back to the original branch.
   */
  '--quit'?: null;

  /**
   * Reapplies all clean cherry-picks of any upstream commit instead of preemptively dropping them.
   * See also [[--no-reapply-cherry-picks]].
   */
  '--reapply-cherry-picks'?: null;

  /**
   * Attempts to preserve the branching structure within the commits that are to be rebased, by recreating the merge commits.
   */
  '--rebase-merges'?: string | null;

  /**
   * Allows the rerere mechanism to update the index with the result of auto-conflict resolution.
   * See also [[--no-rerere-autoupdate]].
   */
  '--rerere-autoupdate'?: null;

  /**
   * Rebases all commits reachable from branch.
   */
  '--root'?: null;

  /**
   * Adds a Signed-off-by trailer by the committer to all the rebased commits.
   */
  '--signoff'?: null;

  /**
   * Restarts the rebasing process by skipping the current patch.
   */
  '--skip'?: null;

  /**
   * Shows a diffstat of what changed upstream since the last rebase.
   * See also [[--no-stat]].
   */
  '--stat'?: null;

  /**
   * Uses the given merge strategy.
   */
  '--strategy'?: string;

  /**
   * Passes merge strategy-specific option through to the merge strategy.
   */
  '--strategy-option'?: string;

  /**
   * Be verbose. Implies --stat.
   */
  '--verbose'?: null;

  /**
   * Allows the pre-rebase hook to run.
   * See also [[--no-verify]].
   */
  '--verify'?: null;

  /**
   * Passed to the Git apply program.
   */
  '--whitespace'?: string;

  /**
   * Ensures at least n lines of surrounding context match before and after each change.
   */
  '-C'?: number | string;
}
