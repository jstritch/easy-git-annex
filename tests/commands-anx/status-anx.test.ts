import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { promises as fs } from 'fs';
import { isStatusAnx } from '../../src/helpers/type-predicates';
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

describe('statusAnx', () => {
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

  test('identifies one file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const statusResult = await myAnx.statusAnx(binaryFile1);

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toContain(binaryFile1);
    expect(statusResult.out).not.toContain(binaryFile2);
    expect(statusResult.out).not.toContain(textFile1);
    expect(statusResult.out).not.toContain(textFile2);
    expect(statusResult.err).toBe('');
  });

  test('identifies an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const statusResult = await myAnx.statusAnx([binaryFile1, textFile1]);

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toContain(binaryFile1);
    expect(statusResult.out).not.toContain(binaryFile2);
    expect(statusResult.out).toContain(textFile1);
    expect(statusResult.out).not.toContain(textFile2);
    expect(statusResult.err).toBe('');
  });

  test('identifies all files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const statusResult = await myAnx.statusAnx();

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toContain(binaryFile1);
    expect(statusResult.out).toContain(binaryFile2);
    expect(statusResult.out).toContain(textFile1);
    expect(statusResult.out).toContain(textFile2);
    expect(statusResult.err).toBe('');
  });

  test('ignores a nonexistent file', async () => {

    const statusResult = await myAnx.statusAnx(nonexistentFile);

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).not.toContain(nonexistentFile);
    expect(statusResult.err).toBe('');
  });

  test('ignores a nonexistent file in an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const statusResult = await myAnx.statusAnx([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toContain(binaryFile1);
    expect(statusResult.out).toContain(binaryFile2);
    expect(statusResult.out).toContain(textFile1);
    expect(statusResult.out).toContain(textFile2);
    expect(statusResult.out).not.toContain(nonexistentFile);
    expect(statusResult.err).toBe('');
  });

  test('produces --json output', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const statusResult = await myAnx.statusAnx(undefined, { '--json': null });
    const statusAnx = safeParseToArray(isStatusAnx, statusResult.out);

    expect(statusResult.exitCode).toBe(0);
    expect(statusAnx).toHaveLength(4);
  });

});
