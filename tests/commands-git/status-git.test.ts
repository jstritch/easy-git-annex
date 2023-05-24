import * as anx from '../../src/index.ts';
import { allTestFiles, copyFile, createRepository, deleteDirectory, TestFile } from '../helpers.ts';

describe('statusGit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('returns status with defaults', async () => {
    await copyFile(allTestFiles, repositoryPath);
    const rslt = await myAnx.statusGit();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.JPG1);
    expect(rslt.out).toContain(TestFile.JPG2);
    expect(rslt.out).toContain(TestFile.JPG3);
    expect(rslt.out).toContain(TestFile.TXT1);
    expect(rslt.out).toContain(TestFile.TXT2);
    expect(rslt.out).toContain(TestFile.TXT3);
    expect(rslt.out).not.toContain('\0');
  });

  test('returns --porcelain=v1 -z', async () => {
    await copyFile(allTestFiles, repositoryPath);
    const rslt = await myAnx.statusGit(undefined, { '--porcelain': 'v1', '-z': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.JPG1);
    expect(rslt.out).toContain(TestFile.JPG2);
    expect(rslt.out).toContain(TestFile.JPG3);
    expect(rslt.out).toContain(TestFile.TXT1);
    expect(rslt.out).toContain(TestFile.TXT2);
    expect(rslt.out).toContain(TestFile.TXT3);
    expect(rslt.out).toContain('\0');
  });

});

describe('StatusGitOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.StatusGitOptions, string[]][] = [
    [{ '--ahead-behind': null }, ['--ahead-behind']],
    [{ '--branch': null }, ['--branch']],
    [{ '--column': null }, ['--column']],
    [{ '--column': 'always' }, ['--column=always']],
    [{ '--find-renames': null }, ['--find-renames']],
    [{ '--find-renames': '70%' }, ['--find-renames=70%']],
    [{ '--ignore-submodules': null }, ['--ignore-submodules']],
    [{ '--ignore-submodules': 'none' }, ['--ignore-submodules=none']],
    [{ '--ignored': null }, ['--ignored']],
    [{ '--ignored': 'no' }, ['--ignored=no']],
    [{ '--long': null }, ['--long']],
    [{ '--no-ahead-behind': null }, ['--no-ahead-behind']],
    [{ '--no-column': null }, ['--no-column']],
    [{ '--no-renames': null }, ['--no-renames']],
    [{ '--porcelain': null }, ['--porcelain']],
    [{ '--porcelain': 'v1' }, ['--porcelain=v1']],
    [{ '--renames': null }, ['--renames']],
    [{ '--short': null }, ['--short']],
    [{ '--show-stash': null }, ['--show-stash']],
    [{ '--untracked-files': null }, ['--untracked-files']],
    [{ '--untracked-files': 'all' }, ['--untracked-files=all']],
    [{ '--verbose': null }, ['--verbose']],
    [{ '--verbose': [null] }, ['--verbose']],
    [{ '--verbose': [null, null] }, ['--verbose', '--verbose']],
    [{ '-z': null }, ['-z']],
  ];

  test.each(tests)('StatusGitOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.statusGit(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
