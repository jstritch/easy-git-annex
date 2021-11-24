import { AnnexOptions } from './annex-options';

/**
 * VersionOptions defines the aupported options for the git-annex version command.
 * @category Annex Command Options
 */
export interface VersionOptions extends AnnexOptions {

  /**
   * Causes only git-annex's version to be output, excluding other information.
   */
  '--raw'?: null;
}
