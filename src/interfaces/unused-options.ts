import { AnnexOptions } from './annex-options.js';

/**
 * UnusedOptions defines the supported options for the git-annex unused command.
 * @category Command Options
 */
export interface UnusedOptions extends AnnexOptions {

  /**
   * Checks for unused data that is located in a repository.
   */
  '--from'?: string;

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;

  /**
   * Specifies the filter for refs.
   */
  '--used-refspec'?: string;
}
