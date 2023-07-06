import { AnnexOptions } from './annex-options.js';

/**
 * DeadOptions defines the supported options for the git-annex dead command.
 * @category Command Options
 */
export interface DeadOptions extends AnnexOptions {

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;
}
