import * as anx from '../../src/index.ts';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory, setRepositoryAuthor } from '../helpers.ts';

describe('pushAnx', () => {
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

  // git-annex 10.20230626 is not yet available for macOS, run test on other platforms
  /* eslint-disable jest/require-hook, jest/no-standalone-expect */
  const testFunc = process.platform === 'darwin' ? xtest : test;
  testFunc('pushes files to a directory special remote', async () => {
    const branchName = await myAnx.getBranchName();
    const remoteName = 'push-anx-test';
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for pushAnx');

    let rslt = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['exporttree', 'yes'], ['encryption', 'none']]);
    expect(rslt.exitCode).toBe(0);

    const remoteAnx = anx.createAccessor(remotePath);
    rslt = await remoteAnx.configGit({ set: ['receive.denyCurrentBranch', 'updateInstead'], '--local': null });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.configGit({ set: [`remote.${remoteName}.annex-tracking-branch`, branchName], '--local': null });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.pushAnx(remoteName);
    expect(rslt.exitCode).toBe(0);
  });

});
