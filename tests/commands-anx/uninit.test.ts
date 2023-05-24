import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

describe('uninit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('uninitializes a git repository', async () => {
    const rslt = await myAnx.uninit();
    expect(rslt.exitCode).toBe(0);
    const repositoryInfos = await myAnx.getRepositories();
    expect(repositoryInfos).toHaveLength(0);
  });

});
