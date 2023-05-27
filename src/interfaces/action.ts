/**
 * Action defines an object returned by various git-annex commands.
 * @category Returned Objects
 */
export interface Action {

  /**
   * The command name.
   */
  command: string;

  /**
   * The actual file name.
   */
  file: string;

  /**
   * The command input.
   */
  input: string[];
}
