import { AnnexOptions } from './annex-options';

/**
 * FsckAnxOptions defines the supported options for the git-annex fsck command.
 * @category Command Options
 */
export interface FsckAnxOptions extends AnnexOptions {

  /**
  * Causes all versions of all files to be fscked.
  */
  '--all'?: null;

  /**
   * Operates on files in the specified branch or treeish.
   */
  '--branch'?: string;

  /**
   * Checks the specified remote, rather than the local repository.
   */
  '--from'?: string;

  /**
  * Starts a new incremental fsck pass.
  */
  '--incremental'?: null;

  /**
  *  Sets the time period between incremental fsck.
  */
  '--incremental-schedule'?: string;

  /**
   * Specifies the number of cores to use for checking in parallel.
   */
  '--jobs'?: number | string;

  /**
   * Produces a JSON object on each line of output.
   * Type predicate [[isActionResult]] may be passed to [[safeParse]] or [[safeParseToArray]] when processing the output.
   */
  '--json'?: null;

  /**
  * Fscks the specified key.
  */
  '--key'?: string;

  /**
  * Resumes the last incremental fsck pass where it left off.
  */
  '--more'?: null;

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
