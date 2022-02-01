import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { promises as fs } from 'fs';

const projectPath = process.cwd();
const nonexistentFile = 'lorem ipsum.txt';
const binaryFile1 = 'file one.jpg';
const binaryFile1Path = path.join(projectPath, 'tests', 'data', binaryFile1);
const binaryFile2 = 'file two.jpg';
const binaryFile2Path = path.join(projectPath, 'tests', 'data', binaryFile2);
const textFile1 = 'file one.txt';
const textFile1Path = path.join(projectPath, 'tests', 'data', textFile1);
const textFile2 = 'file two.txt';
const textFile2Path = path.join(projectPath, 'tests', 'data', textFile2);

describe('commit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('commits one binary file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    const addResult = await myAnx.runGit(['add', binaryFile1]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(binaryFile1, { '--message': 'add one binary file' });

    expect(commitResult.exitCode).toBe(0);
    expect(commitResult.out).toContain(binaryFile1);
  });

  test('commits an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const addResult = await myAnx.runGit(['add', binaryFile1, textFile1]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([binaryFile1, textFile1], { '--message': 'add one binary and one text file' });

    expect(commitResult.exitCode).toBe(0);
    expect(commitResult.out).toContain(binaryFile1);
    expect(commitResult.out).toContain(textFile1);
  });

  test('commits all files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.runGit(['add', '.']);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add all four files' });

    expect(commitResult.exitCode).toBe(0);
    expect(commitResult.out).toContain(binaryFile1);
    expect(commitResult.out).toContain(binaryFile2);
    expect(commitResult.out).toContain(textFile1);
    expect(commitResult.out).toContain(textFile2);
  });

  test('reports a nonexistent file', async () => {

    const commitResult = await myAnx.commit(nonexistentFile, { '--message': 'add nonexistent file' });

    expect(commitResult.exitCode).not.toBe(0);
    expect(commitResult.err).toContain(nonexistentFile);
    expect(commitResult.out).toBe('');
  });

  test('reports a nonexistent file in an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.runGit(['add', '.']);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2], { '--message': 'add array with missing file' });

    expect(commitResult.exitCode).not.toBe(0);
    expect(commitResult.err).toContain(nonexistentFile);
    expect(commitResult.out).toBe('');
  });

});
