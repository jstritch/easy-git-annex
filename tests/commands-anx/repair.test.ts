import * as anx from '../../src/index.ts';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers.ts';

describe('repair', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
  });

  // git-annex repair is inoperative in Windows, run test on other platforms
  /* eslint-disable jest/require-hook, jest/no-standalone-expect */
  const testFunc = process.platform === 'win32' ? xtest : test;
  testFunc('repairs the repository', async () => {
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for repair');
    const rslt = await myAnx.repair();
    expect(rslt.exitCode).toBe(0);
  });

});
