/**
 * MergeAnxOptions defines the supported options for the git-annex merge command.
 * @category Command Options
 */
export interface MergeAnxOptions {

  /**
   * Permits merge histories that do not share a common ancestor.
   */
  '--allow-unrelated-histories'?: null;

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;

  /**
   * Disallows merge histories that do not share a common ancestor.
   */
  '--no-allow-unrelated-histories'?: null;
}
