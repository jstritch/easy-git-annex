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
  });

  test('correctly adds a remote', async () => {
    const remoteName = 'fountainhead';
    const addResult = await myAnx.remote(anx.RemoteCommand.Add, [remoteName, remotePath]);

    expect(addResult.exitCode).toBe(0);

    const showRemoteResult = await myAnx.remote(anx.RemoteCommand.Show, undefined, { '--verbose': null });

    expect(showRemoteResult.exitCode).toBe(0);
    expect(showRemoteResult.out).toEqual(expect.stringContaining(remoteName));
    expect(showRemoteResult.out).toEqual(expect.stringContaining(remotePath));
  });

});
