import { AnnexOptions } from './annex-options.js';

/**
 * DescribeAnxOptions defines the supported options for the git-annex describe command.
 * @category Command Options
 */
export interface DescribeAnxOptions extends AnnexOptions {

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;
}
