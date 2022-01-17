/**
 * CommandResult contains uninterpreted information about a completed command execution.
 * @category Returned Objects
 */
export interface CommandResult {

  /**
   * The path of the repository targeted by the command.
   */
  readonly repositoryPath: string;

  /**
   * The name of the program used to execute the command.
   */
  readonly exeName: string;

  /**
   * The arguments passed to the program.
   */
  readonly args: string[];

  /**
   * The exit code returned by the program.
   * Zero means no errors occurred.
   */
  readonly exitCode: number;

  /**
   * The final stdout.
   */
  readonly out: string;

  /**
   * The final stderr.
   */
  readonly err: string;

  /**
   * Obtains a string representation of the CommandResult.
   */
  toCommandResultString(): string;
}
