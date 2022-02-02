/**
 * InitremoteOptions defines the supported options for the git-annex initremote command.
 * @category Command Options
 */
export interface InitremoteOptions {

  /**
   * Makes the remote usable only from the repository where it was created.
   */
  '--private'?: null;

  /**
   * Uses the same underlying storage as another remote.
   */
  '--sameas'?: string;

  /**
   * Lists configuration parameters for the remote type.
   */
  '--whatelse'?: null;
}
