import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('configGit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('correctly sets, gets, and unsets a value', async () => {
    const key = 'git-annex-js.test';
    const value = 'some/setting';

    const result = await myAnx.configGit({ '--set': [key, value], '--local': null });

    expect(result.exitCode).toBe(0);

    const getResult = await myAnx.configGit({ '--get': key, '--local': null });

    expect(getResult.exitCode).toBe(0);
    expect(getResult.out).toEqual(expect.stringContaining(value));

    const unsetResult = await myAnx.configGit({ '--unset': key, '--local': null });

    expect(unsetResult.exitCode).toBe(0);

    const getResult2 = await myAnx.configGit({ '--get': key, '--local': null });

    expect(getResult2.exitCode).not.toBe(0);
    expect(getResult2.out).toBe('');
  });

  test('correctly lists the configured values', async () => {

    const result = await myAnx.configGit({ '--list': null, '--show-scope': null });

    expect(result.exitCode).toBe(0);
    expect(result.out).toEqual(expect.stringContaining('local'));
  });

});
