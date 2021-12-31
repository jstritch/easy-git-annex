/**
 * TagOptions defines the supported options for the git tag command.
 * @category Command Options
 */
export interface TagOptions {

  /**
   * Makes an annotated tag.
   */
  '--annotate'?: null;

  /**
   * Deletes an existing tag with the given name.
   */
  '--delete'?: null;

  /**
   * Replaces an existing tag with the given name, instead of failing.
   */
  '--force'?: null;

  /**
   * Specifies the tag message.
   */
  '--message'?: string;
}
