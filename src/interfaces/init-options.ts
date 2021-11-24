import { AnnexOptions } from './annex-options';

/**
 * InitOptions defines the supported options for the git-annex init command.
 * @category Annex Command Options
 */
export interface InitOptions extends AnnexOptions {

  /**
   * Enables any special remotes that were configured with autoenable=true.
   */
  '--autoenable'?: null;

  /**
   * Requests the repository be initialized using a different annex.version than the current default.
   */
  '--version'?: number | string;
}
