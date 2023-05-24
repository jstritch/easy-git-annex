import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

describe('renameremote', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;
  let remotePath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    remotePath = await createRepository();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
    await deleteDirectory(remotePath);
  });

  test('renames a remote', async () => {
    const remoteName = 'annex-remote';
    const newName = 'annex-renamed';
    let rslt = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.renameremote(remoteName, newName);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.enableremote(newName, ['directory', remotePath]);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(`enableremote ${newName} ok`);
  });

});
