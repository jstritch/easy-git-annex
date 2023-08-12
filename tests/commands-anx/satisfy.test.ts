import * as anx from '../../src/index.ts';
import { copyAddAnxCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';

describe('satisfy', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;
  let remotePath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
    remotePath = await createRepository();
    await setRepositoryAuthor(remotePath);
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
    await deleteDirectory(remotePath, true);
  });

  test('pulls files from a directory special remote', async () => {
    const branchName = await myAnx.getBranchName();
    const remoteName = 'satisfy-test';
    await copyAddAnxCommit([TestFile.TXT1, TestFile.JPG1], repositoryPath, 'add two files for satisfy');

    let rslt = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['encryption', 'none']]);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.configGit({ set: [`remote.${remoteName}.annex-tracking-branch`, branchName], '--local': null });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.satisfy(remoteName);
    expect(rslt.exitCode).toBe(0);
  });

});
