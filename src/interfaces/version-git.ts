/**
 * VersionGit defines an object returned by method {@link GitAnnexAPI.getVersionGit}.
 * Consult the
 * [Git version documentation](https://git-scm.com/docs/git-version)
 * for additional information.
 * @category Returned Objects
 */
export interface VersionGit {

  /**
   * The Git version `git version`.
   */
  version: string;

  /**
   * The Git version `cpu`.
   */
  cpu: string;

  /**
   * The Git version `commit`.
   */
  commit?: string;

  /**
   * The Git version `sizeof-long`.
   */
  longSize: string;

  /**
   * The Git version `sizeof-size_t`.
   */
  sizeTSize: string;

  /**
   * The Git version `shell-path`.
   */
  shellPath: string;
}
