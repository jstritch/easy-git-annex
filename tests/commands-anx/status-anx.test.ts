import * as anx from '../../src/index.ts';
import { allTestFiles, copyFile, createRepository, deleteDirectory } from '../helpers.ts';

describe('statusAnx', () => {
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

  test('produces --json output', async () => {
    await copyFile(allTestFiles, repositoryPath);
    const rslt = await myAnx.statusAnx(undefined, { '--json': null });
    expect(rslt.exitCode).toBe(0);
    const statusAnx = anx.safeParseToArray(anx.isStatusAnx, rslt.out);
    expect(statusAnx).toHaveLength(allTestFiles.length);
  });

});
