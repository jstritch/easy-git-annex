/**
 * CheckoutOptions defines the supported options for the Git checkout command.
 * @category Command Options
 */
export interface CheckoutOptions {

  /**
   * Creates a new branch named <new-branch> and start it at <start-point>.
   * The <new-branch> value may be specified as a string or the first element of a string[].
   * The optional <start-point> is the second element of a string[] when provided.
   */
  '-b'?: string | string[];

  /**
   * Creates the branch’s reflog.
   */
  '-l'?: null;

  /**
   * Checks out a commit for inspection and discardable experiments.
   */
  '--detach'?: null;

  /**
   * Proceeds if the index or the working tree differs from HEAD, even if there are untracked files when switching branches.
   */
  '--force'?: null;

  /**
   * Ignores the sparse patterns and adds back any files in relativePaths.
   */
  '--ignore-skip-worktree-bits'?: null;

  /**
   * Performs a three-way merge between the current branch, your working tree contents, and the new branch.
   */
  '--merge'?: null;

  /**
   * Suppresses progress reports to the standard error stream.
   * See also [[--progress]].
   */
  '--no-progress'?: null;

  /**
   * Does not set up "upstream" configuration.
   * See also [[--track]].
   */
  '--no-track'?: null;

  /**
   * Creates a new orphan branch named <new-branch> and start it at <start-point>.
   * The <new-branch> value may be specified as a string or the first element of a string[].
   * The optional <start-point> is the second element of a string[] when provided.
   */
  '--orphan'?: string | string[];

  /**
   * Checks out stage #2 for unmerged paths when checking out paths from the index.
   * See also [[--thiers]].
   */
  '--ours'?: null;

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
   * Checks out stage #3 for unmerged paths when checking out paths from the index.
   * See also [[--ours]].
   */
  '--thiers'?: null;

  /**
   * Sets "upstream" tracking configuration for the new branch.
   * See also [[--no-track]].
   */
  '--track'?: string | null;
}
