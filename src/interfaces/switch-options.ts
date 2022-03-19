/**
 * SwitchOptions defines the supported options for the Git switch command.
 * @category Command Options
 */
export interface SwitchOptions {

  /**
   * Overrides the merge.conflictStyle configuration variable.
   */
  '--conflict'?: string;

  /**
   * Creates a new branch.
   */
  '--create'?: string;

  /**
   * Switches to a commit for inspection and discardable experiments.
   */
  '--detach'?: null;

  /**
   * Proceeds even if the index or the working tree differs from HEAD.
   */
  '--discard-changes'?: null;

  /**
   * Similar to --create except that if new-branch already exists, it will be reset to start-point.
   */
  '--force-create'?: string;

  /**
   * Proceeds when the wanted ref is already checked out by another worktree.
   */
  '--ignore-other-worktrees'?: null;

  /**
   * Performs a a three-way merge between the current branch, your working tree contents, and the new branch.
   */
  '--merge'?: null;

  /**
   * Suppresses progress reports to the standard error stream.
   * See also [[--progress]].
   */
  '--no-progress'?: null;

  /**
   * Does not update the content of all active submodules.
   */
  '--no-recurse-submodules'?: null;

  /**
   * Does not set up "upstream" configuration.
   * See also [[--track]].
   */
  '--no-track'?: null;

  /**
   * Creates a new orphan branch.
   */
  '--orphan'?: string;

  /**
   * Forces progress reports to the standard error stream.
   * See also [[--no-progress]].
   */
  '--progress'?: null;

  /**
   * Suppresses feedback messages.
   */
  '--quiet'?: null;

  /**
   * Updates the content of all active submodules.
   */
  '--recurse-submodules'?: null;

  /**
   * Sets "upstream" tracking configuration for the new branch.
   * See also [[--no-track]].
   */
  '--track'?: string | null;
}
