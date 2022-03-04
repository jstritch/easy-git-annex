import { ListTagOptions } from './list-tag-options';

/**
 * TagOptions defines the supported options for the Git tag command.
 * @category Command Options
 */
export interface TagOptions extends ListTagOptions {

  /**
   * Makes an annotated tag.
   */
  '--annotate'?: null;

  /**
   * Creates a reflog for the tag.
   * See also [[--no-create-reflog]].
   */
  '--create-reflog'?: null;

  /**
   * Deletes an existing tag with the given name.
   */
  '--delete'?: null;

  /**
   * Replaces an existing tag with the given name, instead of failing.
   */
  '--force'?: null;

  /**
   * Lists tags.
   */
  '--list'?: null;

  /**
   * Makes a GPG-signed tag using the given key.
   */
  '--local-user'?: string;

  /**
   * Specifies the tag message.
   */
  '--message'?: string;

  /**
   * Overrides an earlier --create-reflog.
   * See also [[--create-reflog]].
   */
  '--no-create-reflog'?: null;

  /**
   * Overrides the tag.gpgSign configuration variable.
   * See also [[--sign]].
   */
  '--no-sign'?: null;

  /**
   * Makes a GPG-signed tag.
   * See also [[--no-sign]].
   */
  '--sign'?: null;

  /**
   * Verifies the GPG signature of the given names.
   */
  '--verify'?: null;
}
