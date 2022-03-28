import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('unused', () => {
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

  test('locates annexed files', async () => {
    const rslt = await myAnx.unused();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('(checking for unused data...)');
  });

});
