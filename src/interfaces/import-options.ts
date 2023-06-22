import { AnnexOptions } from './annex-options.js';

/**
 * ImportOptions defines the supported options for the git-annex import command.
 * @category Command Options
 */
export interface ImportOptions extends AnnexOptions {

  /**
   * Specifies the key-value backend to use when importing from a special remote.
   * Method {@link GitAnnexAPI.getBackends} obtains a list of backend names.
   */
  '--backend'?: string;

  /**
   * Downloads annexed content from the special remote.
   * See also {@link --no-content}.
   */
  '--content'?: null;

  /**
   * Specifies the source special remote.
   */
  '--from'?: string;

  /**
   * Specifies the number of cores to use for importing multiple files in parallel.
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
   * Adds gitignored files.
   */
  '--no-check-gitignore'?: null;

  /**
   * Does not download annexed content from the special remote.
   * git-annex keys are generated from information provided by the special remote.
   * See also {@link --content}.
   */
  '--no-content'?: null;

}
