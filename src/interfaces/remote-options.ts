/**
 * RemoteCommand defines the subcommands recognized by the Git remote command.
 */
export enum RemoteCommand {
  Add = 'add',
  Rename = 'rename',
  Remove = 'remove',
  SetHead = 'set-head',
  SetBranches = 'set-branches',
  GetUrl = 'get-url',
  SetUrl = 'set-url',
  Show = 'show',
  Prune = 'prune',
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
