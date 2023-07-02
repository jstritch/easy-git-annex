import { AnnexOptions } from './annex-options.js';

/**
 * ForgetOptions defines the supported options for the git-annex forget command.
 * @category Command Options
 */
export interface ForgetOptions extends AnnexOptions {

  /**
   * Also prunes references to repositories that have been marked as dead.
   */
  '--drop-dead'?: null;

}
