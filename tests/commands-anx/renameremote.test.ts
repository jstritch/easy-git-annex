import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

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
    const initResult = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);

    expect(initResult.exitCode).toBe(0);

    const enableRemoteResult1 = await myAnx.enableremote();

    expect(enableRemoteResult1.err).toContain(remoteName);
    expect(enableRemoteResult1.err).not.toContain(newName);

    const renameRemoteResult = await myAnx.renameremote(remoteName, newName);

    expect(renameRemoteResult.exitCode).toBe(0);

    const enableRemoteResult2 = await myAnx.enableremote();

    expect(enableRemoteResult2.err).toContain(newName);
  });

});
