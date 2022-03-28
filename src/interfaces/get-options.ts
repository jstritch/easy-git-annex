import { AnnexOptions } from './annex-options';

/**
 * GetOptions defines the supported options for the git-annex get command.
 * @category Command Options
 */
export interface GetOptions extends AnnexOptions {

  /**
   * Obtains all available versions of all files.
   */
  '--all'?: null;

  /**
   * Obtains only files that don't yet have the desired number of copies or that are preferred content of the repository.
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
   * Specifies the remote to use.
   */
  '--from'?: string;

  /**
   * Resumes any incomplete downloads of files that were started and interrupted at some point previously.
   */
  '--incomplete'?: null;

  /**
   * Enables parallel download with up to the specified number of jobs running at once.
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
   * Obtains the specified key.
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
