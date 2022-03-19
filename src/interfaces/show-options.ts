import { DiffCommonOptions } from './diff-common-options';
/**
 * ShowOptions defines the supported options for the Git show command.
 * @category Command Options
 */
export interface ShowOptions extends DiffCommonOptions {

  /**
   * Shows a prefix that names the object uniquely.
   * See also [[--no-abbrev-commit]].
   */
  '--abbrev-commit'?: null;

  /**
   * Prints the children of the commit.
   */
  '--children'?: null;

  /**
   * Specifies the date format for output.
   */
  '--date'?: string;

  /**
   * Re-codes the commit log message in the specified encoding.
   */
  '--encoding'?: string;

  /**
   * Performs tab expansion.
   * See also [[--no-expand-tabs]].
   */
  '--expand-tabs'?: number | string | null;

  /**
   * Prints the commit logs using the supplied format string.
   */
  '--format'?: string;

  /**
   * Draws a text-based graphical representation of the commit history on the left side of the output.
   */
  '--graph'?: null;

  /**
   * Marks which side of a symmetric difference a commit is reachable from.
   */
  '--left-right'?: null;

  /**
   * Shows the full object name.
   * See also [[--no-abbrev-commit]].
   */
  '--no-abbrev-commit'?: null;

  /**
   * The complement of [[--expand-tabs]].
   */
  '--no-expand-tabs'?: number | null;

  /**
   * The complement of [[--notes]].
   */
  '--no-notes'?: null;

  /**
   * Shows notes with an optional ref value to filter notes.
   * See also [[--no-notes]].
   */
  '--notes'?: string | string[] | null;

  /**
   * Shorthand for `--pretty=oneline --abbrev-commit`.
   */
  '--oneline'?: null;

  /**
   * Prints the parents of the commit.
   */
  '--parents'?: null;

  /**
   * Puts a barrier in between two consecutive commits that do not belong to a linear branch.
   */
  '--show-linear-break'?: string | null;

  /**
   * Validitates signed commits.
   */
  '--show-signature'?: null;
}
