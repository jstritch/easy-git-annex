import { BranchListOptions } from './branch-list-options';
/**
 * BranchOptions defines the supported options for the Git branch command.
 * @category Command Options
 */
export interface BranchOptions extends BranchListOptions {

  /**
   * Copies a branch.
   */
  '--copy'?: null;

  /**
   * Creates the branch’s reflog.
   * See also {@link --no-create-reflog}.
   */
  '--create-reflog'?: null;

  /**
   * Deletes an branch.
   */
  '--delete'?: null;

  /**
   * Replaces an existing branch with the given name, instead of failing.
   */
  '--force'?: null;

  /**
   * Lists branches.
   */
  '--list'?: null;

  /**
   * Moves/renames a branch.
   */
  '--move'?: null;

  /**
   * Overrides an earlier --create-reflog.
   * See also {@link --create-reflog}.
   */
  '--no-create-reflog'?: null;

  /**
   * Does not set up "upstream" configuration.
   * See also {@link --track}.
   */
  '--no-track'?: null;

  /**
   * Suppresses non-error messages.
   */
  '--quiet'?: null;

  /**
   * Causes the current command to recurse into submodules.
   */
  '--recurse-submodules'?: null;

  /**
   * Sets "upstream" tracking configuration to the specified branch.
   */
  '--set-upstream-to'?: string;

  /**
   * Sets "upstream" tracking configuration for the new branch.
   * See also {@link --no-track}.
   */
  '--track'?: string | null;

  /**
   * Removes "upstream" tracking configuration.
   */
  '--unset-upstream'?: null;
}
