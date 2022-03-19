/**
 * CherryPickOptions defines the supported options for the Git cherry-pick command.
 * @category Command Options
 */
export interface CherryPickOptions {

  /**
   * Aborts the current conflict resolution process, and attempts to reconstruct the pre-merge state.
   */
  '--abort'?: null;

  /**
   * Permits cherry-picking an empty commit.
   */
  '--allow-empty'?: null;

  /**
   * Permits cherry-picking a commit with an empty message.
   */
  '--allow-empty-message'?: null;

  /**
   * Determines how the merge message will be cleaned up before committing.
   */
  '--cleanup'?: string;

  /**
   * Concludes the merge once conflicts are resolved.
   */
  '--continue'?: null;

  /**
   * Resolves the merge as a fast-forward when possible.
   */
  '--ff'?: null;

  /**
   * GPG-sign commits.
   * See also [[--no-gpg-sign]].
   */
  '--gpg-sign'?: string | null;

  /**
   * Creates an empty commit object when a commit being cherry picked duplicates a commit already in the current history.
   */
  '--keep-redundant-commits'?: null;

  /**
   * Specifies the parent number (starting from 1) of the mainline.
   */
  '--mainline'?: number | string;

  /**
   * Performs the cherry-pick and stops just before creating any commit.
   */
  '--no-commit'?: null;

  /**
   * The complement of [[--gpg-sign]].
   */
  '--no-gpg-sign'?: null;

  /**
   * The complement of [[--no-rerere-autoupdate]].
   */
  '--no-rerere-autoupdate'?: null;

  /**
   * Abandons the the current merge in progress, leaving the index and the working tree as-is.
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

  /**
   * Appends a line that says "(cherry picked from commit...)" to the original commit message.
   */
  '-x'?: null;
}
