import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { promises as fs } from 'fs';
import { gitPath } from '../../src/helpers/git-path';

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

describe('lock', () => {
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

  test('correctly locks one binary file', async () => {

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

    const lockResult = await myAnx.lock(binaryFile1);

    expect(lockResult.exitCode).toBe(0);

    const lockStatusResult = await myAnx.statusAnx();

    expect(lockStatusResult.exitCode).toBe(0);
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile1}`));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly locks one text file', async () => {

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

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(statusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));

    const lockResult = await myAnx.lock(textFile1);

    expect(lockResult.exitCode).toBe(0);

    const lockStatusResult = await myAnx.statusAnx();

    expect(lockStatusResult.exitCode).toBe(0);
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile1}`));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly locks an array of files', async () => {

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

    const lockResult = await myAnx.lock([binaryFile1, textFile1]);

    expect(lockResult.exitCode).toBe(0);

    const lockStatusResult = await myAnx.statusAnx();

    expect(lockStatusResult.exitCode).toBe(0);
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly locks binary and text files', async () => {

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

    const lockResult = await myAnx.lock();

    expect(lockResult.exitCode).toBe(0);

    const lockStatusResult = await myAnx.statusAnx();

    expect(lockStatusResult.exitCode).toBe(0);
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

  test('correctly reports a nonexistent file', async () => {

    const lockResult = await myAnx.lock(nonexistentFile);

    expect(lockResult.exitCode).not.toBe(0);
    expect(lockResult.err).toEqual(expect.stringContaining(`git-annex: ${gitPath(nonexistentFile)} not found`));
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

    const unlockResult = await myAnx.unlock([binaryFile1, textFile1, binaryFile2, textFile2]);

    expect(unlockResult.exitCode).toBe(0);

    const unlockStatusResult = await myAnx.statusAnx();

    expect(unlockStatusResult.exitCode).toBe(0);
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`T ./${binaryFile1}`));
    expect(unlockStatusResult.out).toEqual(expect.stringContaining(`T ./${binaryFile2}`));
    expect(unlockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(unlockStatusResult.out).toEqual(expect.not.stringContaining(textFile2));

    const lockResult = await myAnx.lock([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(lockResult.exitCode).not.toBe(0);

    const lockStatusResult = await myAnx.statusAnx();

    expect(lockStatusResult.exitCode).toBe(0);
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(binaryFile2));
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(textFile2));
  });

  test('correctly produces --json output', async () => {

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

    const lockResult = await myAnx.lock(undefined, { '--json': null });

    expect(lockResult.exitCode).toBe(0);
    /* eslint-disable no-useless-escape */
    expect(lockResult.out).toEqual(expect.stringContaining(`\"command\":\"lock\",\"success\":true,\"input\":[\"${binaryFile1}\"]`));
    expect(lockResult.out).toEqual(expect.not.stringContaining(binaryFile2));
    expect(lockResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(lockResult.out).toEqual(expect.not.stringContaining(textFile2));
    /* eslint-enable no-useless-escape */

    const lockStatusResult = await myAnx.statusAnx();

    expect(lockStatusResult.exitCode).toBe(0);
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(binaryFile1));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${binaryFile2}`));
    expect(lockStatusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`? ./${textFile2}`));
  });

});
