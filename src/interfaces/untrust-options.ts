import { AnnexOptions } from './annex-options.js';

/**
 * UntrustOptions defines the supported options for the git-annex untrust command.
 * @category Command Options
 */
export interface UntrustOptions extends AnnexOptions {

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;
}
