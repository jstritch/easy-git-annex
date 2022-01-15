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

  test('correctly identifies one file', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx(binaryFile1);

    expect(addResult.exitCode).toBe(0);

    const statusResult = await myAnx.statusAnx(binaryFile1);

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.not.stringContaining(binaryFile2));
    expect(statusResult.out).toEqual(expect.not.stringContaining(textFile1));
    expect(statusResult.out).toEqual(expect.not.stringContaining(textFile1));
  });

  test('correctly identifies an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1]);

    expect(addResult.exitCode).toBe(0);

    const statusResult = await myAnx.statusAnx([binaryFile1, textFile1]);

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.not.stringContaining(binaryFile2));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.not.stringContaining(textFile2));
  });

  test('correctly identifies all files', async () => {

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

  test('correctly ignores a nonexistent file', async () => {

    const statusResult = await myAnx.statusAnx(nonexistentFile);

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.not.stringContaining(nonexistentFile));
    expect(statusResult.out).toEqual(expect.not.stringContaining(nonexistentFile));
  });

  test('correctly ignores a nonexistent file in an array of files', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(addResult.exitCode).not.toBe(0);
    expect(addResult.err).toEqual(expect.stringContaining(`git-annex: ${gitPath(nonexistentFile)} not found`));

    const statusResult = await myAnx.statusAnx([binaryFile1, textFile1, nonexistentFile, binaryFile2, textFile2]);

    expect(statusResult.exitCode).toBe(0);
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${binaryFile2}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile1}`));
    expect(statusResult.out).toEqual(expect.stringContaining(`A ./${textFile2}`));
    expect(statusResult.out).toEqual(expect.not.stringContaining(nonexistentFile));
  });

  test('correctly produces --json output', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const statusResult = await myAnx.statusAnx(undefined, { '--json': null });

    expect(statusResult.exitCode).toBe(0);
    /* eslint-disable no-useless-escape */
    expect(statusResult.out).toEqual(expect.stringContaining(`\"status\":\"A\",\"error-messages\":[],\"file\":\"./${binaryFile1}\"`));
    expect(statusResult.out).toEqual(expect.stringContaining(`\"status\":\"A\",\"error-messages\":[],\"file\":\"./${binaryFile2}\"`));
    expect(statusResult.out).toEqual(expect.stringContaining(`\"status\":\"A\",\"error-messages\":[],\"file\":\"./${textFile1}\"`));
    expect(statusResult.out).toEqual(expect.stringContaining(`\"status\":\"A\",\"error-messages\":[],\"file\":\"./${textFile2}\"`));
    /* eslint-enable no-useless-escape */
  });

});
