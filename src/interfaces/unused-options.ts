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
   * Specifies the filter for refs.
   */
  '--used-refspec'?: string;
}
