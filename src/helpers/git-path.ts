/**
* Converts an operating-system relative path to a git relative path.
*
* Git and git-annex commands use forward slash path separators
* regardless of platform.
* The gitPath method performs the conversion when necessary for the operating system.
* @category Helper
*/
export function gitPath(relativePath: string): string {
  return relativePath.replace(/\\/g, '/');
}

/**
 * Converts an array of operating-system relative paths to git relative paths.
 *
 * Git and git-annex commands use forward slash path separators
 * regardless of platform.
 * The gitPath method performs the conversions when necessary for the operating system.
 * @category Helper
 */
export function gitPaths(relativePaths: string[]): string[] {
  return relativePaths.map((relativePath) => { return gitPath(relativePath); });
}
