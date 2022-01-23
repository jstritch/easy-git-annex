import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('remote', () => {
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

  test('adds a remote', async () => {
    const remoteName = 'fountainhead';
    const addResult = await myAnx.remote(anx.RemoteCommand.Add, [remoteName, remotePath]);

    expect(addResult.exitCode).toBe(0);

    const remoteNames = await myAnx.getRemoteNames();

    expect(remoteNames).toHaveLength(1);
    expect(remoteNames).toContain(remoteName);
  });

  test('accepts only the --verbose option', async () => {
    const remoteName = 'fountainhead';
    const addResult = await myAnx.remote(anx.RemoteCommand.Add, [remoteName, remotePath]);

    expect(addResult.exitCode).toBe(0);

    const showResult = await myAnx.remote(undefined, undefined, { '--verbose': null });

    expect(showResult.exitCode).toBe(0);
    expect(showResult.out).toContain(remoteName);
    expect(showResult.out).toContain(remotePath);
  });

});
