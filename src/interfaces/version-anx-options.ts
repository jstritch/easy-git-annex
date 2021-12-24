import { AnnexOptions } from './annex-options';

/**
 * VersionAnxOptions defines the supported options for the git-annex version command.
 * @category Command Options
 */
export interface VersionAnxOptions extends AnnexOptions {

  /**
   * Causes only git-annex's version to be output, excluding other information.
   */
  '--raw'?: null;
}
