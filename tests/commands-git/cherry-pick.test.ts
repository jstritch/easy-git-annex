import * as anx from '../../src/index.ts';
import { commitFile, copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';

describe('cherry-pick', () => {
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

  test('cherry picks from a branch', async () => {
    await copyAddGitCommit(TestFile.TXT1, repositoryPath, 'add one text file for cherry-pick');
    const branchName = 'new-branch-name';
    let rslt = await myAnx.switch(undefined, { '--create': branchName });
    expect(rslt.exitCode).toBe(0);
    await copyFile(TestFile.TXT2, repositoryPath, TestFile.TXT1);
    await commitFile(TestFile.TXT1, repositoryPath, 'modify file on the branch');
    rslt = await myAnx.switch('-');
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.cherryPick(branchName);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('1 file changed, 1 insertion(+), 1 deletion(-)');
  });

});

describe('CherryPickOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.CherryPickOptions, string[]][] = [
    [{ '--abort': null }, ['--abort']],
    [{ '--allow-empty': null }, ['--allow-empty']],
    [{ '--allow-empty-message': null }, ['--allow-empty-message']],
    [{ '--cleanup': 'scissors' }, ['--cleanup=scissors']],
    [{ '--continue': null }, ['--continue']],
    [{ '--ff': null }, ['--ff']],
    [{ '--gpg-sign': null }, ['--gpg-sign']],
    [{ '--gpg-sign': 'A' }, ['--gpg-sign=A']],
    [{ '--keep-redundant-commits': null }, ['--keep-redundant-commits']],
    [{ '--mainline': 2 }, ['--mainline', '2']],
    [{ '--mainline': '1' }, ['--mainline', '1']],
    [{ '--no-commit': null }, ['--no-commit']],
    [{ '--no-gpg-sign': null }, ['--no-gpg-sign']],
    [{ '--no-rerere-autoupdate': null }, ['--no-rerere-autoupdate']],
    [{ '--quit': null }, ['--quit']],
    [{ '--rerere-autoupdate': null }, ['--rerere-autoupdate']],
    [{ '--signoff': null }, ['--signoff']],
    [{ '--skip': null }, ['--skip']],
    [{ '--strategy': 'A' }, ['--strategy=A']],
    [{ '--strategy-option': 'A' }, ['--strategy-option=A']],
    [{ '-x': null }, ['-x']],
  ];

  test.each(tests)('CherryPickOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.cherryPick(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
