import { AnnexOptions } from './annex-options';

/**
 * ListOptions defines the supported options for the git-annex list command.
 * @category Command Options
 */
export interface ListOptions extends AnnexOptions {

  /**
   * Includes all known repositories in the output.
   */
  '--allrepos'?: null;
}
