/**
 * ResetOptions defines the supported options for the Git reset command.
 * @category Command Options
 */
export interface ResetOptions {

  /**
   * Resets the index and the working tree.
   */
  '--hard'?: null;

  /**
   * Resets the index and updates the files in the working tree.
   */
  '--keep'?: null;

  /**
   * Resets the index and updates the files in the working tree
   * but keeps those which are different between the index and working tree.
   */
  '--merge'?: null;

  /**
   * Resets the index but not the working tree.
   */
  '--mixed'?: null;

  /**
   * Does not reset the working tree of all active submodules.
   */
  '--no-recurse-submodules'?: null;

  /**
   * The complement of {@link --quiet}.
   */
  '--no-quiet'?: null;

  /**
   * Report errors only.
   * See also {@link --no-quiet}.
   */
  '--quiet'?: null;

  /**
   * Resets the working tree of all active submodules.
   */
  '--recurse-submodules'?: null;

  /**
   * Does not touch the index or the working tree.
   */
  '--soft'?: null;
}
