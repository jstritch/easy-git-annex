/**
 * StatusGitOptions defines the supported options for the Git status command.
 * @category Command Options
 */
export interface StatusGitOptions {

  /**
   * Displays detailed ahead/behind counts for the branch relative to its upstream branch.
   * See also {@link --no-ahead-behind}.
   */
  '--ahead-behind'?: null;

  /**
   * Shows the branch and tracking info even in short-format.
   */
  '--branch'?: null;

  /**
   * Displays untracked files in columns.
   * See also {@link --no-column}.
   */
  '--column'?: string | null;

  /**
   * Turns on rename detection, optionally setting the similarity threshold.
   */
  '--find-renames'?: string | null;

  /**
   * Ignores changes to submodules when looking for changes.
   */
  '--ignore-submodules'?: string | null;

  /**
   * Shows ignored files.
   */
  '--ignored'?: string | null;

  /**
   * Gives the output in the long-format.
   */
  '--long'?: null;

  /**
   * Does not display detailed ahead/behind counts for the branch relative to its upstream branch.
   * See also {@link --ahead-behind}.
   */
  '--no-ahead-behind'?: null;

  /**
   * Does not display untracked files in columns.
   * See also {@link --column}.
   */
  '--no-column'?: null;

  /**
   * Turns off rename detection regardless of user configuration.
   * See also {@link --renames}.
   */
  '--no-renames'?: null;

  /**
   * Gives the output in an easy-to-parse format for scripts.
   * Consider using method {@link GitAnnexAPI.getStatusGit} which returns objects.
   */
  '--porcelain'?: string | null;

  /**
   * Turns on rename detection regardless of user configuration.
   * See also {@link --no-renames}.
   */
  '--renames'?: null;

  /**
   * Gives the output in the short-format.
   * Consider using method {@link GitAnnexAPI.getStatusGit} which returns objects.
   */
  '--short'?: null;

  /**
   * Shows the number of entries currently stashed away.
   */
  '--show-stash'?: null;

  /**
   * Shows untracked files.
   */
  '--untracked-files'?: string | null;

  /**
   * Includes the textual changes that are staged to be committed.
   */
  '--verbose'?: null | [null, null?];

  /**
   * Terminates entries with NUL, instead of LF.
   */
  '-z'?: null;
}
