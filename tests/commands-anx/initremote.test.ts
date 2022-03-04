import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('initremote', () => {
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

  test('adds a remote', async () => {
    const remoteName = 'annex-remote';
    const rslt = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);
    expect(rslt.exitCode).toBe(0);

    const remoteNames = await myAnx.getRemoteNames();
    expect(remoteNames).toHaveLength(1);
    expect(remoteNames).toContain(remoteName);
  });

});
