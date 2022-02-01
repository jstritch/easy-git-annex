import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { promises as fs } from 'fs';

const projectPath = process.cwd();
const binaryFile1 = 'file one.jpg';
const binaryFile1Path = path.join(projectPath, 'tests', 'data', binaryFile1);
const binaryFile2 = 'file two.jpg';
const binaryFile2Path = path.join(projectPath, 'tests', 'data', binaryFile2);
const textFile1 = 'file one.txt';
const textFile1Path = path.join(projectPath, 'tests', 'data', textFile1);
const textFile2 = 'file two.txt';
const textFile2Path = path.join(projectPath, 'tests', 'data', textFile2);

describe('statusGit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('returns status with defaults', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const statusResult = await myAnx.statusGit();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toContain(binaryFile1);
    expect(statusResult.out).toContain(binaryFile2);
    expect(statusResult.out).toContain(textFile1);
    expect(statusResult.out).toContain(textFile2);
    expect(statusResult.out).not.toContain('\0');
  });

  test('returns --porcelain=v1 -z', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const statusResult = await myAnx.statusGit(undefined, { '--porcelain': 'v1', '-z': null });

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toContain(binaryFile1);
    expect(statusResult.out).toContain(binaryFile2);
    expect(statusResult.out).toContain(textFile1);
    expect(statusResult.out).toContain(textFile2);
    expect(statusResult.out).toContain('\0');
  });

});
