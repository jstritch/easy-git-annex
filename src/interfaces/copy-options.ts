import { AnnexOptions } from './annex-options';

/**
 * CopyOptions defines the supported options for the git-annex copy command.
 * @category Command Options
 */
export interface CopyOptions extends AnnexOptions {

  /**
   * Copies all available versions of all files.
   */
  '--all'?: null;

  /**
   * Copies only files that don't yet have the desired number of copies or that are preferred content of the destination repository.
   */
  '--auto'?: null;

  /**
   * Operates on files in the specified branch or treeish.
   */
  '--branch'?: string;

  /**
   * Operates on files that recently failed to transfer.
   */
  '--failed'?: null;

  /**
   * Specifies the remote from which content is to be copied.
   */
  '--from'?: string;

  /**
   * Enables parallel transfers with up to the specified number of jobs running at once.
   */
  '--jobs'?: number | string;

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes error messages in the json instead of sending them to standard error.
   */
  '--json-error-messages'?: null;

  /**
   * Includes progress objects in JSON output.
   */
  '--json-progress'?: null;

  /**
   * Copies the specified key.
   */
  '--key'?: string;

  /**
   * Specifies the remote to which content is to be copied.
   */
  '--to'?: string;

  /**
   * Operates on files found by last run of git-annex unused.
   */
  '--unused'?: null;

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
