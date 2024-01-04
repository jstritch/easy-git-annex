/**
 * ForEachRefOptions defines the supported options for the Git for-each-ref command.
 * @category Command Options
 */
export interface ForEachRefOptions {

  /**
   * Lists refs which contain the specified commit; HEAD if not specified.
   * See also {@link --no-contains}.
   */
  '--contains'?: string | string[] | null;

  /**
   * Limits the number of refs returned.
   */
  '--count'?: number | string;

  /**
   * Interpolates %(fieldname) from a ref being shown and the object it points at.
   */
  '--format'?: string;

  /**
   * Makes sorting and filtering refs case insensitive.
   */
  '--ignore-case'?: null;

  /**
   * Lists refs whose commits are reachable from the specified commit; HEAD if not specified.
   * See also {@link --no-merged}.
   */
  '--merged'?: string | string[] | null;

  /**
   * Lists refs which don't contain the specified commit; HEAD if not specified.
   * See also {@link --contains}.
   */
  '--no-contains'?: string | string[] | null;

  /**
   * Lists refs whose commits are not reachable from the specified commit; HEAD if not specified.
   * See also {@link --merged}.
   */
  '--no-merged'?: string | string[] | null;

  /**
   * Does not print a newline after formatted refs where the format expands to the empty string.
   */
  '--omit-empty'?: null;

  /**
   * Lists refs of the given object.
   */
  '--points-at'?: string | null;

  /**
   * Sorts based on the given keys.
   */
  '--sort'?: string | string[];
}
