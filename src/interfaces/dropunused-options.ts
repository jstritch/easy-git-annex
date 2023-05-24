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
}
