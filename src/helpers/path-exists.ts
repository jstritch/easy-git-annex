import { promises as fs } from 'fs';

/**
 * Determines if a file or directory exists.
 * @param fullPath The full path of the file or directory to examine.
 * @returns True if the path exists; otherwise, false.
 * @category Helper
 */
export async function pathExists(fullPath: string): Promise<boolean> {
  try {
    await fs.access(fullPath);
  } catch {
    return false;
  }
  return true;
}
