import { AnnexOptions } from './annex-options.js';

/**
 * OldkeysOptions defines the supported options for the git-annex oldkeys command.
 * @category Command Options
 */
export interface OldkeysOptions extends AnnexOptions {

  /**
  * Lists old keys used in the specified range of revisions.
  */
  '--revision-range'?: string;

  /**
  * Includes keys used by any file in the currently checked out branch.
  */
  '--unchecked'?: null;
}
