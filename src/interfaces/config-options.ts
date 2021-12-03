import { AnnexOptions } from './annex-options';

/**
 * ConfigOptions defines the supported options for the git-annex config command.
 * @category Annex Command Options
 */
export interface ConfigOptions extends AnnexOptions {

  /**
   * Gets a configuration value.
   * Provide the key name to interrogate.
   */
  '--get'?: string;

  /**
  * Sets a configuration value.
  * Provide the key and value strings to set.
  */
  '--set'?: [string, string];

  /**
  * Unsets a configuration value.
  * Provide the key name to remove.
  */
  '--unset'?: string;
}
