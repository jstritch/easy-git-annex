import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('dead', () => {
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

  test('marks a repository dead', async () => {
    const rslt = await myAnx.dead('here');
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('dead here (recording state in git...)');

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });
    expect(here).toBeUndefined();
  });

});
