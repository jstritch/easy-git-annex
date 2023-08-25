import * as anx from '../src/index.ts';
import { createDirectory, deleteDirectory } from './helpers.ts';

describe('repositoryPath', () => {

  let repositoryPath: string;

  beforeEach(async () => {
    repositoryPath = await createDirectory();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('returns the path passed to the createAccessor', () => {
    const myAnx = anx.createAccessor(repositoryPath);
    expect(myAnx.repositoryPath).toBe(repositoryPath);
  });

});
