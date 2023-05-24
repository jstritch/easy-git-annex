import { FetchCommonOptions } from './fetch-common-options.js';

/**
 * FetchOptions defines the supported options for the Git fetch command.
 * @category Command Options
 */
export interface FetchOptions extends FetchCommonOptions {

  /**
   * Allows several repository and group arguments to be specified.
   */
  '--multiple'?: null;

  /**
   * Disables recursive fetching of submodules.
   */
  '--no-recurse-submodules'?: null;

  /**
   * Does not write a commit-graph after fetching.
   * See also {@link --write-commit-graph}.
   */
  '--no-write-commit-graph'?: null;
  /**
   * Removes any local tags that no longer exist on the remote.
   */
  '--prune-tags'?: null;

  /**
   * Suppresses progress reports to the standard error stream.
   */
  '--quiet'?: null;

  /**
   * Controls if and under what conditions new commits of populated submodules should be fetched.
   */
  '--recurse-submodules'?: string | null;

  /**
   * Provides a non-negative default value for the --recurse-submodules option.
   */
  '--recurse-submodules-default'?: string;

  /**
   * Prepends path to paths printed in informative messages.
   */
  '--submodule-prefix'?: string;

  /**
   * Updates .git/shallow.
   */
  '--update-head-ok'?: null;

  /**
   * Be --verbose.
   */
  '--verbose'?: null;

  /**
   * Writes a commit-graph after fetching.
   * See also {@link --no-write-commit-graph}.
   */
  '--write-commit-graph'?: null;
}
