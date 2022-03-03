import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('configGit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('sets, gets, and unsets a value', async () => {
    const key = 'easy-git-annex.test';
    const value = 'some/setting';
    let rslt = await myAnx.configGit({ set: [key, value], '--local': null });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.configGit({ '--get': key, '--local': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(value);

    rslt = await myAnx.configGit({ '--unset': key, '--local': null });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.configGit({ '--get': key, '--local': null });
    expect(rslt.exitCode).not.toBe(0);
    expect(rslt.out).toBe('');
  });

  test('lists the configured values', async () => {
    const rslt = await myAnx.configGit({ '--list': null, '--show-scope': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('local');
  });

});

describe('ConfigOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const key = 'easy-git-annex.test';
  const value = 'some/setting';

  const tests: [anx.ConfigGitOptions, string[]][] = [
    [{ '--local': null }, ['--local']],
    [{ '--global': null }, ['--global']],
    [{ '--system': null }, ['--system']],
    [{ '--show-scope': null }, ['--show-scope']],
    [{ '--list': null }, ['--list']],
    [{ '--get': key }, ['--get', key]],
    [{ 'set': [key, value] }, ['config', key, value]],
    [{ '--unset': key }, ['--unset', key]],
    // option order
    [{ '--local': null, '--show-scope': null, '--list': null }, ['config', '--local', '--show-scope', '--list']],
    [{ '--local': null, '--show-scope': null, '--get': 'A' }, ['config', '--local', '--show-scope', '--get', 'A']],
    [{ '--local': null, 'set': [key, value] }, ['config', '--local', key, value]],
    [{ '--local': null, '--unset': 'A' }, ['config', '--local', '--unset', 'A']],
    [{ '--global': null, '--show-scope': null, '--list': null }, ['config', '--global', '--show-scope', '--list']],
    [{ '--global': null, '--show-scope': null, '--get': 'A' }, ['config', '--global', '--show-scope', '--get', 'A']],
    [{ '--global': null, 'set': [key, value] }, ['config', '--global', key, value]],
    [{ '--global': null, '--unset': 'A' }, ['config', '--global', '--unset', 'A']],
    [{ '--system': null, '--show-scope': null, '--list': null }, ['config', '--system', '--show-scope', '--list']],
    [{ '--system': null, '--show-scope': null, '--get': 'A' }, ['config', '--system', '--show-scope', '--get', 'A']],
    [{ '--system': null, 'set': [key, value] }, ['config', '--system', key, value]],
    [{ '--system': null, '--unset': 'A' }, ['config', '--system', '--unset', 'A']],
  ];

  test.each(tests)('ConfigGitOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.configGit(gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
