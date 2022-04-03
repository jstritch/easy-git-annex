/**
 * RevParseOptions defines the supported options for the Git rev-parse command.
 * @category Command Options
 */
export interface RevParseOptions {

  /**
   * A non-ambiguous short name of the objects name.
   */
  '--abbrev-ref'?: string | null;

  /**
   * Like --git-dir, but its output is always the canonicalized absolute path.
   */
  '--absolute-git-dir'?: null;

  /**
   * Includes all the refs in refs/, along with HEAD.
   */
  '--all'?: null;

  /**
   * Includes all the refs in refs/heads.
   */
  '--branches'?: string | null;

  /**
   * If there is no parameter given by the user, uses arg instead.
   */
  '--default'?: string;

  /**
   * Shows every object whose name begins with the given prefix.
   */
  '--disambiguate'?: string;

  /**
   * Excludes all the refs matching the specified pattern.
   */
  '--exclude'?: string | string[];

  /**
   * Does not output non flag parameters.
   */
  '--flags'?: null;

  /**
   * Shows $GIT_COMMON_DIR, if defined; else, $GIT_DIR.
   */
  '--git-common-dir'?: null;

  /**
   * Shows $GIT_DIR, if defined.
   */
  '--git-dir'?: null;

  /**
   * Resolves "$GIT_DIR/path".
   */
  '--git-path'?: string;

  /**
   * Includes all the refs matching the specified pattern.
   */
  '--glob'?: string;

  /**
   * Determines if the the repository is bare.
   */
  '--is-bare-repository'?: null;

  /**
   * Determines if the current working directory is below the repository directory.
   */
  '--is-inside-git-dir'?: null;

  /**
   * Determines if the current working directory is inside the repository work tree.
   */
  '--is-inside-work-tree'?: null;

  /**
   * Determines if the the repository is shallow.
   */
  '--is-shallow-repository'?: null;

  /**
   * List the GIT_* environment variable names that are local to the repository.
   */
  '--local-env-vars'?: null;

  /**
   * Does not output flag parameters.
   */
  '--no-flags'?: null;

  /**
   * Does not output flags and parameters meant for Git rev-list command.
   */
  '--no-revs'?: null;

  /**
   * When showing object names, prefix them with ^ and strip ^ prefix from the object names that already have one.
   */
  '--not'?: null;

  /**
   * Selects the path format of certain other options.
   */
  '--path-format'?: string;

  /**
   * Behaves as if Git rev-parse was invoked from the arg subdirectory of the working tree.
   */
  '--prefix'?: string;

  /**
   * Does not output an error message if the first argument is not a valid object name.
   */
  '--quiet'?: null;

  /**
   * Includes all the refs in refs/remotes.
   */
  '--remotes'?: string | null;

  /**
   * Checks if path is a valid repository or a gitfile that points at a valid repository, and print the location of the repository.
   */
  '--resolve-git-dir'?: string;

  /**
   * Does not output flags and parameters not meant for Git rev-list command.
   */
  '--revs-only'?: null;

  /**
   * Shows the path to the shared index file in split index mode.
   */
  '--shared-index-path'?: null;

  /**
   * Same as --verify but shortens the object name to a unique prefix with at least length characters.
   */
  '--short'?: number | string | null;

  /**
   * Shows the path of the top-level directory relative to the current directory.
   */
  '--show-cdup'?: null;

  /**
   * Shows the object format (hash algorithm) used.
   */
  '--show-object-format'?: string | null;

  /**
   * Shows the path of the current directory relative to the top-level directory.
   */
  '--show-prefix'?: null;

  /**
   * Shows the absolute path of the root of the superproject’s working tree.
   */
  '--show-superproject-working-tree'?: null;

  /**
   * Shows the path of the top-level directory of the working tree.
   */
  '--show-toplevel'?: null;

  /**
   * Usually the object names are output in SHA-1 form (with possible ^ prefix); this option makes them output in a form as close to the original input as possible.
   */
  '--symbolic'?: null;

  /**
   * Similar to --symbolic, but it omits input that are not refs.
   */
  '--symbolic-full-name'?: null;

  /**
   * Includes all the refs in refs/tags.
   */
  '--tags'?: string | null;

  /**
   * Verifies exactly one parameter is provided, and that it can be turned into a raw 20-byte SHA-1 that can be used to access the object database.
   */
  '--verify'?: null;
}
