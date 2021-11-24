import * as anx from '../../src/index';
import { createDirectory, createRepository, deleteDirectory } from '../helpers';

describe('init', () => {
  let repositoryPath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('correctly initializes a git repository', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const description = 'anx repository test description';
    const result = await myAnx.init(description);

    expect(result).toHaveProperty('exitCode', 0);

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });

    expect(repositoryInfos).toHaveLength(3);
    expect(here).toHaveProperty('description', description);
  });

  test('correctly initializes a git repository with a generated desciption', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.init();

    expect(result).toHaveProperty('exitCode', 0);

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });

    expect(repositoryInfos).toHaveLength(3);
    expect(here).toMatchObject({ description: expect.stringContaining(repositoryPath) as unknown });
  });

  test('correctly reports a directory is not a git repository', async () => {
    const directory = await createDirectory();
    const myAnx = anx.createAccessor(directory);
    const description = 'anx repository test description';
    const result = await myAnx.init(description);

    expect(result).toHaveProperty('exitCode', 1);
    expect(result).toHaveProperty('err', 'git-annex: Not in a git repository.\n');
  });

});
