/**
 * RestoreOptions defines the supported options for the Git restore command.
 * @category Command Options
 */
export interface RestoreOptions {

  /**
   * Overrides the merge.conflictStyle configuration variable.
   */
  '--conflict'?: string;

  /**
   * Ignores the sparse patterns and unconditionally restores specified files.
   */
  '--ignore-skip-worktree-bits'?: null;

  /**
   * Does not abort the operation if there are unmerged entries.
   */
  '--ignore-unmerged'?: null;

  /**
   * Recreates the conflicted merge in the unmerged paths when restoring files in the working tree from the index.
   */
  '--merge'?: null;

  /**
   * Removes tracked files that do not appear in the --source tree.
   * See also [[--overlay]].
   */
  '--no-overlay'?: null;

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
   * Uses stage #2 for unmerged paths when restoring files in the working tree from the index.
   * See also [[--thiers]].
   */
  '--ours'?: null;

  /**
   * Never removes files when restoring.
   * See also [[--no-overlay]].
   */
  '--overlay'?: null;

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
   * Restores working tree files with content from the given tree.
   */
  '--source'?: string;

  /**
   * Restores files to the index.
   * See also [[--worktree]].
   */
  '--staged'?: null;

  /**
   * Uses stage #3 for unmerged paths when restoring files in the working tree from the index.
   * See also [[--ours]].
   */
  '--thiers'?: null;

  /**
   * Restores files to the working tree.
   * See also [[--staged]].
   */
  '--worktree'?: null;
}
