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

describe('unlock', () => {
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

  test('correctly unlocks one binary file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(binaryFile1);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add one binary file' });

    expect(commitResult.exitCode).toBe(0);

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));

    const unlockResult = await myAnx.unlock(binaryFile1);

    expect(unlockResult.exitCode).toBe(0);

    const unlockStatusResult = await myAnx.statusAnx();

    expect(unlockStatusResult.exitCode).toBe(0);
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`T ./${binaryFile1}`));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile1}`));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly unlocks one text file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(textFile1);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add one text file' });

    expect(commitResult.exitCode).toBe(0);

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));

    const unlockResult = await myAnx.unlock(textFile1);

    expect(unlockResult.exitCode).toBe(0);

    const unlockStatusResult = await myAnx.statusAnx();

    expect(unlockStatusResult.exitCode).toBe(0);
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile1}`));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(unlockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly unlocks an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([binaryFile1, textFile1], { '--message': 'add two files' });

    expect(commitResult.exitCode).toBe(0);

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));

    const unlockResult = await myAnx.unlock([binaryFile1, textFile1]);

    expect(unlockResult.exitCode).toBe(0);

    const unlockStatusResult = await myAnx.statusAnx();

    expect(unlockStatusResult.exitCode).toBe(0);
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`T ./${binaryFile1}`));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(unlockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly unlocks binary and text files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add two files' });

    expect(commitResult.exitCode).toBe(0);

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));

    const unlockResult = await myAnx.unlock();

    expect(unlockResult.exitCode).toBe(0);

    const unlockStatusResult = await myAnx.statusAnx();

    expect(unlockStatusResult.exitCode).toBe(0);
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`T ./${binaryFile1}`));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(unlockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly reports a nonexistent file', async () => {

    const unlockResult = await myAnx.unlock(nonexistentFile);

    expect(unlockResult.exitCode).not.toBe(0);
    expect(unlockResult.err).toEqual(expect.stringContaining(`git-annex: ${nonexistentFile} not found`));
  });

  test('correctly reports a nonexistent file in an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add four files' });

    expect(commitResult.exitCode).toBe(0);

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(binaryFile2));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(commitStatusResult.out).toEqual(expect.not.stringContaining(textFile2));

    const unlockResult = await myAnx.unlock([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(unlockResult.exitCode).not.toBe(0);
    expect(unlockResult.err).toEqual(expect.stringContaining(`git-annex: ${nonexistentFile} not found`));

    const unlockStatusResult = await myAnx.statusAnx();

    expect(unlockStatusResult.exitCode).toBe(0);
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`T ./${binaryFile1}`));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`T ./${binaryFile2}`));
    expect(unlockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(unlockStatusResult.out).toEqual(expect.not.stringContaining(textFile2));
  });

  test('correctly produces --json output', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add four files' });

    expect(commitResult.exitCode).toBe(0);

    const unlockResult = await myAnx.unlock(undefined, { '--json': null });

    expect(unlockResult.exitCode).toBe(0);
    /* eslint-disable no-useless-escape */
    expect(unlockResult.out).toEqual(expect.stringContaining(`\"command\":\"unlock\",\"success\":true,\"input\":[\"${binaryFile1}\"]`));
    expect(unlockResult.out).toEqual(expect.stringContaining(`\"command\":\"unlock\",\"success\":true,\"input\":[\"${binaryFile2}\"]`));
    expect(unlockResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(unlockResult.out).toEqual(expect.not.stringContaining(textFile2));
    /* eslint-enable no-useless-escape */

    const unlockStatusResult = await myAnx.statusAnx();

    expect(unlockStatusResult.exitCode).toBe(0);
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`T ./${binaryFile1}`));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`T ./${binaryFile2}`));
    expect(unlockResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(unlockResult.out).toEqual(expect.not.stringContaining(textFile2));
  });
});
