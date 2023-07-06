import { AnnexOptions } from './annex-options.js';

/**
 * ConfigAnxOptions defines the supported options for the git-annex config command.
 * @category Command Options
 */
export interface ConfigAnxOptions extends AnnexOptions {

  /**
  * Used in combination with --show-origin to specify the filename to check in .gitattributes.
  * Provide the file name to examine.
  * The gitPath function is called internally.
  */
  '--for-file'?: string;

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
  * Shows where the value is configured.
  * Provide the key name to examine.
  */
  '--show-origin'?: string;

  /**
  * Unsets a configuration value.
  * Provide the key name to remove.
  */
  '--unset'?: string;
}
