/**
* Converts an operating-system relative path to a Git relative path.
*
* Git and git-annex commands use forward slash path separators
* regardless of platform.
* The gitPath function performs the conversion when necessary.
* @param relativePath The relative path to convert.
* @returns The converted relative path.
* @category Helper
*/
export function gitPath(relativePath: string): string {
  if (process.platform !== 'win32') {
    return relativePath;
  }
  return relativePath.replace(/\\/g, '/');
}

/**
 * Converts an array of operating-system relative paths to Git relative paths.
 *
 * Git and git-annex commands use forward slash path separators
 * regardless of platform.
 * The gitPaths function performs the conversions when necessary.
 * @param relativePaths The relative paths to convert.
 * @returns The converted relative paths.
 * @category Helper
 */
export function gitPaths(relativePaths: string[]): string[] {
  if (process.platform !== 'win32') {
    return relativePaths;
  }
  return relativePaths.map((relativePath) => { return relativePath.replace(/\\/g, '/'); });
}
