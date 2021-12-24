import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('config', () => {
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

    expect(result).toHaveProperty('exitCode', 0);

    const getResult = await myAnx.configGit({ '--get': key, '--local': null });

    expect(getResult).toHaveProperty('exitCode', 0);
    expect(getResult).toMatchObject({ out: expect.stringContaining(value) as unknown });

    const unsetResult = await myAnx.configGit({ '--unset': key, '--local': null });

    expect(unsetResult).toHaveProperty('exitCode', 0);

    const getResult2 = await myAnx.configGit({ '--get': key, '--local': null });

    expect(getResult2).toHaveProperty('exitCode', 1);
    expect(getResult2).toHaveProperty('out', '');
  });

  test('correctly lists the configured values', async () => {

    const result = await myAnx.configGit({ '--list': null, '--show-scope': null });

    expect(result).toHaveProperty('exitCode', 0);
    expect(result).toMatchObject({ out: expect.stringContaining('local') as unknown });
  });

});
