import { AnnexOptions } from './annex-options.js';

/**
 * ConfigAnxOptions defines the supported options for the git-annex config command.
 * @category Command Options
 */
export interface ConfigAnxOptions extends AnnexOptions {

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
