import { AnnexOptions } from './annex-options.js';

/**
 * InitAnxOptions defines the supported options for the git-annex init command.
 * @category Command Options
 */
export interface InitAnxOptions extends AnnexOptions {

  /**
   * Enables any special remotes that were configured with autoenable=true.
   * See also {@link --no-autoenable}.
   */
  '--autoenable'?: null;

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;

  /**
  * Does not enable special remotes that were configured with autoenable=true.
  * See also {@link --autoenable}.
  */
  '--no-autoenable'?: null;

  /**
  * Uses a different annex.version than the current default.
  */
  '--version'?: number | string;
}
