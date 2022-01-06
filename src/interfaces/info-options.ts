import { AnnexOptions } from './annex-options';

/**
 * InfoOptions defines the supported options for the git-annex info command.
 * @category Command Options
 */
export interface InfoOptions extends AnnexOptions {

  /**
   * Shows file sizes in bytes.
   */
  '--bytes'?: null;

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;
}
