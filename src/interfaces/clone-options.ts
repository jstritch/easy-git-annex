/**
 * CloneOptions defines the supported options for the git clone command.
 * @category Command Options
 */
export interface CloneOptions {

  /**
   * Instead of using the remote name `origin` to keep track of the upstream repository,
   * use the name provided.
   */
  '--origin'?: string;

  /**
   * Forces progress status even if the standard error stream is not directed to a terminal.
   */
  '--progress'?: null;

  /**
   * Operate quietly. Progress is not reported to the standard error stream.
   */
  '--quiet'?: null;

  /**
   * Run verbosely. Does not affect the reporting of progress status to the standard error stream.
   */
  '--verbose'?: null;
}
