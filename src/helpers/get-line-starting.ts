/**
 * Searches a multi-line string and returns the first line begining with the specified prefix.
 * The prefix may be included with or omitted from the return string.
 *
 * @param str The string to be searched.
 * @param prefix The string to locate at the beginning of a line.
 * @param includePrefix A flag indicating whether the prefix is to be included in the return value.
 * @returns The requested line or null if the prefix was not located.
 * @category Helper
 */
export function getLineStarting(str: string, prefix: string, includePrefix: boolean): string | null {
  const re = new RegExp(includePrefix ? `^${prefix}.*$` : `(?<=^${prefix}).*$`, 'm');
  const matches = str.match(re);
  return matches !== null && matches.length > 0 ? matches[0] : null;
}

/**
 * Searches a multi-line string and returns the first line begining with the specified prefix as a string array.
 * The return array is created by removing the prefix from the beginning-of-line and
 * splitting the rest of the line at each space character.
 *
 * @param str The string to be searched.
 * @param prefix The string to locate at the beginning of a line.
 * @returns The requested line as a string array or null if the prefix was not located.
 * @category Helper
 */
export function getLineStartingAsArray(str: string, prefix: string): string[] | null {
  const line = getLineStarting(str, prefix, false);
  if (line === null) {
    return null;
  }
  return line.length > 0 ? line.split(' ') : [];
}
