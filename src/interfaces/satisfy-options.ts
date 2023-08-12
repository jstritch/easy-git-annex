import { AnnexOptions } from './annex-options.js';

/**
 * SatisfyOptions defines the supported options for the git-annex satisfy command.
 * @category Command Options
 */
export interface SatisfyOptions extends AnnexOptions {

  /**
   * Operates on all available versions of all annexed files.
   */
  '--all'?: null;

  /**
   * Limits the transferred files to the specified relative paths.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   */
  '--content-of'?: string | string[];

  /**
   * Specifies the number of cores to use for processing multiple files in parallel.
   */
  '--jobs'?: number | string;

}
