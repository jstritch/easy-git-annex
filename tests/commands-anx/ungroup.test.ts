import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

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

  test('removes the repository from a group', async () => {
    const groupname = 'client';
    let rslt = await myAnx.group('here', groupname);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.group('here');
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(groupname);

    rslt = await myAnx.ungroup('here', groupname);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.group('here');
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).not.toContain(groupname);
  });

});
