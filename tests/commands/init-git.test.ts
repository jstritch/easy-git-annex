import * as anx from '../../src/index';
import { createDirectory, deleteDirectory } from '../helpers';

describe('init', () => {
  let repositoryPath: string;

  beforeEach(async () => {
    repositoryPath = await createDirectory();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('correctly initializes a bare git repository', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.initGit({ '--bare': null });

    expect(result).toHaveProperty('exitCode', 0);
  });

});
