/**
 * VersionAnx defines an object returned by method {@link GitAnnexAPI.getVersionAnx}.
 * Consult the
 * [git-annex version documentation](https://git-annex.branchable.com/git-annex-version/)
 * for additional information.
 * @category Returned Objects
 */
export interface VersionAnx {

  /**
   * The git-annex version `git-annex version`.
   */
  version: string;

  /**
   * The git-annex version `build flags`.
   */
  buildFlags: string[];

  /**
   * The git-annex version `dependency versions`.
   */
  dependencyVersions: string[];

  /**
   * The git-annex version `key/value backends`.
   */
  keyValueBackends: string[];

  /**
   * The git-annex version `remote types`.
   */
  remoteTypes: string[];

  /**
   * The git-annex version `operating system`.
   */
  operatingSystem: string;

  /**
   * The git-annex version `supported repository versions`.
   */
  supportsRepositories: string[];

  /**
   * The git-annex version `upgrade supported from repository versions`.
   */
  upgradesRepositories: string[];
}
