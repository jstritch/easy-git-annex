import * as anx from '../../src/index.ts';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers.ts';

describe('sync', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;
  let remotePath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
    remotePath = await createRepository();
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
    await deleteDirectory(remotePath, true);
  });

  test('synchronizes a directory special remote', async () => {
    const remoteName = 'synchronized-directory';
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for lock');
    let rslt = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.sync(remoteName, { '--content': null });
    expect(rslt.exitCode).toBe(0);
  });

});
