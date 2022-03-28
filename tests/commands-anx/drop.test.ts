import * as anx from '../../src/index';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory, TestFile } from '../helpers';

describe('drop', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for find');
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
  });

  test('drops a file', async () => {
    const rslt = await myAnx.drop(TestFile.JPG1, { '--force': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(`drop ${TestFile.JPG1} ok`);
  });

});
