import * as anx from '../../src/index.ts';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers.ts';

describe('list', () => {
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

  test('lists the repository', async () => {
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for list');
    const rslt = await myAnx.list();
    expect(rslt.exitCode).toBe(0);
  });

});
