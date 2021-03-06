import { AnnexOptions } from './annex-options';

/**
 * StatusAnxOptions defines the supported options for the git-annex status command.
 * @category Command Options
 */
export interface StatusAnxOptions extends AnnexOptions {

  /**
   * Ignores changes to submodules when looking for changes.
   */
  '--ignore-submodules'?: string | null;

  /**
   * Produces a JSON object on each line of output.
   * Type predicate {@link isStatusAnx} may be passed to {@link safeParse} or {@link safeParseToArray} when processing the output.
   * Consider using method {@link GitAnnexAPI.getStatusAnx} which returns objects.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;
}
