import * as anx from '../../src/index';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory, TestFile } from '../helpers';

describe('move', () => {
  const remoteName = 'annex-remote';
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;
  let remotePath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for find');
    remotePath = await createRepository();
    await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
    await deleteDirectory(remotePath, true);
  });

  test('moves one file', async () => {
    const rslt = await myAnx.move(TestFile.JPG1, { '--to': remoteName });
    expect(rslt.exitCode).toBe(0);
  });

});
