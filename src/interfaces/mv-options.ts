/**
 * MvOptions defines the supported options for the Git mv command.
 * @category Command Options
 */
export interface MvOptions {

  /**
   * Forces renaming or moving of a file even if the target exists.
   */
  '--force'?: null;

  /**
   * Reports the names of files as they are moved.
   */
  '--verbose'?: null;

  /**
   * Skips move or rename actions which would lead to an error condition.
   */
  '-k'?: null;
}
