/**
 * ConfigGitOptions defines the supported options for the Git config command.
 * @category Command Options
 */
export interface ConfigGitOptions {

  /**
   * Gets a configuration value.
   * Provide the key name to interrogate.
   */
  '--get'?: string;

  /**
   * Accesses the global ~/.gitconfig file rather than the repository.
   */
  '--global'?: null;

  /**
   * Lists all variables set in the config file, along with their values.
   */
  '--list'?: null;

  /**
   * Accesses the repository .git/config file.
   */
  '--local'?: null;

  /**
  * Sets a configuration value.
  * Provide the key and value strings to set.
  *
  * Set is an anonymous option. The name `set` is not presented to the Git config command.
  * The values passed to the set option are passed as the parameters
  * `name` and `value` to the Git config command.
  */
  set?: [string, string];

  /**
   * Augments the output of all queried config options with the scope of that value.
   */
  '--show-scope'?: null;

  /**
   * Accesses the system-wide $(prefix)/etc/gitconfig file.
   */
  '--system'?: null;

  /**
  * Unsets a configuration value.
  * Provide the key name to remove.
  */
  '--unset'?: string;
}
