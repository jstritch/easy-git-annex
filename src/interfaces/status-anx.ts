/**
 * StatusAnx defines an object returned by various git-annex commands.
 * Consult the
 * [git-annex status documentation](https://git-annex.branchable.com/git-annex-status/)
 * for a description of the fields.
 * @deprecated The git-annex status command was deprecated in version 10.20230321, use {@link StatusGit} instead.
 * @category Returned Objects
 */
export interface StatusAnx {

  /**
   * The file path.
   */
  file: string;

  /**
   * The file status.
   */
  status: string;

  /**
   * The error list.
   */
  'error-messages': string[];
}
