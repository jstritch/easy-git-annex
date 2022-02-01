import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { isActionProgress, isActionResult } from '../../src/helpers/type-predicates';
import { promises as fs } from 'fs';
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

  test('adds one binary file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    const addResult = await myAnx.addAnx(binaryFile1);

    expect(addResult.exitCode).toBe(0);
  });

  test('adds one text file', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const addResult = await myAnx.addAnx(textFile1);

    expect(addResult.exitCode).toBe(0);
  });

  test('adds an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1]);

    expect(addResult.exitCode).toBe(0);
  });

  test('reports a nonexistent file', async () => {

    const addResult = await myAnx.addAnx(nonexistentFile);

    expect(addResult.exitCode).not.toBe(0);
    expect(addResult.err).toContain(nonexistentFile);
  });

  test('reports a nonexistent file in an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(addResult.exitCode).not.toBe(0);
    expect(addResult.err).toContain(nonexistentFile);
  });

  test('produces --json output', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--json': null });
    const actionResults = safeParseToArray(isActionResult, addResult.out);

    expect(addResult.exitCode).toBe(0);
    expect(actionResults).toHaveLength(4);
  });

  test('produces --json output when only --json-progress specified', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--json-progress': null });
    const actionProgress = safeParseToArray(isActionProgress, addResult.out);
    const actionResults = safeParseToArray(isActionResult, addResult.out);

    expect(addResult.exitCode).toBe(0);
    expect(actionProgress.length).toBeGreaterThanOrEqual(2);
    expect(actionResults).toHaveLength(4);
  });

  test('accepts the --jobs option', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--jobs': 2 });

    expect(addResult.exitCode).toBe(0);
    expect(addResult.args).toContain('--jobs=2');
  });

  test('accepts the --force-large option', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--force-large': null, '--json': null });
    const actionResults = safeParseToArray(isActionResult, addResult.out);

    expect(addResult.exitCode).toBe(0);
    expect(actionResults).toHaveLength(4);
    expect(actionResults[0]?.key).toBeDefined();
    expect(actionResults[1]?.key).toBeDefined();
    expect(actionResults[2]?.key).toBeDefined();
    expect(actionResults[3]?.key).toBeDefined();
  });

  test('accepts the --force-small option', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { '--force-small': null, '--json': null });
    const actionResults = safeParseToArray(isActionResult, addResult.out);

    expect(addResult.exitCode).toBe(0);
    expect(actionResults).toHaveLength(4);
    expect(actionResults[0]?.note).toBeDefined();
    expect(actionResults[1]?.note).toBeDefined();
    expect(actionResults[2]?.note).toBeDefined();
    expect(actionResults[3]?.note).toBeDefined();
  });

  test('accepts the matching option', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(undefined, { matching: '--include=*.jpg', '--json': null });
    const actionResults = safeParseToArray(isActionResult, addResult.out);

    expect(addResult.exitCode).toBe(0);
    expect(actionResults).toHaveLength(2);
    expect(actionResults[0]?.key).toBeDefined();
    expect(actionResults[1]?.key).toBeDefined();
  });

});
