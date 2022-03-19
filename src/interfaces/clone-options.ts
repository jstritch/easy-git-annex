/**
 * CloneOptions defines the supported options for the Git clone command.
 * @category Command Options
 */
export interface CloneOptions {

  /**
   * Creates a bare Git repository.
   */
  '--bare'?: null;

  /**
   * Points to the specified branch after cloning.
   */
  '--branch'?: string;

  /**
   * Sets a configuration variable in the cloned repository.
   */
  '--config'?: [string, string] | [string, string][];

  /**
   * Creates a shallow clone with a history truncated to the specified number of commits.
   */
  '--depth'?: number | string;

  /**
   * Stops the borrowing initiated by [[--reference]].
   */
  '--dissociate'?: null;

  /**
   * Selects a subset of reachable objects.
   */
  '--filter'?: string;

  /**
   * Specifies the number of submodules fetched simultaneously.
   */
  '--jobs'?: number | string;

  /**
   * Bypasses the "Git aware" transport mechanism.
   */
  '--local'?: null;

  /**
   * Sets up a mirror of the source repository.
   */
  '--mirror'?: null;

  /**
   * Does not checkout HEAD after the clone is complete.
   */
  '--no-checkout'?: null;

  /**
   * Copeis files instead of using hardlinks on a locl filesystem..
   */
  '--no-hardlinks'?: null;

  /**
   * The complement of [[--reject-shallow]].
   */
  '--no-reject-shallow'?: null;

  /**
   * The complement of [[--remote-submodules]].
   */
  '--no-remote-submodules'?: null;

  /**
   * The complement of [[--shallow-submodules]].
   */
  '--no-shallow-submodules'?: null;

  /**
   * The complement of [[--single-branch]].
   */
  '--no-single-branch'?: null;

  /**
   * Does not clone any tags.
   */
  '--no-tags'?: null;

  /**
   * Specifies the remote name of the upstream repository.
   * If unspecified, the value `origin` is used.
   */
  '--origin'?: string;

  /**
   * Forces progress reports to the standard error stream.
   */
  '--progress'?: null;

  /**
   * Suppresses progress reports to the standard error stream.
   */
  '--quiet'?: null;

  /**
   * Initializes and clones submodules based on the provided pathspec after cloning.
   */
  '--recurse-submodules'?: string | string[];

  /**
   * Obtains objects from the reference repository on the local machine.
   */
  '--reference'?: string;

  /**
   * Performs a [[--reference]] if the reference exists;
   * otherwise, ignores with a warning.
   */
  '--reference-if-able'?: string;

  /**
   * Fails if the source is a shallow repository.
   * See also [[--no-reject-shallow]].
   */
  '--reject-shallow'?: null;

  /**
   * Submodules which are cloned will use the status of the submodule’s remote-tracking branch
   * to update the submodule, rather than the superproject’s recorded SHA-1.
   */
  '--remote-submodules'?: null;

  /**
   * Separates the repository from working tree.
   */
  '--separate-git-dir'?: string;

  /**
   * Transmits the given strings to the server when communicating using protocol version 2.
   */
  '--server-option'?: string | string[];

  /**
   * Creates a shallow clone with a history, excluding commits reachable from the specified remote branch or tag.
   */
  '--shallow-exclude'?: string | string[];

  /**
   * Creates a shallow clone with history after the specified time.
   */
  '--shallow-since'?: Date | string;

  /**
   * Clones submodules with a depth of 1.
   * See also [[--no-shallow-submodules]].
   */
  '--shallow-submodules'?: null;

  /**
   * Shares objects with the source repository on a local machine.
   */
  '--shared'?: null;

  /**
   * Clones only the history leading to the tip of a single branch.
   * See also [[--no-single-branch]].
   */
  '--single-branch'?: null;

  /**
   * Employs a sparse-checkout, with only files in the top-level directory initially being present.
   */
  '--sparse'?: null;

  /**
   * Specifies the directory from which templates will be used.
   */
  '--template'?: string;

  /**
   * Specifies a non-default path for the command run on the other end when accessed via ssh.
   */
  '--upload-pack'?: string;

  /**
   * Sends additional progress information to the standard error stream.
   * The --verbose option is independent of [[--progress]] and [[--quiet]].
   */
  '--verbose'?: null;
}
