import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { promises as fs } from 'fs';
import { isActionResult } from '../../src/helpers/type-predicates';
import { safeParseToArray } from '../../src/helpers/safe-parse';

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

  test('locks one binary file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    const addResult = await myAnx.addAnx(binaryFile1);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add one binary file' });

    expect(commitResult.exitCode).toBe(0);

    const unlockResult = await myAnx.unlock(binaryFile1);

    expect(unlockResult.exitCode).toBe(0);

    const lockResult = await myAnx.lock(binaryFile1);

    expect(lockResult.exitCode).toBe(0);
  });

  test('locks one text file', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const addResult = await myAnx.addAnx(textFile1);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add one text file' });

    expect(commitResult.exitCode).toBe(0);

    const unlockResult = await myAnx.unlock(textFile1);

    expect(unlockResult.exitCode).toBe(0);

    const lockResult = await myAnx.lock(textFile1);

    expect(lockResult.exitCode).toBe(0);
  });

  test('locks an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit([binaryFile1, textFile1], { '--message': 'add two files' });

    expect(commitResult.exitCode).toBe(0);

    const unlockResult = await myAnx.unlock([binaryFile1, textFile1]);

    expect(unlockResult.exitCode).toBe(0);

    const lockResult = await myAnx.lock([binaryFile1, textFile1]);

    expect(lockResult.exitCode).toBe(0);

    const lockStatusResult = await myAnx.statusAnx();

    expect(lockStatusResult.exitCode).toBe(0);
  });

  test('reports a nonexistent file', async () => {

    const lockResult = await myAnx.lock(nonexistentFile);

    expect(lockResult.exitCode).not.toBe(0);
    expect(lockResult.err).toContain(nonexistentFile);
  });

  test('reports a nonexistent file in an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add four files' });

    expect(commitResult.exitCode).toBe(0);

    const unlockResult = await myAnx.unlock([binaryFile1, textFile1, binaryFile2, textFile2]);

    expect(unlockResult.exitCode).toBe(0);

    const lockResult = await myAnx.lock([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(lockResult.exitCode).not.toBe(0);
    expect(lockResult.err).toContain(nonexistentFile);
  });

  test('produces --json output', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add four files' });

    expect(commitResult.exitCode).toBe(0);

    const unlockResult = await myAnx.unlock();

    expect(unlockResult.exitCode).toBe(0);

    const lockResult = await myAnx.lock(undefined, { '--json': null });
    const actionResults = safeParseToArray(isActionResult, lockResult.out);

    expect(lockResult.exitCode).toBe(0);
    expect(actionResults).toHaveLength(2);
  });

  test('accepts the matching option', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add four files' });

    expect(commitResult.exitCode).toBe(0);

    const unlockResult = await myAnx.unlock([binaryFile1, textFile1, binaryFile2, textFile2]);

    expect(unlockResult.exitCode).toBe(0);

    const lockResult = await myAnx.lock(undefined, { matching: '--include=*.jpg', '--json': null });
    const actionResults = safeParseToArray(isActionResult, lockResult.out);

    expect(lockResult.exitCode).toBe(0);
    expect(actionResults).toHaveLength(2);
    expect(actionResults[0]?.key).toBeDefined();
    expect(actionResults[1]?.key).toBeDefined();
  });

});
