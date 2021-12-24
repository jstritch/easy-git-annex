import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('ungroup', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('correctly removes the repository from a group', async () => {
    const groupname = 'client';
    const result = await myAnx.group('here', groupname);

    expect(result).toHaveProperty('exitCode', 0);

    const getResult = await myAnx.group('here');

    expect(getResult).toMatchObject({ out: expect.stringContaining(groupname) as unknown });

    const ungroupResult = await myAnx.ungroup('here', groupname);

    expect(ungroupResult).toHaveProperty('exitCode', 0);

    const getAgainResult = await myAnx.group('here');

    expect(getAgainResult).not.toMatchObject({ out: expect.stringContaining(groupname) as unknown });
  });

});
