import * as anx from '../../src/index.ts';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers.ts';

describe('fsckAnx', () => {
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

  test('checks the repository', async () => {
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for fsckAnx');
    const rslt = await myAnx.fsckAnx();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('(recording state in git...)');
  });

});
