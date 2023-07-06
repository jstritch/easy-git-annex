import { AnnexOptions } from './annex-options.js';

/**
 * PushAnxOptions defines the supported options for the git-annex push command.
 * @category Command Options
 */
export interface PushAnxOptions extends AnnexOptions {

  /**
   * Operates on all available versions of all annexed files.
   */
  '--all'?: null;

  /**
   * Removes the local and remote synced/ branches which were created and pushed by git-annex push or git-annex sync.
   * This option prevents all other activities.
   */
  '--cleanup'?: null;

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
   * Avoids uploading (and dropping) the content of annexed files.
   * See also {@link --content}.
   */
  '--no-content'?: null;

  /**
   * Overrides the annex.synconlyannex configuration.
   * See also {@link --only-annex}.
   */
  '--not-only-annex'?: null;

  /**
   * Only pushes the git-annex branch and annexed content to remotes, not other git branches.
   * See also {@link --not-only-annex}.
   */
  '--only-annex'?: null;

}
