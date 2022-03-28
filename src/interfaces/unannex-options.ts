import { AnnexOptions } from './annex-options';

/**
 * UnannexOptions defines the supported options for the git-annex unannex command.
 * @category Command Options
 */
export interface UnannexOptions extends AnnexOptions {

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
