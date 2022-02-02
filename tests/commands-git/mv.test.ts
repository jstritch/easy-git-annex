import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory, setRepositoryAuthor } from '../helpers';
import { promises as fs } from 'fs';

const projectPath = process.cwd();
const subDir = 'sub directory';
const nonexistentFile = 'lorem ipsum.txt';
const textFile1 = 'file one.txt';
const textFile1Path = path.join(projectPath, 'tests', 'data', textFile1);
const textFile2 = 'file two.txt';
const textFile2Path = path.join(projectPath, 'tests', 'data', textFile2);

describe('mv', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('renames one text file', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const addResult = await myAnx.runGit(['add', textFile1]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(textFile1, { '--message': 'add one text file' });

    expect(commitResult).toBeNull();
    expect(commitResult.exitCode).toBe(0);

    const mvResult = await myAnx.mv(textFile1, textFile2);

    expect(mvResult.exitCode).toBe(0);
  });

  test('renames an array of files showing file names with --verbose', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.runGit(['add', textFile1, textFile2]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([textFile1, textFile2], { '--message': 'add two text files' });

    expect(commitResult).toBeNull();
    expect(commitResult.exitCode).toBe(0);

    await fs.mkdir(path.join(repositoryPath, subDir));
    const mvResult = await myAnx.mv([textFile1, textFile2], subDir, { '--verbose': null });

    expect(mvResult.exitCode).toBe(0);
    expect(mvResult.out).toContain('Renaming');
  });

  test('renames over an existing file with --force', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.runGit(['add', textFile1, textFile2]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([textFile1, textFile2], { '--message': 'add two text files' });

    expect(commitResult).toBeNull();
    expect(commitResult.exitCode).toBe(0);

    const mvResult = await myAnx.mv(textFile1, textFile2, { '--force': null });

    expect(mvResult.exitCode).toBe(0);
  });

  test('reports a nonexistent source file', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.runGit(['add', textFile1, textFile2]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([textFile1, textFile2], { '--message': 'add two text files' });

    expect(commitResult).toBeNull();
    expect(commitResult.exitCode).toBe(0);

    await fs.mkdir(path.join(repositoryPath, subDir));
    const mvResult = await myAnx.mv([textFile1, nonexistentFile, textFile2], subDir);

    expect(mvResult.exitCode).not.toBe(0);
  });

  test('ignores a nonexistent source file with -k', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.runGit(['add', textFile1, textFile2]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([textFile1, textFile2], { '--message': 'add two text files' });

    expect(commitResult).toBeNull();
    expect(commitResult.exitCode).toBe(0);

    await fs.mkdir(path.join(repositoryPath, subDir));
    const mvResult = await myAnx.mv([textFile1, nonexistentFile, textFile2], subDir, { '-k': null });

    expect(mvResult.exitCode).toBe(0);
  });

});
