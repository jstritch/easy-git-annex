import { AnnexOptions } from './annex-options.js';

/**
 * PullAnxOptions defines the supported options for the git-annex pull command.
 * @category Command Options
 */
export interface PullAnxOptions extends AnnexOptions {

  /**
   * Operates on all available versions of all annexed files.
   */
  '--all'?: null;

  /**
   * Controls whether to merge histories that do not share a common ancestor.
   * See also {@link --no-allow-unrelated-histories}.
   */
  '--allow-unrelated-histories'?: null;

  /**
   * Specifies the key-value backend to use when importing from a special remote.
   * Method {@link GitAnnexAPI.getBackends} obtains a list of backend names.
   */
  '--backend'?: string;

  /**
   * Overrides the annex.synccontent configuration.
   * See also {@link --no-content}.
   */
  '--content'?: null;

  /**
   * Limits the transferred files to the specified relative paths.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   */
  '--content-of'?: string | string[];

  /**
   * Specifies the number of cores to use for processing multiple files in parallel.
   */
  '--jobs'?: number | string;

  /**
   * The complement of {@link --allow-unrelated-histories}.
   */
  '--no-allow-unrelated-histories'?: null;

  /**
   * Avoids downloading (and dropping) the content of annexed files.
   * See also {@link --content}.
   */
  '--no-content'?: null;

  /**
   * Disables automatic merge conflict resolution.
   * See also {@link --resolvemerge}.
   */
  '--no-resolvemerge'?: null;

  /**
   * Overrides the annex.synconlyannex configuration.
   * See also {@link --only-annex}.
   */
  '--not-only-annex'?: null;

  /**
   * Only pulls the git-annex branch and annexed content from remotes, not other git branches.
   * See also {@link --not-only-annex}.
   */
  '--only-annex'?: null;

  /**
   * The complement of {@link --no-resolvemerge}.
   */
  '--resolvemerge'?: null;

}
