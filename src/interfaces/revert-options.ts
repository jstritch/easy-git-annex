/**
 * RevertOptions defines the supported options for the Git revert command.
 * @category Command Options
 */
export interface RevertOptions {

  /**
   * Aborts the current conflict resolution process.
   */
  '--abort'?: null;

  /**
   * Determines how the commit message will be cleaned up.
   */
  '--cleanup'?: string;

  /**
   * Concludes the revert once conflicts are resolved.
   */
  '--continue'?: null;

  /**
   * GPG-sign commits.
   * See also [[--no-gpg-sign]].
   */
  '--gpg-sign'?: string | null;

  /**
   * Specifies the parent number (starting from 1) of the mainline.
   */
  '--mainline'?: number | string;

  /**
   * Reverts the named commits and stops just before creating any commit.
   */
  '--no-commit'?: null;

  /**
   * The complement of [[--gpg-sign]].
   */
  '--no-gpg-sign'?: null;

  /**
   * The complement of [[--rerere-autoupdate]].
   */
  '--no-rerere-autoupdate'?: null;

  /**
   * Abandons the the current revert in progress.
   */
  '--quit'?: null;

  /**
   * Allows the rerere mechanism to update the index with the result of auto-conflict resolution.
   * See also [[--no-rerere-autoupdate]].
   */
  '--rerere-autoupdate'?: null;

  /**
   * Adds a Signed-off-by trailer by the committer at the end of the commit log message.
   * See also [[--no-signoff]].
   */
  '--signoff'?: null;

  /**
   * Skips the current commit and continues with the rest of the sequence.
   */
  '--skip'?: null;

  /**
   * Uses the given merge strategy.
   */
  '--strategy'?: string;

  /**
   * Passes merge strategy-specific option through to the merge strategy.
   */
  '--strategy-option'?: string;
}
