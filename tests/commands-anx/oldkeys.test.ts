import * as anx from '../../src/index.ts';
import { commitFile, copyAddAnxCommit, createRepository, deleteDirectory, TestFile } from '../helpers.ts';

describe('oldkeys', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
    await copyAddAnxCommit(TestFile.JPG1, repositoryPath, 'add test file for oldkeys');
    await myAnx.rm(TestFile.JPG1);
    await commitFile(TestFile.JPG1, repositoryPath, 'remove first file for oldkeys');
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
  });

  test('identifies a removed file', async () => {
    const rslt = await myAnx.oldkeys();
    expect(rslt.exitCode).toBe(0);
  });

});
