/**
 * CommitOptions defines the supported options for the Git commit command.
 * @category Command Options
 */
export interface CommitOptions {

  /**
   * Automatically stages modified and deleted files.
   */
  '--all'?: null;

  /**
   * Replaces the tip of the current branch by creating a new commit.
   */
  '--amend'?: null;

  /**
   * GPG-sign commits.
   * See also [[--no-gpg-sign]].
   */
  '--gpg-sign'?: string | null;

  /**
   * Specifies the commit message.
   */
  '--message'?: string;

  /**
   * The complement of [[--gpg-sign]].
   */
  '--no-gpg-sign'?: null;

  /**
   * Suppresses the commit summary message.
   */
  '--quiet'?: null;
}
