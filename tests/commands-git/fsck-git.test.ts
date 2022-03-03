import * as anx from '../../src/index';
import { allTestFiles, copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor } from '../helpers';

describe('fsckGit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
  });

  afterAll(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('checks the repository reporting progress', async () => {
    await copyAddGitCommit(allTestFiles, repositoryPath, 'add test files for fsckGit');
    const rslt = await myAnx.fsckGit(undefined, { '--progress': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.err).toContain('100%');
  });

});

describe('FsckGitOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.FsckGitOptions, string[]][] = [
    [{ '--cache': null }, ['--cache']],
    [{ '--connectivity-only': null }, ['--connectivity-only']],
    [{ '--dangling': null }, ['--dangling']],
    [{ '--full': null }, ['--full']],
    [{ '--lost-found': null }, ['--lost-found']],
    [{ '--name-objects': null }, ['--name-objects']],
    [{ '--no-dangling': null }, ['--no-dangling']],
    [{ '--no-full': null }, ['--no-full']],
    [{ '--no-progress': null }, ['--no-progress']],
    [{ '--no-reflogs': null }, ['--no-reflogs']],
    [{ '--progress': null }, ['--progress']],
    [{ '--root': null }, ['--root']],
    [{ '--strict': null }, ['--strict']],
    [{ '--tags': null }, ['--tags']],
    [{ '--unreachable': null }, ['--unreachable']],
    [{ '--verbose': null }, ['--verbose']],
  ];

  test.each(tests)('FsckGitOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.fsckGit(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
