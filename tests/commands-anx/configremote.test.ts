import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

describe('configremote', () => {
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

  test('configures a remote with parameters', async () => {
    const remoteName = 'annex-configremote';
    let rslt = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.configremote(remoteName, ['autoenable', 'true']);
    expect(rslt.exitCode).toBe(0);
  });
});
