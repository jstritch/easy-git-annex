import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('initAnx', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('initializes a git repository', async () => {
    const description = 'anx repository test description';
    const rslt = await myAnx.initAnx(description);
    expect(rslt.exitCode).toBe(0);

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });
    expect(repositoryInfos).toHaveLength(3);
    expect(here?.description).toBe(description);
  });

});
