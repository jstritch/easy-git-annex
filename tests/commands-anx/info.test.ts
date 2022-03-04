import * as anx from '../../src/index';
import * as path from 'path';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers';

describe('info', () => {
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

  test('obtains the repository information', async () => {
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for info');
    const rslt = await myAnx.info();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(`${path.basename(repositoryPath)} [here]`);
  });

});
