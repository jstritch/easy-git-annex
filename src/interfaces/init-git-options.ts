/**
 * InitGitOptions defines the supported options for the Git init command.
 * @category Command Options
 */
export interface InitGitOptions {

  /**
   * Creates a bare repository.
   */
  '--bare'?: null;

  /**
   * Uses the specified name for the initial branch.
   */
  '--initial-branch'?: string;

  /**
   * Suppresses all output except error and warning messages.
   */
  '--quiet'?: null;

  /**
   * Separates the repository from working tree.
   */
  '--separate-git-dir'?: string;

  /**
   * Specifies the Git repository is to be shared amongst several users.
   */
  '--shared'?: string | null;

  /**
   * Specifies the directory from which templates will be used.
   */
  '--template'?: string;
}
