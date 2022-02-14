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

/**
 * Converts a string to a bigint.
 * @param s The string to parse.
 * @returns A bigint representation of s if successful; otherwise, undefined.
 * @category Helper
 */
export function parseBigInt(s: string): bigint | undefined {
  try {
    // must be a signed decimal integer
    if (s.search(/^[\s]*[+-]?\d*[\s]*$/) === 0) {
      const n = BigInt(s);
      return typeof n === 'bigint' ? n : undefined;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Converts a string to a number.
 * @param s The string to parse.
 * @returns A number representation of s if successful; otherwise, undefined.
 * @category Helper
 */
export function parseNumber(s: string): number | undefined {
  try {
    // unparsable strings must return undefined, not NaN
    const n = Number(s);
    return !Number.isNaN(n) ? n : s.search(/^[\s]*NaN[\s]*$/i) === 0 ? n : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Converts a string to a Date.
 * @param s The string to parse.
 * @returns A Date representation of s if successful; otherwise, undefined.
 * @category Helper
 */
export function parseUnixDate(s: string): Date | undefined {
  try {
    // must be an unsigned decimal integer
    if (s.search(/^[\s]*\d+[\s]*$/) === 0) {
      let t = Number(s);
      t *= 1000;
      return Number.isInteger(t) ? new Date(t) : undefined;
    }
    return undefined;
  } catch {
    return undefined;
  }
}
