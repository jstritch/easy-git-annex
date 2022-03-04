/**
 * TagOptions defines the supported options for the Git tag command.
 * @category Command Options
 */
export interface TagOptions {

  /**
   * Makes an annotated tag.
   */
  '--annotate'?: null;

  /**
   * Sets how the tag message is cleaned up.
   */
  '--cleanup'?: string;

  /**
   * Displays the tag listing in columns.
   * See also [[--no-column]].
   */
  '--column'?: string | string[] | null;

  /**
   * Lists tags which contain the specified commit; HEAD if not specified.
   * See also [[--no-contains]].
   */
  '--contains'?: string | null;

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
   * Interpolates %(fieldname) from a tag ref being shown and the object it points at.
   */
  '--format'?: string;

  /**
   * Makes sorting and filtering tags case insensitive.
   */
  '--ignore-case'?: null;

  /**
   * Lists tags.
   */
  '--list'?: null;

  /**
   * Makes a GPG-signed tag using the given key.
   */
  '--local-user'?: string;

  /**
   * Lists tags whose commits are reachable from the specified commit; HEAD if not specified.
   * See also [[--no-merged]].
   */
  '--merged'?: string | null;

  /**
   * Specifies the tag message.
   */
  '--message'?: string;

  /**
   * Does not display the tag listing in columns.
   * See also [[--column]].
   */
  '--no-column'?: null;

  /**
   * Lists tags which don't contain the specified commit; HEAD if not specified.
   * See also [[--contains]].
   */
  '--no-contains'?: string | null;

  /**
   * Overrides an earlier --create-reflog.
   * See also [[--create-reflog]].
   */
  '--no-create-reflog'?: null;

  /**
   * Lists tags whose commits are not reachable from the specified commit; HEAD if not specified.
   * See also [[--merged]].
   */
  '--no-merged'?: string | null;

  /**
   * Overrides the tag.gpgSign configuration variable.
   * See also [[--sign]].
   */
  '--no-sign'?: null;

  /**
   * Lists tags of the given object; HEAD if not specified.
   */
  '--points-at'?: string | null;

  /**
   * Makes a GPG-signed tag.
   * See also [[--no-sign]].
   */
  '--sign'?: null;

  /**
   * Sorts based on the given keys.
   */
  '--sort'?: string | string[];

  /**
   * Verifies the GPG signature of the given names.
   */
  '--verify'?: null;

  /**
   * Specifies how many lines from the annotation, if any, are printed.
   * If null is given, only the first line is printed.
   */
  '-n'?: number | string | null;
}
