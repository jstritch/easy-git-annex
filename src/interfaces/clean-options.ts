/**
 * CleanOptions defines the supported options for the Git clean command.
 * @category Command Options
 */
export interface CleanOptions {

  /**
   * Outputs what would be done but doesn’t actually remove anything.
   */
  '--dry-run'?: null;

  /**
   * Uses the given exclude pattern in addition to the standard ignore rules.
   */
  '--exclude'?: string;

  /**
   * Satisfies Git configuration variable clean.requireForce.
   * May be repeated to modify untracked nested Git repositories.
   */
  '--force'?: null | [null, null?];

  /**
   * Reports errors but not the files successfully removed.
   */
  '--quiet'?: null;

  /**
   * Recurses into untracked directories.
   */
  '-d'?: null;

  /**
   * Ignores the standard ignore rules.
   */
  '-x'?: null;

  /**
   * Removes only files ignored by Git.
   */
  '-X'?: null;
}
