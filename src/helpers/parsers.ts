/**
 * Converts a string to a bigint.
 * @param s A string to parse.
 * @returns A bigint representation of s if successful; otherwise, undefined.
 * @category Parser
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
 * @param s A string to parse.
 * @returns A number representation of s if successful; otherwise, undefined.
 * @category Parser
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
 * Converts a string to an optional string.
 * @param s A string to parse.
 * @returns If s has non-zero length, s; otherwise, undefined.
 * @category Parser
 */
export function parseOptionalString(s: string): string | undefined {
  return s.length > 0 ? s : undefined;
}

/**
 * Converts a string to a Date.
 * @param s A string representing seconds since 1 January 1970 UTC.
 * @returns A Date representation of s if successful; otherwise, undefined.
 * @category Parser
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
