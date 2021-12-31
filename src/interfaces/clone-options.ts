/**
 * CloneOptions defines the supported options for the git clone command.
 * @category Command Options
 */
export interface CloneOptions {

  /**
   * Specifies the remote name of the upstream repository.
   * If unspecified, the value `origin` is used.
   */
  '--origin'?: string;

  /**
   * Forces progress reports to the standard error stream.
   */
  '--progress'?: null;

  /**
   * Suppresses progress reports to the standard error stream.
   */
  '--quiet'?: null;

  /**
   * Sends additional progress information to the standard error stream.
   * The --verbose option is independent of [[--progress]] and [[--quiet]].
   */
  '--verbose'?: null;
}
