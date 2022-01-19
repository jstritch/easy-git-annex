import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { promises as fs } from 'fs';

const projectPath = process.cwd();
const nonexistentFile = 'lorem ipsum.txt';
const binaryFile1 = 'file1.jpg';
const binaryFile1Path = path.join(projectPath, 'tests', 'data', binaryFile1);
const binaryFile2 = 'file2.jpg';
const binaryFile2Path = path.join(projectPath, 'tests', 'data', binaryFile2);
const textFile1 = 'file1.txt';
const textFile1Path = path.join(projectPath, 'tests', 'data', textFile1);
const textFile2 = 'file2.txt';
const textFile2Path = path.join(projectPath, 'tests', 'data', textFile2);

describe('rm', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
  });

  test('removes one binary file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    const addResult = await myAnx.addAnx(binaryFile1);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(binaryFile1, { '--message': 'add one binary file' });

    expect(commitResult.exitCode).toBe(0);

    const rmResult = await myAnx.rm(binaryFile1);

    expect(rmResult.exitCode).toBe(0);
    expect(rmResult.out).not.toBe('');
  });

  test('removes one text file', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const addResult = await myAnx.addAnx(textFile1);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(textFile1, { '--message': 'add one text file' });

    expect(commitResult.exitCode).toBe(0);

    const rmResult = await myAnx.rm(textFile1);

    expect(rmResult.exitCode).toBe(0);
  });

  test('removes an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([binaryFile1, textFile1], { '--message': 'add one binary and one text file' });

    expect(commitResult.exitCode).toBe(0);

    const rmResult = await myAnx.rm([binaryFile1, textFile1]);

    expect(rmResult.exitCode).toBe(0);
  });

  test('reports a nonexistent file', async () => {

    const rmResult = await myAnx.rm(nonexistentFile);

    expect(rmResult.exitCode).not.toBe(0);
    expect(rmResult.err).toContain(nonexistentFile);
  });

  test('reports a nonexistent file in an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([binaryFile1, textFile1, binaryFile2, textFile2], { '--message': 'add four files' });

    expect(commitResult.exitCode).toBe(0);

    const rmResult = await myAnx.rm([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(rmResult.exitCode).not.toBe(0);
    expect(rmResult.err).toContain(nonexistentFile);
  });

  test('ignores a nonexistent file when --ignore-unmatch is specified', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([binaryFile1, textFile1, binaryFile2, textFile2], { '--message': 'add four files' });

    expect(commitResult.exitCode).toBe(0);

    const rmResult = await myAnx.rm([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2], { '--ignore-unmatch': null });

    expect(rmResult.exitCode).toBe(0);
  });

  test('accepts the -r and --force options', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add all four files' });

    expect(commitResult.exitCode).toBe(0);

    const unlockResult = await myAnx.unlock(binaryFile2);

    expect(unlockResult.exitCode).toBe(0);

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile2));
    const rmResult = await myAnx.rm('.', { '-r': null, '--force': null });

    expect(rmResult.exitCode).toBe(0);
  });

  test('accepts the quiet option', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    const addResult = await myAnx.addAnx(binaryFile1);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(binaryFile1, { '--message': 'add one binary file' });

    expect(commitResult.exitCode).toBe(0);

    const rmResult = await myAnx.rm(binaryFile1, { '--quiet': null });

    expect(rmResult.exitCode).toBe(0);
    expect(rmResult.out).toBe('');
  });

});
