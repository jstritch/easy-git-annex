/**
 * ListTagOptions defines the supported options for listing tags with the Git tag method.
 * @category Command Options
 */
export interface ListTagOptions {

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
   * Interpolates %(fieldname) from a tag ref being shown and the object it points at.
   */
  '--format'?: string;

  /**
   * Makes sorting and filtering tags case insensitive.
   */
  '--ignore-case'?: null;

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
   * Lists tags whose commits are not reachable from the specified commit; HEAD if not specified.
   * See also [[--merged]].
   */
  '--no-merged'?: string | null;

  /**
   * Lists tags whose commits are reachable from the specified commit; HEAD if not specified.
   * See also [[--no-merged]].
   */
  '--merged'?: string | null;

  /**
   * Lists tags of the given object; HEAD if not specified.
   */
  '--points-at'?: string | null;

  /**
   * Sorts based on the given keys.
   */
  '--sort'?: string | string[];

  /**
   * Specifies how many lines from the annotation, if any, are printed.
   * If null is given, only the first line is printed.
   */
  '-n'?: number | null;
}
