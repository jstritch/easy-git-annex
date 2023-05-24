import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

describe('get', () => {
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

  test('reports unknown file', async () => {
    const nonexistentFile = 'file0.jpg';
    const rslt = await myAnx.get(nonexistentFile);
    expect(rslt.exitCode).not.toBe(0);
    expect(rslt.err).toContain(nonexistentFile);
  });

});
