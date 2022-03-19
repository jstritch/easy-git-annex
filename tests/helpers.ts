import * as anx from '../src/index';
import * as os from 'os';
import * as path from 'path';
import { promises as fs } from 'fs';

export enum TestFile {
  JPG1 = 'file one.jpg',
  TXT1 = 'file one.txt',
  JPG2 = 'file two.jpg',
  TXT2 = 'file two.txt',
  JPG3 = 'file two 3.jpg',
  TXT3 = 'file two 3.txt',
}

export const allTestFiles = Object.values(TestFile);

const projectPath = process.cwd();
const dataFilePath = path.join(projectPath, 'tests', 'data');

export function cloneEnv(): NodeJS.ProcessEnv {
  return Object.assign({}, process.env);
}

export async function pathExists(aPath: string): Promise<boolean> {
  try {
    await fs.access(aPath);
  } catch {
    return false;
  }
  return true;
}

export async function createDirectory(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'anx-'));
}

export async function deleteDirectory(repositoryPath: string): Promise<void> {
  await fs.rmdir(repositoryPath, { recursive: true });
}

export async function createRepository(repositoryPath?: string): Promise<string> {
  const repoPath = repositoryPath ?? await createDirectory();
  const myAnx = anx.createAccessor(repoPath);
  await myAnx.initGit();
  return repoPath;
}

export async function setRepositoryAuthor(repositoryPath: string): Promise<void> {
  const myAnx = anx.createAccessor(repositoryPath);
  await myAnx.configGit({ set: ['user.email', 'author@example.com'] });
  await myAnx.configGit({ set: ['user.name', 'A U Thor'] });
}

export async function copyFile(testFile: TestFile | TestFile[], destinationDir: string, destinationFile?: string): Promise<void> {
  if (!Array.isArray(testFile)) {
    await fs.copyFile(path.join(dataFilePath, testFile), path.join(destinationDir, destinationFile ?? testFile));
  } else {
    for (const file of testFile) {
      await fs.copyFile(path.join(dataFilePath, file), path.join(destinationDir, file));
    }
  }
}

export async function copyAddAnx(testFile: TestFile | TestFile[], destinationDir: string): Promise<void> {
  await copyFile(testFile, destinationDir);
  const myAnx = anx.createAccessor(destinationDir);
  await myAnx.addAnx(testFile);
}

export async function copyAddGit(testFile: TestFile | TestFile[], destinationDir: string): Promise<void> {
  await copyFile(testFile, destinationDir);
  const myAnx = anx.createAccessor(destinationDir);
  await myAnx.addGit(testFile);
}

export async function commitFile(testFile: TestFile | TestFile[], destinationDir: string, message: string): Promise<void> {
  const myAnx = anx.createAccessor(destinationDir);
  const commitResult = await myAnx.commit(testFile, { '--message': message });
  expect(commitResult).toBeNull();
  expect(commitResult.exitCode).toBe(0);
}

export async function copyAddAnxCommit(testFile: TestFile | TestFile[], destinationDir: string, message: string): Promise<void> {
  await copyAddAnx(testFile, destinationDir);
  await commitFile(testFile, destinationDir, message);
}

export async function copyAddGitCommit(testFile: TestFile | TestFile[], destinationDir: string, message: string): Promise<void> {
  await copyAddGit(testFile, destinationDir);
  await commitFile(testFile, destinationDir, message);
}
