/**
 * SubmoduleCommand defines the subcommands recognized by the Git submodule command.
 */
export enum SubmoduleCommand {

  /**
   * Moves the git directory of the submodule into its superproject.
   */
  AbsorbGitDirs = 'absorbgitdirs',

  /**
   * Adds the given repository as a submodule.
   */
  Add = 'add',

  /**
   * Unregisters the given submodules.
   */
  Deinit = 'deinit',

  /**
   * Evaluates an arbitrary shell command in each checked out submodule.
   */
  ForEach = 'foreach',

  /**
   * Initializes the submodules recorded in the index .
   */
  Init = 'init',

  /**
   * Sets the default remote tracking branch for the submodule.
   */
  SetBranch = 'set-branch',

  /**
   * Sets the URL of the specified submodule.
   */
  SetUrl = 'set-url',

  /**
   * Shows the status of the submodules.
   */
  Status = 'status',

  /**
   * Shows a commit summary.
   */
  Summary = 'summary',

  /**
   * Synchronizes submodules' remote URL configuration setting.
   */
  Sync = 'sync',

  /**
   * Updates the registered submodules to match what the superproject expects.
   */
  Update = 'update',
}

/**
 * SubmoduleOptions defines the supported options for the Git submodule command.
 * @category Command Options
 */
export interface SubmoduleOptions {

  /**
   * Unregisters all submodules in the working tree.
   */
  '--all'?: null;

  /**
   * Specifies the branch.
   */
  '--branch'?: string;

  /**
   * Uses the commit in the index instead of HEAD.
   */
  '--cached'?: null;

  /**
   * Overrides submodule.$name.update.
   */
  '--checkout'?: null;

  /**
   * Causes the tracking branch to default to the remote HEAD.
   */
  '--default'?: null;

  /**
   * Creates a shallow clone with history truncated to the specified number of revisions.
   */
  '--depth'?: number | string;

  /**
   * Modifies the behavior of {@link --reference}.
   */
  '--dissociate'?: null;

  /**
   * Compares the commit in the index to HEAD.
   */
  '--files'?: null;

  /**
   * Specifies the filter.
   */
  '--filter'?: string;

  /**
   * Overrides command-specific behavior.
   */
  '--force'?: null;

  /**
   * Initializes submodules.
   */
  '--init'?: null;

  /**
   * Limits parallel submodule cloning.
   */
  '--jobs'?: number | string;

  /**
   * Merges the commit in the superproject into the submodule.
   */
  '--merge'?: null;

  /**
   * Sets the submodule name.
   */
  '--name'?: string;

  /**
   * Does not fetch new objects from the remote.
   */
  '--no-fetch'?: null;

  /**
   * Overrides submodule.name.shallow.
   * See also {@link --recommend-shallow}.
   */
  '--no-recommend-shallow'?: null;

  /**
   * Does not create only one branch.
   * See also {@link --single-branch}.
   */
  '--no-single-branch'?: null;

  /**
   * Reports progress on the standard error stream.
   */
  '--progress'?: null;

  /**
   * Rebases the current branch onto the commit in the superproject.
   */
  '--rebase'?: null;

  /**
   * Overrides submodule.name.shallow.
   * See also {@link --no-recommend-shallow}.
   */
  '--recommend-shallow'?: null;

  /**
   * Traverses submodules recursively.
   */
  '--recursive'?: null;

  /**
   * Specifies the repository to clone.
   */
  '--reference'?: string;

  /**
   * Uses the status of the submodule's remote tracking branch.
   */
  '--remote'?: null;

  /**
   * Creates only one branch.
   * See also {@link --no-single-branch}.
   */
  '--single-branch'?: null;

  /**
   * Limits the summary size.
   */
  '--summary-limit'?: number | string;

  /**
   * Prints error messages only.
   */
  '--quiet'?: null;

}
