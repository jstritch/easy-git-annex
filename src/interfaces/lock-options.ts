import { AnnexOptions } from './annex-options';

/**
 * LockOptions defines the supported options for the git-annex lock command.
 * @category Command Options
 */
export interface LockOptions extends AnnexOptions {

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;
}
