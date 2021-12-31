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

    expect(result.exitCode).toBe(0);

    const getResult = await myAnx.group('here');

    expect(getResult.exitCode).toBe(0);
    expect(getResult.out).toEqual(expect.stringContaining(groupname));

    const ungroupResult = await myAnx.ungroup('here', groupname);

    expect(ungroupResult.exitCode).toBe(0);

    const getAgainResult = await myAnx.group('here');

    expect(getAgainResult.exitCode).toBe(0);
    expect(getAgainResult.out).toEqual(expect.not.stringContaining(groupname));
  });

});
