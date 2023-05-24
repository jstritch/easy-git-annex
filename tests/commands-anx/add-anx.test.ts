import * as anx from '../../src/index.ts';
import { allTestFiles, copyFile, createRepository, deleteDirectory } from '../helpers.ts';

describe('addAnx', () => {
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

  test('produces --json-progress output', async () => {
    await copyFile(allTestFiles, repositoryPath);
    const rslt = await myAnx.addAnx(allTestFiles, { '--json-progress': null });
    expect(rslt.exitCode).toBe(0);

    const actionProgress = anx.safeParseToArray(anx.isActionProgress, rslt.out);
    expect(actionProgress.length).toBeGreaterThan(0);
  });

});
