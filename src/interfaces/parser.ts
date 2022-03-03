/**
 * Parser defines the signature of a string parsing function.
 * Parser functions return undefined when the string fails to convert.
 * @category Helper
 */

export interface Parser {
  /**
   * @param s The string to parse.
   * @returns The parsed value if successful; otherwise, undefined.
   */
  (s: string): unknown;
}