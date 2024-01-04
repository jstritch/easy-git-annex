/**
 * BranchListOptions defines the supported options for listing Git branches.
 * @category Command Options
 */
export interface BranchListOptions {

  /**
   * Show the shortest prefix that is at least <n> hexdigits long that uniquely identifies the object.
   * See also {@link --no-abbrev}.
   */
  '--abbrev'?: number | string;

  /**
   * Lists both remote-tracking branches and local branches.
   */
  '--all'?: null;

  /**
   * Displays the tag listing in columns.
   * See also {@link --no-column}.
   */
  '--column'?: string | string[] | null;

  /**
   * Lists branches which contain the specified commit; HEAD if not specified.
   * See also {@link --no-contains}.
   */
  '--contains'?: string | string[] | null;

  /**
   * Interpolates %(fieldname) from a branch ref being shown and the object it points at.
   */
  '--format'?: string;

  /**
   * Makes sorting and filtering tags case insensitive.
   */
  '--ignore-case'?: null;

  /**
   * Lists branches.
   */
  '--list'?: null;

  /**
   * Lists branches whose commits are reachable from the specified commit; HEAD if not specified.
   * See also {@link --no-merged}.
   */
  '--merged'?: string | string[] | null;

  /**
   * Prints the name of the current branch.
   */
  '--show-current'?: null;

  /**
   * Displays full sha1s in the output.
   * See also {@link --abbrev}.
   */
  '--no-abbrev'?: null;

  /**
   * Does not display the tag listing in columns.
   * See also {@link --column}.
   */
  '--no-column'?: null;

  /**
   * Lists branches which don't contain the specified commit; HEAD if not specified.
   * See also {@link --contains}.
   */
  '--no-contains'?: string | string[] | null;

  /**
   * Lists refs whose commits are not reachable from the specified commit; HEAD if not specified.
   * See also {@link --merged}.
   */
  '--no-merged'?: string | string[] | null;

  /**
   * Does not print a newline after formatted refs where the format expands to the empty string.
   */
  '--omit-empty'?: null;

  /**
   * Lists branches of the given object.
   */
  '--points-at'?: string | null;

  /**
   * Lists or deletes (if used with --delete) the remote-tracking branches.
   */
  '--remotes'?: null;

  /**
   * Sorts based on the given keys.
   */
  '--sort'?: string | string[];

  /**
   * Show the sha1 and commit subject line for each head in list mode.
   * May be repeated to include the path of the linked worktree (if any) and the name of the upstream branch.
   */
  '--verbose'?: null | [null, null?];
}
