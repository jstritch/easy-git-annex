import { AnnexOptions } from './annex-options';

/**
 * AddAnxOptions defines the supported options for the git-annex add command.
 * @category Command Options
 */
export interface AddAnxOptions extends AnnexOptions {

  /**
   * Treats all files as large files, ignoring annex.largefiles and
   * annex.dotfiles configuration, and adds to git-annex.
   */
  '--force-large'?: null;

  /**
  * Treats all files as small files, ignoring annex.largefiles, annex.dotfiles
  * and annex.addsmallfiles configuration, and adds to git.
  */
  '--force-small'?: null;

  /**
   * Specifies the number of cores to use for adding multiple files in parallel.
   */
  '--jobs'?: number | string;

  /**
   * Produces a JSON object on each line of output.
   */
  '--json'?: null;

  /**
   * Includes progress objects in JSON output.
   * Specifying --json-progress automatically enables [['--json']].
   */
  '--json-progress'?: null;
}
