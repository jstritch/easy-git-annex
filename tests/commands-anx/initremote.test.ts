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
    const initResult = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);

    expect(initResult.exitCode).toBe(0);

    const enableRemoteResult = await myAnx.enableremote();

    expect(enableRemoteResult.err).toContain(remoteName);

    const remoteNames = await myAnx.getRemoteNames();

    expect(remoteNames).toHaveLength(1);
    expect(remoteNames).toContain(remoteName);
  });

  test('reports missing remote configuration', async () => {
    const remoteName = 'annex-remote';
    const initResult = await myAnx.initremote(remoteName, 'directory', ['directory', remotePath]);

    expect(initResult.exitCode).not.toBe(0);
  });

});
