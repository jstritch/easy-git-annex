import { AnnexOptions } from './annex-options.js';

/**
 * DropunusedOptions defines the supported options for the git-annex dropunused command.
 * @category Command Options
 */
export interface DropunusedOptions extends AnnexOptions {

  /**
   * Drops unused data from the specified repository.
   */
  '--from'?: string;

  /**
   * Enables parallel drops with up to the specified number of jobs running at once.
   */
  '--jobs'?: number | string;

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;
}
