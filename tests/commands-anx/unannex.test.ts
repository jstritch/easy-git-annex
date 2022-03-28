import * as anx from '../../src/index';
import { allTestFiles, copyFile, createRepository, deleteDirectory, TestFile } from '../helpers';

describe('unannex', () => {
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

  test('undoes an addAnx', async () => {
    await copyFile(allTestFiles, repositoryPath);
    let rslt = await myAnx.addAnx(allTestFiles);
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.unannex(allTestFiles);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.JPG1);
    expect(rslt.out).toContain(TestFile.JPG2);
    expect(rslt.out).toContain(TestFile.JPG3);
  });

});
