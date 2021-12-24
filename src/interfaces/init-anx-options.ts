import { AnnexOptions } from './annex-options';

/**
 * InitAnxOptions defines the supported options for the git-annex init command.
 * @category Command Options
 */
export interface InitAnxOptions extends AnnexOptions {

  /**
   * Enables any special remotes that were configured with autoenable=true.
   */
  '--autoenable'?: null;

  /**
   * Requests the repository be initialized using a different annex.version than the current default.
   */
  '--version'?: number | string;
}
