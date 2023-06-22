import { AnnexOptions } from './annex-options.js';

/**
 * ExportOptions defines the supported options for the git-annex export command.
 * @category Command Options
 */
export interface ExportOptions extends AnnexOptions {

  /**
   * Specifies the number of cores to use for exporting multiple files in parallel.
   */
  '--jobs'?: number | string;

  /**
   * Produces a JSON object on each line of output.
   * Type predicate {@link isActionResult} may be passed to {@link safeParse} or {@link safeParseToArray} when processing the output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;

  /**
   * Includes progress objects in JSON output.
   * Specifying --json-progress automatically enables {@link --json}.
   * Type predicate {@link isActionProgress} may be passed to {@link safeParse} or {@link safeParseToArray} when processing the output.
   */
  '--json-progress'?: null;

  /**
   * Specifies the destination special remote.
   */
  '--to'?: string;

}
