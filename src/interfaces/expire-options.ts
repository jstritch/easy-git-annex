import { AnnexOptions } from './annex-options.js';

/**
 * ExpireOptions defines the supported options for the git-annex expire command.
 * @category Command Options
 */
export interface ExpireOptions extends AnnexOptions {

  /**
   * Specifies the activity that a repository must have performed to avoid being expired.
   */
  '--activity'?: string;

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;

  /**
   * Outputs what would be done but does not actually expire or unexpire any repositories.
   */
  '--no-act'?: null;
}
