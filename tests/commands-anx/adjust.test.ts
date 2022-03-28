import * as anx from '../../src/index';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers';

describe('adjust', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for adjust');
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
  });

  test('unlocks an adjusted branch', async () => {
    const rslt = await myAnx.adjust({ '--unlock': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('adjust');

    const branchNames = await myAnx.getBranchNames();
    expect(branchNames).toContain('adjusted/master(unlocked)');
  });

});
