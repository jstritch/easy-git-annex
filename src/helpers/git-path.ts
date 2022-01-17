/**
* Converts an operating-system relative path to a git relative path.
*
* Git and git-annex commands use forward slash path separators
* regardless of platform.
* Windows requires paths with spaces be enclosed in quotation marks.
* The gitPath method performs the conversions as necessary for the platform.
* @param relativePath The relative path to convert.
* @returns The converted relative path.
* @category Helper
*/
export function gitPath(relativePath: string): string {
  if (process.platform !== 'win32') {
    return relativePath;
  }
  const separated = relativePath.replace(/\\/g, '/');
  return !separated.includes(' ') ? separated : `"${separated}"`;
}

/**
 * Converts an array of operating-system relative paths to git relative paths.
 *
 * Git and git-annex commands use forward slash path separators
 * regardless of platform.
 * Windows requires paths with spaces be enclosed in quotation marks.
 * The gitPaths method performs the conversions as necessary for the platform.
 * @param relativePaths The relative paths to convert.
 * @returns The converted relative paths.
 * @category Helper
 */
export function gitPaths(relativePaths: string[]): string[] {
  if (process.platform !== 'win32') {
    return relativePaths;
  }
  return relativePaths.map((relativePath) => { return gitPath(relativePath); });
}
