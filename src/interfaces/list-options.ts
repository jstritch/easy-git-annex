import { AnnexOptions } from './annex-options.js';

/**
 * ListOptions defines the supported options for the git-annex list command.
 * @category Command Options
 */
export interface ListOptions extends AnnexOptions {

  /**
   * Includes all known repositories in the output.
   */
  '--allrepos'?: null;

  /**
  * Specifies the file matching options.
  *
  * Matching is an anonymous option. The name `matching` is not presented to the git-annex command.
  * The values passed to the matching option are passed to git-annex in the order provided.

  * Consult the
  * [git-annex matching options documentation](https://git-annex.branchable.com/git-annex-matching-options/)
  * for the possible options.
  */
  matching?: string | string[];
}
