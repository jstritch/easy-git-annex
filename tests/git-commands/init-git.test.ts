import * as anx from '../../src/index';
import { createDirectory, deleteDirectory } from '../helpers';

describe('initGit', () => {
  let repositoryPath: string;

  beforeEach(async () => {
    repositoryPath = await createDirectory();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('initializes a git repository', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.initGit();

    expect(result.exitCode).toBe(0);
  });

  test('initializes a bare git repository', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.initGit({ '--bare': null });

    expect(result.exitCode).toBe(0);
  });

});
