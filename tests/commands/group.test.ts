import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('group', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.init();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('correctly places the repository in a group', async () => {
    const groupname = 'client';
    const result = await myAnx.group('here', groupname);

    expect(result).toHaveProperty('exitCode', 0);

    const getResult = await myAnx.group('here');

    expect(getResult).toMatchObject({ out: expect.stringContaining(groupname) as unknown });
  });

});
