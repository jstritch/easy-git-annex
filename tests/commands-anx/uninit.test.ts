import * as anx from '../../src/index';
import { createDirectory, createRepository, deleteDirectory } from '../helpers';

describe('uninit', () => {
  let repositoryPath: string;

  beforeEach(async () => {
    repositoryPath = await createDirectory();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('uninitializes a git repository', async () => {
    await createRepository(repositoryPath);
    const myAnx = anx.createAccessor(repositoryPath);
    const description = 'anx repository test description';
    const result = await myAnx.initAnx(description);

    expect(result.exitCode).toBe(0);

    const uninitResult = await myAnx.uninit();

    expect(uninitResult.exitCode).toBe(0);

    const repositoryInfos = await myAnx.getRepositories();

    expect(repositoryInfos).toHaveLength(0);
  });

  test('reports a directory is not a git annex', async () => {
    await createRepository(repositoryPath);
    const myAnx = anx.createAccessor(repositoryPath);

    const result = await myAnx.uninit();

    expect(result.exitCode).not.toBe(0);
    expect(result.err).toBe('git-annex: First run: git-annex init\n');
  });

});
