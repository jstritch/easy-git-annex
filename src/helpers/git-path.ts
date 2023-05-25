import { ProcessHelper } from './process-helper.js';

const slash = '/';
const slashRegExp = /\//g;
const backSlash = '\\';
const backSlashRegExp = /\\/g;

/**
 * Converts an operating-system relative path to a Git relative path.
 * See also {@link gitPaths}, {@link sysPath}, and {@link sysPaths}.
 *
 * Git and git-annex commands use forward slash path separators
 * regardless of platform.
 * The gitPath function performs the conversion when necessary.
 * @param relativePath The relative path to convert.
 * @returns The converted relative path.
 * @category Helper
 */
export function gitPath(relativePath: string): string {
  if (ProcessHelper.getPlatformName() !== 'win32') {
    return relativePath;
  }
  return relativePath.replaceAll(backSlashRegExp, slash);
}

/**
 * Converts an array of operating-system relative paths to Git relative paths.
 * See also {@link gitPath}, {@link sysPath}, and {@link sysPaths}.
 *
 * Git and git-annex commands use forward slash path separators
 * regardless of platform.
 * The gitPaths function performs the conversions when necessary.
 * @param relativePaths The relative paths to convert.
 * @returns The converted relative paths.
 * @category Helper
 */
export function gitPaths(relativePaths: string[]): string[] {
  if (ProcessHelper.getPlatformName() !== 'win32') {
    return relativePaths;
  }
  return relativePaths.map((relativePath) => { return relativePath.replaceAll(backSlashRegExp, slash); });
}

/**
 * Converts a Git relative path to an operating-system relative path.
 * See also {@link gitPath}, {@link gitPaths}, and {@link sysPaths}.
 *
 * @param relativePath The relative path to convert.
 * @returns The converted relative path.
 * @category Helper
 */
export function sysPath(relativePath: string): string {
  if (ProcessHelper.getPlatformName() !== 'win32') {
    return relativePath;
  }
  return relativePath.replaceAll(slashRegExp, backSlash);
}

/**
 * Converts an array of Git relative paths to operating-system relative paths.
 * See also {@link gitPath}, {@link gitPaths}, and {@link sysPath}.
 *
 * @param relativePaths The relative paths to convert.
 * @returns The converted relative paths.
 * @category Helper
 */
export function sysPaths(relativePaths: string[]): string[] {
  if (ProcessHelper.getPlatformName() !== 'win32') {
    return relativePaths;
  }
  return relativePaths.map((relativePath) => { return relativePath.replaceAll(slashRegExp, backSlash); });
}
