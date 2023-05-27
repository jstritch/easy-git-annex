/**
 * StashCommand defines the subcommands recognized by the Git stash command.
 */
export enum StashCommand {

  /**
   * Saves local modifications to a new stash entry.
   */
  Push = 'push',

  /**
   * Lists the stash entries.
   */
  List = 'list',

  /**
   * Shows the changes recorded in the stash entry as a diff.
   */
  Show = 'show',

  /**
   * Removes a single stashed state from the stash.
   */
  Pop = 'pop',

  /**
   * Like {@link Pop}, but does not remove the state from the stash list.
   */
  Apply = 'apply',

  /**
   * Creates and checks out a new branch.
   */
  Branch = 'branch',

  /**
   * Remove all the stash entries.
   */
  Clear = 'clear',

  /**
   * Removes a single stash entry from the list.
   */
  Drop = 'drop',

  /**
   * Creates a stash entry and return its object name without storing it anywhere in the ref namespace.
   * See also {@link Store}.
   */
  Create = 'create',

  /**
   * Store a given stash created via {@link Create}.
   */
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
   * See also {@link --no-include-untracked}.
   */
  '--include-untracked'?: null;

  /**
   * Reinstates not only the working tree’s changes, but also the index’s.
   */
  '--index'?: null;

  /**
   * Changes already added to the index are left intact.
   * See also {@link --no-keep-index}.
   */
  '--keep-index'?: null;

  /**
   * Excludes untracked files.
   * See also {@link --include-untracked}.
   */
  '--no-include-untracked'?: null;

  /**
   * The complement of {@link --keep-index}.
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
