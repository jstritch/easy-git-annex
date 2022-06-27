/**
 * StatusGit defines an object returned by method {@link GitAnnexAPI.getStatusGit}.
 * Consult the
 * [Git status documentation](https://git-scm.com/docs/git-status)
 * for a description of the fields.
 * @category Returned Objects
 */
export interface StatusGit {

  /**
   * The X Git status field.
   * X often shows the status of the index.
   */
  x: string;

  /**
   * The Y Git status field.
   * Y often shows the status of the working tree.
   */
  y: string;

  /**
   * The relative file path.
   */
  path: string;

  /**
   * The original file path.
   */
  origPath?: string;
}
