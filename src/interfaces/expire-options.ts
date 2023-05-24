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
   * Outputs what would be done but does not actually expire or unexpire any repositories.
   */
  '--no-act'?: null;
}
