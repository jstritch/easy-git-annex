/**
 * InitGitOptions defines the supported options for the git init command.
 * @category Command Options
 */
export interface InitGitOptions {

  /**
   * Create a bare repository.
   */
  '--bare'?: null;

  /**
   * Use the specified name for the initial branch in the newly created repository.
   */
  '--initial-branch'?: string;

  /**
   * Specify that the Git repository is to be shared amongst several users.
   */
  '--shared'?: string;

  /**
   * Specify the directory from which templates will be used.
   */
  '--template'?: string;

  /**
   * Only print error and warning messages; all other output will be suppressed.
   */
  '--quiet'?: null;
}
