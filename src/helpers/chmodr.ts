import * as path from 'path';
import { promises as fs } from 'fs';

/**
 * Recursively modifies the permissions of the specified directory.
 *
 * @param fullPath The full path of the directory to modify.
 * @param mode The desired file mode bit mask.
 * @category Helper
 */
export async function chmodR(fullPath: string, mode: number): Promise<void> {
  await fs.chmod(fullPath, mode);
  const dirEntries = await fs.readdir(fullPath, { encoding: 'utf8', withFileTypes: true });
  for (const dirEntry of dirEntries) {
    const nextPath = path.join(fullPath, dirEntry.name);
    if (dirEntry.isDirectory()) {
      await chmodR(nextPath, mode);
    } else {
      await fs.chmod(nextPath, mode);
    }
  }
}
