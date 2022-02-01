/**
 * RemoteCommand defines the subcommands recognized by the git remote command.
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
 * RemoteOptions defines the supported options for the git remote command.
 * @category Command Options
 */
export interface RemoteOptions {

  /**
   * Be a little more verbose and show remote url after name.
   */
  '--verbose'?: null;
}
