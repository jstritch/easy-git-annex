/**
 * PushOptions defines the supported options for the Git push command.
 * @category Command Options
 */
export interface PushOptions {

  /**
   * Pushes all branches.
   */
  '--all'?: null;

  /**
   * Uses an atomic transaction to update local refs.
   */
  '--atomic'?: null;

  /**
   * Deletes all listed refs from the remote repository.
   */
  '--delete'?: null;

  /**
   * Pushes all the refs that would be pushed without this option, and also pushes annotated tags in refs/tags that are missing from the remote but are pointing at commit-ish that are reachable from the refs being pushed.
   */
  '--follow-tags'?: null;

  /**
   * Updates a remote ref whose current value does not match what is expected.
   */
  '--force'?: null;

  /**
   * Forces an update only if the tip of the remote-tracking ref has been integrated locally.
   * See also [[--no-force-if-includes]].
   */
  '--force-if-includes'?: null;

  /**
   * Permits updating a remote ref that is not an ancestor of the local ref used to overwrite it.
   */
  '--force-with-lease'?: string | null;

  /**
   * Uses IPv4 addresses only, ignoring IPv6 addresses.
   */
  '--ipv4'?: null;

  /**
   * Uses IPv6 addresses only, ignoring IPv4 addresses.
   */
  '--ipv6'?: null;

  /**
   * Specifies that all refs under refs/ be mirrored to the remote repository.
   */
  '--mirror'?: null;

  /**
   * Does not use an atomic transaction to update local refs.
   */
  '--no-atomic'?: null;

  /**
   * The complement of [[--force-if-includes]].
   */
  '--no-force-if-includes'?: null;

  /**
   * Disallows updating a remote ref that is not an ancestor of the local ref used to overwrite it.
   */
  '--no-force-with-lease'?: null;

  /**
   * Does not ensure all submodule commits used by the revisions to be pushed are available on a remote-tracking branch.
   */
  '--no-recurse-submodules'?: null;

  /**
   * Does not GPG-sign the push request to update refs on the receiving side.
   */
  '--no-signed'?: null;

  /**
   * The complement of [[--thin]].
   */
  '--no-thin'?: null;

  /**
   * Disables the pre-push hook.
   */
  '--no-verify'?: null;

  /**
   * Produces machine-readable output.
   */
  '--porcelain'?: null;

  /**
   * Forces progress reports to the standard error stream.
   */
  '--progress'?: null;

  /**
   * Removes remote branches that don’t have a local counterpart.
   */
  '--prune'?: null;

  /**
   * Transmits the given string to the server, which passes them to the pre-receive as well as the post-receive hook.
   */
  '--push-option'?: string | string[];

  /**
   * Suppresses all output.
   */
  '--quiet'?: null;

  /**
   * Ensures all submodule commits used by the revisions to be pushed are available on a remote-tracking branch.
   */
  '--recurse-submodules'?: string;

  /**
   * Equivalent to the repository argument.
   */
  '--repo'?: string;

  /**
   * Adds upstream (tracking) reference every branch that is up to date or successfully pushed.
   */
  '--set-upstream'?: null;

  /**
   * GPG-signs the push request to update refs on the receiving side.
   */
  '--signed'?: string | null;

  /**
   * Pushes all refs under refs/tags.
   */
  '--tags'?: null;

  /**
   * A thin transfer significantly reduces the amount of sent data when the sender and receiver share many of the same objects in common.
   * See also [[--no-thin]].
   */
  '--thin'?: null;

  /**
   * Suppresses all output.
   */
  '--verbose'?: null;

  /**
   * Enables the pre-push hook.
   */
  '--verify'?: null;
}
