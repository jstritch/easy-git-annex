import { AnnexOptions } from './annex-options';

/**
 * DropOptions defines the supported options for the git-annex drop command.
 * @category Command Options
 */
export interface DropOptions extends AnnexOptions {

  /**
   * Drops all available versions of all files.
   */
  '--all'?: null;

  /**
   * Drops only those that are not preferred content of the repository.
   */
  '--auto'?: null;

  /**
   * Operates on files in the specified branch or treeish.
   */
  '--branch'?: string;

  /**
   * Specifies the remote from which content is to be removed.
   */
  '--from'?: string;

  /**
   * Enables parallel drops with up to the specified number of jobs running at once.
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
   * Drops the specified key.
   */
  '--key'?: string;

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
