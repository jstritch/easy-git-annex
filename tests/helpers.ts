import * as anx from '../src/index.ts';
import * as os from 'node:os';
import * as path from 'node:path';
import { chmodR } from '../src/helpers/chmodr.ts';
import { promises as fs } from 'node:fs';

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

export function cloneEnv(): Record<string, unknown> {
  return Object.assign({}, process.env);
}

export async function createDirectory(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'anx-'));
}

export async function deleteDirectory(repositoryPath: string, chmod = false): Promise<void> {
  if (chmod) {
    await chmodR(repositoryPath, 0o777);
  }
  await fs.rm(repositoryPath, { recursive: true, force: true });
}

export async function createRepository(repositoryPath?: string): Promise<string> {
  const repoPath = repositoryPath ?? await createDirectory();
  const myAnx = anx.createAccessor(repoPath);
  await myAnx.initGit({ '--initial-branch': 'master' });
  return repoPath;
}

export async function setRepositoryAuthor(repositoryPath: string): Promise<void> {
  const myAnx = anx.createAccessor(repositoryPath);
  await myAnx.configGit({ set: ['user.email', 'author@example.com'] });
  await myAnx.configGit({ set: ['user.name', 'A U Thor'] });
}

export async function copyFile(testFile: TestFile | TestFile[], destinationDir: string, destinationFile?: string): Promise<void> {
  if (Array.isArray(testFile)) {
    for (const file of testFile) {
      await fs.copyFile(path.join(dataFilePath, file), path.join(destinationDir, file));
    }
  } else {
    await fs.copyFile(path.join(dataFilePath, testFile), path.join(destinationDir, destinationFile ?? testFile));
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
