/**
 * AddGitOptions defines the supported options for the Git add command.
 * @category Command Options
 */
export interface AddGitOptions {

  /**
   * Updates the index not only where the working tree has a file matching pathspec but also where the index already has an entry.
   */
  '--all'?: null;

  /**
   * Overrides the executable bit of the added files.
   */
  '--chmod'?: string;

  /**
   * Adds otherwise ignored files.
   */
  '--force'?: null;

  /**
   * If some files can not be added because of errors indexing them, continue adding the others.
   */
  '--ignore-errors'?: null;

  /**
   * Records only the fact that the path will be added later.
   */
  '--intent-to-add'?: null;

  /**
   * Updates the index by adding new files that are unknown to the index and files modified in the working tree, but ignores files that have been removed from the working tree.
   */
  '--no-all'?: null;

  /**
   * Doesn’t add file(s), but only refreshes their stat() information in the index.
   */
  '--refresh'?: null;

  /**
   * Applies the "clean" process to all tracked files to forcibly add them again to the index.
   */
  '--renormalize'?: null;

  /**
   * Updates index entries outside of the sparse-checkout cone.
   */
  '--sparse'?: null;

  /**
   * Updates the index just where it already has an entry matching pathspec.
   */
  '--update'?: null;

  /**
   * Be verbose.
   */
  '--verbose'?: null;
}
