import { AnnexOptions } from './annex-options.js';

/**
 * InitremoteOptions defines the supported options for the git-annex initremote command.
 * @category Command Options
 */
export interface InitremoteOptions extends AnnexOptions {

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;

  /**
   * Makes the remote usable only from the repository where it was created.
   */
  '--private'?: null;

  /**
   * Uses the same underlying storage as another remote.
   */
  '--sameas'?: string;

  /**
   * Lists configuration parameters for the remote type.
   */
  '--whatelse'?: null;
}
