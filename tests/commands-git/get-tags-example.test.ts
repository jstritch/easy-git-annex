import { createRepository, deleteDirectory } from '../helpers';
import { getFooTags } from './get-tags-example';

describe('getFooTags', () => {
  let repositoryPath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('returns the git version', async () => {
    const fooTags = await getFooTags(repositoryPath);
    expect(fooTags).toHaveLength(0);
  });

});
