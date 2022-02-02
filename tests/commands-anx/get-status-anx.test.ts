import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { promises as fs } from 'fs';

const projectPath = process.cwd();
const binaryFile1 = 'file one.jpg';
const binaryFile1Path = path.join(projectPath, 'tests', 'data', binaryFile1);

describe('getStatusAnx', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
  });

  test('returns the array', async () => {

    await fs.copyFile(binaryFile1Path, path.join(repositoryPath, binaryFile1));
    const statusAnx = await myAnx.getStatusAnx();

    expect(statusAnx).toHaveLength(1);
    expect(statusAnx[0].file).toContain(binaryFile1);
  });

});
