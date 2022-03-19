/**
 * StashCommand defines the subcommands recognized by the Git stash command.
 */
export enum StashCommand {
  Push = 'push',
  List = 'list',
  Show = 'show',
  Pop = 'pop',
  Apply = 'apply',
  Branch = 'branch',
  Clear = 'clear',
  Drop = 'drop',
  Create = 'create',
  Store = 'store',
}

/**
 * StashOptions defines the supported options for the Git stash command.
 * @category Command Options
 */
export interface StashOptions {

  /**
   * Includes ignored and untracked files.
   */
  '--all'?: null;

  /**
   * Includes untracked files.
   * See also [[--no-include-untracked]].
   */
  '--include-untracked'?: null;

  /**
   * Reinstates not only the working tree’s changes, but also the index’s.
   */
  '--index'?: null;

  /**
   * Changes already added to the index are left intact.
   * See also [[--no-keep-index]].
   */
  '--keep-index'?: null;

  /**
   * Excludes untracked files.
   * See also [[--include-untracked]].
   */
  '--no-include-untracked'?: null;

  /**
   * The complement of [[--keep-index]].
   */
  '--no-keep-index'?: null;

  /**
   * Shows only the untracked files in the stash entry as part of the diff.
   */
  '--only-untracked'?: null;

  /**
   * Suppresses feedback messages.
   */
  '--quiet'?: null;

  /**
   * Stashes only the changes that are currently staged.
   */
  '--staged'?: null;
}
