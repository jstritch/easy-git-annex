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
    const result = await myAnx.initAnx(description);

    expect(result.exitCode).toBe(0);

    const newDescription = 'anx repository test new description';
    const describeResult = await myAnx.describe('here', newDescription);

    expect(describeResult.exitCode).toBe(0);

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });

    expect(repositoryInfos).toHaveLength(3);
    expect(here).toHaveProperty('description', newDescription);
  });

  test('correctly reports a directory is not a repository', async () => {
    const directory = await createDirectory();
    const myAnx = anx.createAccessor(directory);
    const newDescription = 'anx repository test new description';
    const result = await myAnx.describe('here', newDescription);

    expect(result.exitCode).not.toBe(0);
    expect(result.err).toBe('git-annex: Not in a git repository.\n');

    await deleteDirectory(directory);
  });

});
