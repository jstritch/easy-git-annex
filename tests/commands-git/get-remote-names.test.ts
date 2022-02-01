import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

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

  test('shows no remotes', async () => {

    const remoteNames = await myAnx.getRemoteNames();

    expect(remoteNames).toHaveLength(0);
  });

  test('shows one remote', async () => {
    const remoteName = 'fountainhead';
    const addResult = await myAnx.remote(anx.RemoteCommand.Add, [remoteName, remotePath]);

    expect(addResult.exitCode).toBe(0);

    const remoteNames = await myAnx.getRemoteNames();

    expect(remoteNames).toHaveLength(1);
    expect(remoteNames).toContain(remoteName);
  });

});
