/**
 * CommandResult contains uninterpreted information about a completed command execution.
 * @category Annex Commands
 */
export interface CommandResult {

  /**
   * The path of the repository targeted by the command.
   */
  repositoryPath: string;

  /**
   * The name of the program used to execute the command.
   */
  exeName: string;

  /**
   * The arguments passed to the program.
   */
  args: string[];

  /**
   * The exit code returned by the program.
   * Zero means no errors occurred.
   */
  exitCode: number;

  /**
   * The final stdout.
   */
  out: string;

  /**
   * The final stderr.
   */
  err: string;
}
