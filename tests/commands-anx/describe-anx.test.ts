import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('describeAnx()', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('changes the description of a git repository', async () => {
    const description = 'anx repository test description';
    let rslt = await myAnx.initAnx(description);
    expect(rslt.exitCode).toBe(0);

    const newDescription = 'anx repository test new description';
    rslt = await myAnx.describeAnx('here', newDescription);
    expect(rslt.exitCode).toBe(0);

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });
    expect(here?.description).toBe(newDescription);
  });

});
