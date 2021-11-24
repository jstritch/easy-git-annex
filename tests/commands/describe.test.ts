import * as anx from '../../src/index';
import { createDirectory, createRepository, deleteDirectory } from '../helpers';

describe('describe()', () => {
  let repositoryPath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('correctly changes the description of a git repository', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const description = 'anx repository test description';
    const result = await myAnx.init(description);

    expect(result).toHaveProperty('exitCode', 0);

    const newDescription = 'anx repository test new description';
    const describeResult = await myAnx.describe(newDescription);

    expect(describeResult).toHaveProperty('exitCode', 0);

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });

    expect(repositoryInfos).toHaveLength(3);
    expect(here).toHaveProperty('description', newDescription);
  });

  test('correctly reports a directory is not a repository', async () => {
    const directory = await createDirectory();
    const myAnx = anx.createAccessor(directory);
    const newDescription = 'anx repository test new description';
    const result = await myAnx.describe(newDescription);

    expect(result).toHaveProperty('exitCode', 1);
    expect(result).toHaveProperty('err', 'git-annex: Not in a git repository.\n');
  });

});
