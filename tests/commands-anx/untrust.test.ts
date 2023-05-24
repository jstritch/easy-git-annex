import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

describe('untrust', () => {
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

  test('marks a repository untrusted', async () => {
    const rslt = await myAnx.untrust('here');
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('untrust here (recording state in git...)');

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });
    expect(here?.trustLevel).toBe('untrusted');
  });

});
