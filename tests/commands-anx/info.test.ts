import * as anx from '../../src/index.ts';
import * as path from 'node:path';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory } from '../helpers.ts';

describe('info', () => {
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

  test('obtains the repository information', async () => {
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for info');
    const rslt = await myAnx.info();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(`${path.basename(repositoryPath)} [here]`);
  });

});

describe('getRepositories', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('returns undefined for a directory that is not a git annex', async () => {
    const info = await myAnx.getRepositoryInfo();
    expect(info).toBeUndefined();
  });

  test('returns information about the git annex', async () => {
    await myAnx.initAnx();
    const info = await myAnx.getRepositoryInfo();
    expect(info?.trustLevel).toBe('semitrusted');
    await myAnx.uninit();
  });

});
