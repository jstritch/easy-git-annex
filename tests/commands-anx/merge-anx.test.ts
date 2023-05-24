import * as anx from '../../src/index.ts';
import { copyAddAnxCommit, createRepository, deleteDirectory, TestFile } from '../helpers.ts';

describe('mergeAnx', () => {
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

  test('merges a branch', async () => {
    await copyAddAnxCommit(TestFile.JPG1, repositoryPath, 'add one binary file for mergeGit');
    let rslt = await myAnx.checkout(undefined, undefined, { '-b': 'new-file' });
    expect(rslt.exitCode).toBe(0);
    await copyAddAnxCommit(TestFile.JPG2, repositoryPath, 'add another binary file for mergeGit');

    rslt = await myAnx.checkout('master');
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.mergeAnx('new-file');
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('merge new-file');
  });

});
