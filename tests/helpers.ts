import * as anx from '../src/index';
import * as os from 'os';
import * as path from 'path';
import { promises as fs } from 'fs';

export function cloneEnv(): NodeJS.ProcessEnv {
  return Object.assign({}, process.env);
}

export async function createDirectory(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'anx-'));
}

export async function createRepository(repositoryPath?: string): Promise<string> {
  const repoPath = repositoryPath ?? await createDirectory();
  const myAnx = anx.createAccessor(repoPath);
  await myAnx.initGit();
  return repoPath;
}

export async function setRepositoryAuthor(repositoryPath: string): Promise<void> {
  const myAnx = anx.createAccessor(repositoryPath);
  await myAnx.configGit({ set: ['user.email', 'easy-git-annex@example.com'] });
  await myAnx.configGit({ set: ['user.name', 'Some Person'] });
}

export async function deleteDirectory(repositoryPath: string): Promise<void> {
  await fs.rmdir(repositoryPath, { recursive: true });
}

export async function pathExists(aPath: string): Promise<boolean> {
  try {
    await fs.access(aPath);
  } catch {
    return false;
  }
  return true;
}
