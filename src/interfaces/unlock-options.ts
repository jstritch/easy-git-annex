import { AnnexOptions } from './annex-options';

/**
 * UnlockOptions defines the supported options for the git-annex unlock command.
 * @category Command Options
 */
export interface UnlockOptions extends AnnexOptions {

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;
}
