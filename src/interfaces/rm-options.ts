/**
 * RmOptions defines the supported options for the Git rm command.
 * @category Command Options
 */
export interface RmOptions {

  /**
   * Unstages and removes paths only from the index.
   */
  '--cached'?: null;

  /**
   * Includes files with updated contents.
   */
  '--force'?: null;

  /**
   * Exits with a zero status if no files matched.
   */
  '--ignore-unmatch'?: null;

  /**
   * Suppresses normal output of one line (in the form of an rm command) for each file removed.
   */
  '--quiet'?: null;

  /**
   * Enables recursive removal when a leading directory name is given.
   */
  '-r'?: null;

  /**
   * Updates index entries outside of the sparse-checkout cone.
   */
  '--sparse'?: null;
}
