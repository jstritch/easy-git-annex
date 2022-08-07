/**
 * AnnexOptions are accepted by many git-annex commands.
 * Consult the
 * [git-annex-common-options documentation](https://git-annex.branchable.com/git-annex-common-options/)
 * for additional information.
 * @category Command Options
 */
export interface AnnexOptions {

  /**
   * Overrides Git configuration settings.
   * To override one value, specify `['name', 'value']`.
   * Use a [string, string][] to specify multiple values.
   */
  '--c'?: [string, string] | [string, string][];

  /**
   * Displays debug messages.
   */
  '--debug'?: null;

  /**
   * Shows debug messages coming from a module.
   * To specify multiple modules, use a string[].
   */
  '--debugfilter'?: string | string[];

  /**
   * Avoids slow operations normally performed by a command.
   */
  '--fast'?: null;

  /**
   * Allows actions that may lose annexed data
   */
  '--force'?: null;

  /**
   * Overrides the mincopies setting.
   */
  '--mincopies'?: number | string;

  /**
   * Prevents debug message display.
   */
  '--no-debug'?: null;

  /**
   * Overrides the numcopies setting.
   */
  '--numcopies'?: number | string;

  /**
   * Suppresses verbose output.
   */
  '--quiet'?: null;

  /**
   * Limits the total size of annexed files a git-annex command can process.
   */
  '--size-limit'?: string;

  /**
   * Limits the duration of a git-annex command.
   */
  '--time-limit'?: string;

  /**
   * Enables verbose display.
   */
  '--verbose'?: null;
}
