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

  test('correctly clones a git repository', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.clone('https://github.com/jstritch/git-annex-js.git', { '--progress': null });

    expect(result).toHaveProperty('exitCode', 0);
  });

});
