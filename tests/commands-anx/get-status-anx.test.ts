import * as anx from '../../src/index';
import { copyFile, createRepository, deleteDirectory, TestFile } from '../helpers';

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
    await copyFile(TestFile.JPG1, repositoryPath);
    const statusAnx = await myAnx.getStatusAnx();
    expect(statusAnx).toHaveLength(1);
    expect(statusAnx[0].file).toContain(TestFile.JPG1);
  });

});
