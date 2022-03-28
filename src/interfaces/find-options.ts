import { AnnexOptions } from './annex-options';

/**
 * FindOptions defines the supported options for the git-annex find command.
 * @category Command Options
 */
export interface FindOptions extends AnnexOptions {

  /**
   * Operates on files in the specified branch or treeish.
   */
  '--branch'?: string;

  /**
   * Uses custom output formatting.
   */
  '--format'?: string;

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;

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
