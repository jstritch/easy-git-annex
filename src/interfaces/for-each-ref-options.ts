/**
 * ForEachRefOptions defines the supported options for the Git for-each-ref command.
 * @category Command Options
 */
export interface ForEachRefOptions {

  /**
   * Lists refs which contain the specified commit; HEAD if not specified.
   * See also [[--no-contains]].
   */
  '--contains'?: string | null;

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
   * See also [[--no-merged]].
   */
  '--merged'?: string | null;

  /**
   * Lists refs which don't contain the specified commit; HEAD if not specified.
   * See also [[--contains]].
   */
  '--no-contains'?: string | null;

  /**
   * Lists refs whose commits are not reachable from the specified commit; HEAD if not specified.
   * See also [[--merged]].
   */
  '--no-merged'?: string | null;

  /**
   * Lists refs of the given object.
   */
  '--points-at'?: string | null;

  /**
   * Sorts based on the given keys.
   */
  '--sort'?: string | string[];
}
