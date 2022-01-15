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

describe('addAnx', () => {
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

  test('correctly adds one binary file', async () => {

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
  });

  test('correctly adds one text file', async () => {

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
  });

  test('correctly adds an array of files', async () => {

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
  });

  test('correctly adds all binary and text files', async () => {

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
  });

  test('correctly reports a nonexistent file', async () => {

    const addResult = await myAnx.addAnx(nonexistentFile);

    expect(addResult.exitCode).not.toBe(0);
    expect(addResult.out).toBe('');
    expect(addResult.err).toEqual(expect.stringContaining(`git-annex: ${gitPath(nonexistentFile)} not found`));
  });

  test('correctly reports a nonexistent file in an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(addResult.exitCode).not.toBe(0);
    expect(addResult.err).toEqual(expect.stringContaining(`git-annex: ${gitPath(nonexistentFile)} not found`));

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));
  });

  test('correctly produces --json output', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--json': null });

    expect(addResult.exitCode).toBe(0);
    /* eslint-disable no-useless-escape */
    expect(addResult.out).toEqual(expect.stringContaining(`\"command\":\"add\",\"success\":true,\"input\":[\"${binaryFile1}\"]`));
    expect(addResult.out).toEqual(expect.stringContaining(`\"command\":\"add\",\"success\":true,\"input\":[\"${binaryFile2}\"]`));
    expect(addResult.out).toEqual(expect.stringContaining(`\"command\":\"add\",\"note\":\"non-large file; adding content to git repository\",\"success\":true,\"input\":[\"${textFile1}\"]`));
    expect(addResult.out).toEqual(expect.stringContaining(`\"command\":\"add\",\"note\":\"non-large file; adding content to git repository\",\"success\":true,\"input\":[\"${textFile2}\"]`));
    /* eslint-enable no-useless-escape */

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));
  });

  test('correctly produces --json output when only --json-progress specified', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--json-progress': null });

    expect(addResult.exitCode).toBe(0);
    expect(addResult.out).toEqual(expect.stringMatching(`.*byte-progress.*${binaryFile1}.*`));
    expect(addResult.out).toEqual(expect.stringMatching(`.*byte-progress.*${binaryFile2}.*`));
    /* eslint-disable no-useless-escape */
    expect(addResult.out).toEqual(expect.stringContaining(`\"command\":\"add\",\"success\":true,\"input\":[\"${binaryFile1}\"]`));
    expect(addResult.out).toEqual(expect.stringContaining(`\"command\":\"add\",\"success\":true,\"input\":[\"${binaryFile2}\"]`));
    expect(addResult.out).toEqual(expect.stringContaining(`\"command\":\"add\",\"note\":\"non-large file; adding content to git repository\",\"success\":true,\"input\":[\"${textFile1}\"]`));
    expect(addResult.out).toEqual(expect.stringContaining(`\"command\":\"add\",\"note\":\"non-large file; adding content to git repository\",\"success\":true,\"input\":[\"${textFile2}\"]`));
    /* eslint-enable no-useless-escape */

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));
  });

  test('correctly accepts the --jobs option', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--jobs': 2 });

    expect(addResult.exitCode).toBe(0);
    expect(addResult.args).toEqual(expect.arrayContaining(['--jobs=2']));

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));
  });

  test('correctly accepts the --force-large option', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--force-large': null });

    expect(addResult.exitCode).toBe(0);
    expect(addResult.args).toEqual(expect.arrayContaining(['--force-large']));

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));
  });

  test('correctly accepts the --force-small option', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--force-small': null });

    expect(addResult.exitCode).toBe(0);
    expect(addResult.args).toEqual(expect.arrayContaining(['--force-small']));

    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));
  });

  test('correctly adds modified binary and text files', async () => {

    const modifiedFiles = [binaryFile2, textFile2];

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

    const commitResult = await myAnx.commit(undefined, { '--message': 'add four files' });

    expect(commitResult.exitCode).toBe(0);

    const unlockResult = await myAnx.unlock(modifiedFiles);

    expect(unlockResult.exitCode).toBe(0);

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile2));
    const modifyStatusResult = await myAnx.statusAnx();

    expect(modifyStatusResult.exitCode).toBe(0);
    expect(modifyStatusResult.out).toEqual(expect.stringContaining(`M ./${binaryFile2}`));
    expect(modifyStatusResult.out).toEqual(expect.stringContaining(`M ./${textFile2}`));

    const addAfterModifyResult = await myAnx.addAnx(modifiedFiles);

    expect(addAfterModifyResult.exitCode).toBe(0);

    const lockResult = await myAnx.lock(modifiedFiles);

    expect(lockResult.exitCode).toBe(0);

    const lockStatusResult = await myAnx.statusAnx();

    expect(lockStatusResult.exitCode).toBe(0);
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`M ./${binaryFile2}`));
    expect(lockStatusResult.out).toEqual(expect.stringContaining(`M ./${textFile2}`));

    const modifyResult = await myAnx.commit(undefined, { '--message': 'modify two files' });

    expect(modifyResult.exitCode).toBe(0);

    const commitStatusResult = await myAnx.statusAnx();

    expect(commitStatusResult.exitCode).toBe(0);
    expect(commitStatusResult.out).toBe('');
  });

});
