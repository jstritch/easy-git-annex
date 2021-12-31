import { AnnexOptions } from './annex-options';

/**
 * StatusAnxOptions defines the supported options for the git-annex status command.
 * @category Command Options
 */
export interface StatusAnxOptions extends AnnexOptions {

  /**
  * Produces a JSON object on each line of output.
   */
  '--json'?: null;
}
