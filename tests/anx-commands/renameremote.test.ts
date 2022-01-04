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

  test('correctly lists remotes', async () => {
    const remoteName = 'annex-remote';
    const newName = 'annex-renamed';
    const initResult = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);

    expect(initResult.exitCode).toBe(0);

    const showRemoteResult = await myAnx.remote();

    expect(showRemoteResult.exitCode).toBe(0);
    expect(showRemoteResult.out).toEqual(expect.stringContaining(remoteName));

    const renameRemoteResult = await myAnx.renameremote(remoteName, newName);

    expect(renameRemoteResult.exitCode).toBe(0);

    const enableRemoteResult = await myAnx.enableremote();

    expect(enableRemoteResult.err).toEqual(expect.stringContaining(newName));
  });

});
