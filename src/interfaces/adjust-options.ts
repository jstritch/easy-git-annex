import { AnnexOptions } from './annex-options';

/**
 * AdjustOptions defines the supported options for the git-annex adjust command.
 * @category Command Options
 */
export interface AdjustOptions extends AnnexOptions {

  /**
   * Fixes the symlinks to annexed files to point to the local git annex object directory.
   */
  '--fix'?: null;

  /**
   * Includes annexed files in the adjusted branch only when their content is present.
   */
  '--hide-missing'?: null;

  /**
   * Locks all annexed files in the adjusted branch.
   */
  '--lock'?: null;

  /**
   * Unlocks all annexed files in the adjusted branch.
   */
  '--unlock'?: null;

  /**
   * Unlocks files whose content is present and locks files whose content is missing.
   */
  '--unlock-present'?: null;
}
