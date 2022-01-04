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

  test('correctly adds a remote', async () => {
    const remoteName = 'annex-remote';
    const initResult = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);

    expect(initResult.exitCode).toBe(0);

    const showRemoteResult = await myAnx.remote();

    expect(showRemoteResult.exitCode).toBe(0);
    expect(showRemoteResult.out).toEqual(expect.stringContaining(remoteName));
  });

  test('correctly reports missing configuration', async () => {
    const remoteName = 'annex-remote';
    const initResult = await myAnx.initremote(remoteName, 'directory', ['directory', remotePath]);

    expect(initResult.exitCode).not.toBe(0);
    expect(initResult.err).toEqual(expect.stringContaining('git-annex: Specify encryption=hybrid or encryption=none or encryption=pubkey or encryption=shared or encryption=sharedpubkey.'));
  });

});
