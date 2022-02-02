import * as anx from '../../src/index';
import * as path from 'path';
import { createDirectory, createRepository, deleteDirectory } from '../helpers';

describe('initAnx', () => {
  let repositoryPath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('initializes a git repository', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const description = 'anx repository test description';
    const result = await myAnx.initAnx(description);

    expect(result.exitCode).toBe(0);

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });

    expect(repositoryInfos).toHaveLength(3);
    expect(here?.description).toBe(description);
  });

  test('initializes a git repository with a generated desciption', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.initAnx();

    expect(result.exitCode).toBe(0);

    const repositoryInfos = await myAnx.getRepositories();
    const here = repositoryInfos.find((repository) => { return repository.here; });

    expect(repositoryInfos).toHaveLength(3);
    expect(here?.description).toContain(path.basename(repositoryPath));
  });

  test('reports a directory is not a git repository', async () => {
    const directory = await createDirectory();
    const myAnx = anx.createAccessor(directory);
    const description = 'anx repository test description';
    const result = await myAnx.initAnx(description);

    expect(result.exitCode).not.toBe(0);
    expect(result.err).toBe('git-annex: Not in a git repository.\n');

    await deleteDirectory(directory);
  });

});