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

  test('correctly removes one binary file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(binaryFile1);

    expect(addResult.exitCode).toBe(0);

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const commitResult = await myAnx.commit(binaryFile1, { '--message': 'add one binary file' });

    expect(commitResult.exitCode).toBe(0);

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(commitStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(commitStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile1}`));
    expect(commitStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const rmResult = await myAnx.rm(binaryFile1);

    expect(rmResult.exitCode).toBe(0);

    const rmStatusResult = await myAnx.statusAnx();

    expect(rmStatusResult.exitCode).toBe(0);
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${binaryFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const rmCommitResult = await myAnx.commit(binaryFile1, { '--message': 'remove one binary file' });

    expect(rmCommitResult.exitCode).toBe(0);

    const rmCommitStatusResult = await myAnx.statusAnx();

    expect(rmCommitStatusResult.exitCode).toBe(0);
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(rmCommitStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(rmCommitStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile1}`));
    expect(rmCommitStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly removes one text file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(textFile1);

    expect(addResult.exitCode).toBe(0);

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const commitResult = await myAnx.commit(textFile1, { '--message': 'add one text file' });

    expect(commitResult.exitCode).toBe(0);

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile1}`));
    expect(commitStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(commitStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const rmResult = await myAnx.rm(textFile1);

    expect(rmResult.exitCode).toBe(0);

    const rmStatusResult = await myAnx.statusAnx();

    expect(rmStatusResult.exitCode).toBe(0);
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${textFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const rmCommitResult = await myAnx.commit(textFile1, { '--message': 'remove one text file' });

    expect(rmCommitResult.exitCode).toBe(0);

    const rmCommitStatusResult = await myAnx.statusAnx();

    expect(rmCommitStatusResult.exitCode).toBe(0);
    expect(rmCommitStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile1}`));
    expect(rmCommitStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(rmCommitStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly removes an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1]);

    expect(addResult.exitCode).toBe(0);

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const commitResult = await myAnx.commit([binaryFile1, textFile1], { '--message': 'add one binary and one text file' });

    expect(commitResult.exitCode).toBe(0);

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(commitStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(commitStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const rmResult = await myAnx.rm([binaryFile1, textFile1]);

    expect(rmResult.exitCode).toBe(0);

    const rmStatusResult = await myAnx.statusAnx();

    expect(rmStatusResult.exitCode).toBe(0);
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${binaryFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${textFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const rmCommitResult = await myAnx.commit([binaryFile1, textFile1], { '--message': 'remove two files' });

    expect(rmCommitResult.exitCode).toBe(0);

    const rmCommitStatusResult = await myAnx.statusAnx();

    expect(rmCommitStatusResult.exitCode).toBe(0);
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(rmCommitStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(rmCommitStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly removes all files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));

    const commitResult = await myAnx.commit(undefined, { '--message': 'add all four files' });

    expect(commitResult.exitCode).toBe(0);
    expect(commitResult.out).not.toBe('');

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile2));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(textFile2));

    const unlockResult = await myAnx.unlock(binaryFile2);

    expect(unlockResult.exitCode).toBe(0);

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile2));
    const rmResult = await myAnx.rm('.', { '-r': null, '--force': null });

    expect(rmResult.exitCode).toBe(0);

    const rmStatusResult = await myAnx.statusAnx();

    expect(rmStatusResult.exitCode).toBe(0);
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${binaryFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${binaryFile2}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${textFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${textFile2}`));

    const rmCommitResult = await myAnx.commit(undefined, { '--message': 'remove all files' });

    expect(rmCommitResult.exitCode).toBe(0);

    const rmCommitStatusResult = await myAnx.statusAnx();

    expect(rmCommitStatusResult.exitCode).toBe(0);
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile2));
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(textFile2));
  });

  test('correctly reports a nonexistent file', async () => {

    const statusResult = await myAnx.rm(nonexistentFile);

    expect(statusResult.exitCode).not.toBe(0);
    expect(statusResult.err).toEqual(expect.stringContaining(nonexistentFile));
    expect(statusResult.out).toBe('');
  });

  test('correctly does not commit with a nonexistent file in an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));

    const commitResult = await myAnx.commit([binaryFile1, textFile1, binaryFile2, textFile2], { '--message': 'add array with missing file' });

    expect(commitResult.exitCode).toBe(0);

    const rmResult = await myAnx.rm([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(rmResult.exitCode).not.toBe(0);
  });

  test('correctly ignores a nonexistent file when --ignore-unmatch is specified', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));

    const commitResult = await myAnx.commit([binaryFile1, textFile1, binaryFile2, textFile2], { '--message': 'add array with missing file' });

    expect(commitResult.exitCode).toBe(0);

    const rmResult = await myAnx.rm([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2], { '--ignore-unmatch': null });

    expect(rmResult.exitCode).toBe(0);

    const rmStatusResult = await myAnx.statusAnx();

    expect(rmStatusResult.exitCode).toBe(0);
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${binaryFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${binaryFile2}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${textFile1}`));
    expect(rmStatusResult.out).toEqual(expect.stringContaining(`D ./${textFile2}`));

    const rmCommitResult = await myAnx.commit(undefined, { '--message': 'remove all files' });

    expect(rmCommitResult.exitCode).toBe(0);

    const rmCommitStatusResult = await myAnx.statusAnx();

    expect(rmCommitStatusResult.exitCode).toBe(0);
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile2));
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(rmCommitStatusResult.out).toEqual(expect.not.stringContaining(textFile2));
  });

});
