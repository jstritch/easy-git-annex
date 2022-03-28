import { AnnexOptions } from './annex-options';

/**
 * WhereusedOptions defines the supported options for the git-annex whereused command.
 * @category Command Options
 */
export interface WhereusedOptions extends AnnexOptions {

  /**
   * Includes past versions of the current branch, other branches, tags, and the reflog.
   */
  '--historical'?: null;

  /**
   * Operates on the specified key.
   */
  '--key'?: string;

  /**
   * Operates on keys found by the last run of git-annex unused.
   */
  '--unused'?: null;
}
