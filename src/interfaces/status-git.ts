/**
 * StatusGit defines an object returned by helper method [[getStatusGit]].
 * Consult the
 * [git status documentation](https://git-scm.com/docs/git-status)
 * for a description of the fields.
 * @category Returned Objects
 */
export interface StatusGit {

  /**
   * The X git status field.
   * X often shows the status of the index.
   */
  x: string;

  /**
   * The Y git status field.
   * Y often shows the status of the working tree.
   */
  y: string;

  /**
   * The file path.
   */
  path: string;

  /**
   * The original file path.
   */
  origPath?: string;
}
