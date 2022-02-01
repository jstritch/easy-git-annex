import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('group', () => {
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

  test('places the repository in a group', async () => {
    const groupname = 'client';
    const result = await myAnx.group('here', groupname);

    expect(result.exitCode).toBe(0);

    const getResult = await myAnx.group('here');

    expect(getResult.exitCode).toBe(0);
    expect(getResult.out).toContain(groupname);
  });

});
