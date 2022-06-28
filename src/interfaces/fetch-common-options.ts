/**
 * FetchCommonOptions defines the supported fetch options used by commands.
 * @category Command Options
 */
export interface FetchCommonOptions {

  /**
   * Fetches all remotes.
   */
  '--all'?: null;

  /**
   * Appends ref names and object names of fetched refs to the existing contents of .git/FETCH_HEAD.
   */
  '--append'?: null;

  /**
   * Uses an atomic transaction to update local refs.
   */
  '--atomic'?: null;

  /**
   * Limits fetching to the specified number of commits from the tip of each remote branch history.
   */
  '--depth'?: number | string;

  /**
   * Specifies the number of commits from the current shallow boundary.
   */
  '--deepen'?: number | string;

  /**
   * Overrides check to update the local branch.
   */
  '--force'?: null;

  /**
   * Uses IPv4 addresses only, ignoring IPv6 addresses.
   */
  '--ipv4'?: null;

  /**
   * Uses IPv6 addresses only, ignoring IPv4 addresses.
   */
  '--ipv6'?: null;

  /**
   * Specifies the number of parallel children to be used for all forms of fetching.
   */
  '--jobs'?: number | string;

  /**
   * Keeps downloaded pack.
   */
  '--keep'?: null;

  /**
   * Prints the ancestors of the provided --negotiation-tip values.
   */
  '--negotiate-only'?: null;

  /**
   * Reports commits reachable from the given tips.
   */
  '--negotiation-tip'?: string | string[];

  /**
   * Does not check if a branch is force-updated during fetch.
   * See also {@link --show-forced-updates}.
   */
  '--no-show-forced-updates'?: null;

  /**
   * Disables automatic tag following.
   */
  '--no-tags'?: null;

  /**
   * Modifies the configured refspec to place all refs into the refs/prefetch/ namespace.
   */
  '--prefetch'?: null;

  /**
   * Forces progress reports to the standard error stream.
   */
  '--progress'?: null;

  /**
   * Removes any remote-tracking references that no longer exist on the remote.
   */
  '--prune'?: null;

  /**
   * Fetches all objects as a fresh clone would.
   */
  '--refetch'?: null;

  /**
   * Uses the specified refspec to map the refs to remote-tracking branches.
   */
  '--refmap'?: string | string[];

  /**
   * Transmits the given strings to the server when communicating using protocol version 2.
   */
  '--server-option'?: string | string[];

  /**
   * Adds upstream (tracking) reference.
   */
  '--set-upstream'?: null;

  /**
   * Deepens or shortens the history of a shallow repository to exclude commits reachable from a specified remote branch or tag.
   */
  '--shallow-exclude'?: string | string[];

  /**
   * Deepens or shortens the history of a shallow repository to include all reachable commits after date.
   */
  '--shallow-since'?: Date | string;

  /**
   * Checks if a branch is force-updated during fetch.
   * See also {@link --no-show-forced-updates}.
   */
  '--show-forced-updates'?: null;

  /**
   * Fetches all tags from the remote.
   */
  '--tags'?: null;

  /**
   * Converts a shallow repository to a complete one.
   */
  '--unshallow'?: null;

  /**
   * Updates .git/shallow.
   */
  '--update-head-ok'?: null;

  /**
   * Updates .git/shallow.
   */
  '--update-shallow'?: null;
}
