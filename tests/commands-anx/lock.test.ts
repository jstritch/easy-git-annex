import * as anx from '../../src/index.ts';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers.ts';

describe('lock', () => {
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

  test('locks files', async () => {
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for lock');
    let rslt = await myAnx.unlock();
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.lock(allTestFiles);
    expect(rslt.exitCode).toBe(0);
  });

});
