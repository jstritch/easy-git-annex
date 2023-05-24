import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

describe('enableremote', () => {
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

  test('enables a remote with parameters', async () => {
    const remoteName = 'annex-remote';
    let rslt = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.enableremote(remoteName, ['directory', remotePath]);
    expect(rslt.exitCode).toBe(0);
  });
});
