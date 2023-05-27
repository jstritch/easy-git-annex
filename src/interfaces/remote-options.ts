/**
 * RemoteCommand defines the subcommands recognized by the Git remote command.
 */
export enum RemoteCommand {

  /**
   * Adds a remote for the repository.
   */
  Add = 'add',

  /**
   * Renames a remote.
   */
  Rename = 'rename',

  /**
   * Removes a remote.
   */
  Remove = 'remove',

  /**
   * Sets or deletes the default branch for a remote.
   */
  SetHead = 'set-head',

  /**
   * Changes the list of branches tracked by a remote.
   */
  SetBranches = 'set-branches',

  /**
   * Retrieves the URLs for a remote.
   */
  GetUrl = 'get-url',

  /**
   * Changes the URLs for a remote.
   */
  SetUrl = 'set-url',

  /**
   * Obtains some information about a remote.
   */
  Show = 'show',

  /**
   * Deletes stale references.
   */
  Prune = 'prune',

  /**
   * Fetches updates for remotes or remote groups in the repository.
   */
  Update = 'update',
}

/**
 * RemoteOptions defines the supported options for the Git remote command.
 * @category Command Options
 */
export interface RemoteOptions {

  /**
   * Shows the remote url after the name.
   */
  '--verbose'?: null;
}
