import * as anx from '../../src/index';
import { commitFile, copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('rebase', () => {
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

  test('rebases a branch', async () => {
    await copyAddGitCommit(TestFile.TXT1, repositoryPath, 'add one text file for rebase');
    const branchName = 'new-branch-name';
    let rslt = await myAnx.switch(undefined, { '--create': branchName });
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.switch('-');
    await copyFile(TestFile.TXT2, repositoryPath, TestFile.TXT1);
    await commitFile(TestFile.TXT1, repositoryPath, 'modify file on the branch');
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.switch(branchName);
    rslt = await myAnx.rebase('master', { '--root': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.err).toContain('Successfully rebased and updated refs/heads/master');
  });

});

describe('RebaseOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.RebaseOptions, string[]][] = [
    [{ '--abort': null }, ['--abort']],
    [{ '--apply': null }, ['--apply']],
    [{ '--autosquash': null }, ['--autosquash']],
    [{ '--committer-date-is-author-date': null }, ['--committer-date-is-author-date']],
    [{ '--continue': null }, ['--continue']],
    [{ '--empty': 'A' }, ['--empty=A']],
    [{ '--fork-point': null }, ['--fork-point']],
    [{ '--gpg-sign': null }, ['--gpg-sign']],
    [{ '--gpg-sign': 'A' }, ['--gpg-sign=A']],
    [{ '--ignore-date': null }, ['--ignore-date']],
    [{ '--ignore-whitespace': null }, ['--ignore-whitespace']],
    [{ '--keep-base': null }, ['--keep-base']],
    [{ '--keep-empty': null }, ['--keep-empty']],
    [{ '--merge': null }, ['--merge']],
    [{ '--no-autosquash': null }, ['--no-autosquash']],
    [{ '--no-ff': null }, ['--no-ff']],
    [{ '--no-fork-point': null }, ['--no-fork-point']],
    [{ '--no-gpg-sign': null }, ['--no-gpg-sign']],
    [{ '--no-keep-empty': null }, ['--no-keep-empty']],
    [{ '--no-reapply-cherry-picks': null }, ['--no-reapply-cherry-picks']],
    [{ '--no-rerere-autoupdate': null }, ['--no-rerere-autoupdate']],
    [{ '--no-stat': null }, ['--no-stat']],
    [{ '--no-verify': null }, ['--no-verify']],
    [{ '--onto': 'A' }, ['--onto', 'A']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--quit': null }, ['--quit']],
    [{ '--reapply-cherry-picks': null }, ['--reapply-cherry-picks']],
    [{ '--rebase-merges': null }, ['--rebase-merges']],
    [{ '--rebase-merges': 'rebase-cousins' }, ['--rebase-merges=rebase-cousins']],
    [{ '--rerere-autoupdate': null }, ['--rerere-autoupdate']],
    [{ '--root': null }, ['--root']],
    [{ '--signoff': null }, ['--signoff']],
    [{ '--skip': null }, ['--skip']],
    [{ '--stat': null }, ['--stat']],
    [{ '--strategy': 'A' }, ['--strategy=A']],
    [{ '--strategy-option': 'A' }, ['--strategy-option=A']],
    [{ '--verbose': null }, ['--verbose']],
    [{ '--verify': null }, ['--verify']],
    [{ '--whitespace': 'fix' }, ['--whitespace=fix']],
    [{ '-C': 3 }, ['-C3']],
    [{ '-C': '2' }, ['-C2']],
  ];

  test.each(tests)('RebaseOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.rebase(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
