import * as anx from '../../src/index';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers';

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

  test('repairs the repository', async () => {
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for repair');
    const rslt = await myAnx.repair();
    expect(rslt.exitCode).toBe(0);
  });

});
