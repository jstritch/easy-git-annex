import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

describe('getRemoteNames', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;
  let remotePath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    remotePath = await createRepository();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
    await deleteDirectory(remotePath);
  });

  test('shows one remote', async () => {
    const remoteName = 'fountainhead';
    const rslt = await myAnx.remote(anx.RemoteCommand.Add, [remoteName, remotePath]);
    expect(rslt.exitCode).toBe(0);

    const remoteNames = await myAnx.getRemoteNames();
    expect(remoteNames).toHaveLength(1);
    expect(remoteNames).toContain(remoteName);
  });

});
