import * as anx from '../../src/index.ts';
import { copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';

describe('stash', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('stashes an untracked file', async () => {
    const commitMessage = 'add one text file for stash';
    await copyAddGitCommit(TestFile.TXT1, repositoryPath, commitMessage);
    await copyFile(TestFile.TXT2, repositoryPath);
    let rslt = await myAnx.stash(anx.StashCommand.Push, undefined, undefined, { '--include-untracked': null });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.stash(anx.StashCommand.List);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(commitMessage);
  });

});

describe('StashOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.StashOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--include-untracked': null }, ['--include-untracked']],
    [{ '--index': null }, ['--index']],
    [{ '--keep-index': null }, ['--keep-index']],
    [{ '--no-include-untracked': null }, ['--no-include-untracked']],
    [{ '--no-keep-index': null }, ['--no-keep-index']],
    [{ '--only-untracked': null }, ['--only-untracked']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--staged': null }, ['--staged']],
  ];

  test.each(tests)('StashOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.stash(undefined, undefined, undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
