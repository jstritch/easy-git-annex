/**
 * FsckGitOptions defines the supported options for the Git fsck command.
 * @category Command Options
 */
export interface FsckGitOptions {

  /**
   * Considers any object recorded in the index also as a head node for an unreachability trace.
   */
  '--cache'?: null;

  /**
   * Checks only the connectivity of reachable objects, making sure that any objects referenced by a reachable tag, commit, or tree are present.
   */
  '--connectivity-only'?: null;

  /**
   * Prints objects that exist but are never directly used.
   * See also {@link --no-dangling}.
   */
  '--dangling'?: null;

  /**
   * Includes objects in pack subdirectories and alternate object pools.
   * See also {@link --no-full}.
   */
  '--full'?: null;

  /**
   * Writes dangling objects into .git/lost-found/commit/ or .git/lost-found/other/, depending on type.
   */
  '--lost-found'?: null;

  /**
   * Displays a name that describes how objects are reachable in addition to the SHA-1.
   */
  '--name-objects'?: null;

  /**
   * Suppresses printing of objects that exist but are never direcConsiders any object recorded in the index also as a head node for an unreachability tracetly used.
   * See also {@link --dangling}.
   */
  '--no-dangling'?: null;

  /**
   * Excludes objects in pack subdirectories and alternate object pools.
   * See also {@link --full}.
   */
  '--no-full'?: null;

  /**
   * Suppresses progress reports to the standard error stream.
   * See also {@link --progress}.
   */
  '--no-progress'?: null;

  /**
   * Does not consider commits referenced only by an entry in a reflog to be reachable.
   */
  '--no-reflogs'?: null;

  /**
   * Forces progress reports to the standard error stream.
   * See also {@link --no-progress}.
   */
  '--progress'?: null;

  /**
   * Reports root nodes.
   */
  '--root'?: null;

  /**
   * Enables more strict checking.
   */
  '--strict'?: null;

  /**
   * Reports tags.
   */
  '--tags'?: null;

  /**
   * Prints out objects that exist but aren’t reachable from any of the reference nodes.
   */
  '--unreachable'?: null;

  /**
   * Be chatty.
   */
  '--verbose'?: null;
}
