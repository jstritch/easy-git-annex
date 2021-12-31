import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('reinit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('correctly reinitializes a git repository', async () => {
    const uuid = '73c6cc5e-4d37-11ec-b03c-4728df437afb';
    const result = await myAnx.reinit(uuid);

    expect(result.exitCode).toBe(0);

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });

    expect(repositoryInfos).toHaveLength(3);
    expect(here).toHaveProperty('uuid', uuid);
  });

});
