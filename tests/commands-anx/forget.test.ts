import * as anx from '../../src/index.ts';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers.ts';

describe('forget', () => {
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

  test('prunes git-annex branch history', async () => {
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for forget');
    const rslt = await myAnx.forget({ '--force': null });
    expect(rslt.exitCode).toBe(0);
  });

});
