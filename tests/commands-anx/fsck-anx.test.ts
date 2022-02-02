import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { promises as fs } from 'fs';

const projectPath = process.cwd();
const binaryFile1 = 'file one.jpg';
const binaryFile1Path = path.join(projectPath, 'tests', 'data', binaryFile1);
const binaryFile2 = 'file two.jpg';
const binaryFile2Path = path.join(projectPath, 'tests', 'data', binaryFile2);
const textFile1 = 'file one.txt';
const textFile1Path = path.join(projectPath, 'tests', 'data', textFile1);
const textFile2 = 'file two.txt';
const textFile2Path = path.join(projectPath, 'tests', 'data', textFile2);

describe('fsckAnx', () => {
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

  test('checks the repository', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    await fs.copyFile(binaryFile2Path, path.join(repositoryPath, binaryFile2));
    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    await fs.copyFile(textFile2Path, path.join(repositoryPath, textFile2));
    const addResult = await myAnx.addAnx();

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(undefined, { '--message': 'add all four files' });

    expect(commitResult.exitCode).toBe(0);

    const fsckResult = await myAnx.fsckAnx();

    expect(fsckResult.exitCode).toBe(0);
  });

});
