import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

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
    const rslt = await myAnx.get('file0.jpg');
    expect(rslt.exitCode).not.toBe(0);
    expect(rslt.err).toContain('error: pathspec \'file0.jpg\' did not match any file(s) known to git\nDid you forget to \'git add\'?\nget: 1 failed');
  });

});
