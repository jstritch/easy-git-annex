import * as anx from '../../src/index.ts';
import { commitFile, copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';

describe('pull', () => {
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

  test('merges from a branch', async () => {
    await copyAddGitCommit(TestFile.TXT1, repositoryPath, 'add one text file for merge');
    const branchName = 'new-branch-name';
    let rslt = await myAnx.switch(undefined, { '--create': branchName });
    expect(rslt.exitCode).toBe(0);
    await copyFile(TestFile.TXT2, repositoryPath, TestFile.TXT1);
    await commitFile(TestFile.TXT1, repositoryPath, 'modify file on the branch');
    rslt = await myAnx.switch('-');
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.mergeGit(branchName);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('1 file changed, 1 insertion(+), 1 deletion(-)');
  });

});

describe('PullOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.PullOptions, string[]][] = [
    [{ '--allow-unrelated-histories': null }, ['--allow-unrelated-histories']],
    [{ '--autostash': null }, ['--autostash']],
    [{ '--cleanup': 'scissors' }, ['--cleanup=scissors']],
    [{ '--commit': null }, ['--commit']],
    [{ '--ff': null }, ['--ff']],
    [{ '--ff-only': null }, ['--ff-only']],
    [{ '--gpg-sign': null }, ['--gpg-sign']],
    [{ '--gpg-sign': 'A' }, ['--gpg-sign=A']],
    [{ '--log': null }, ['--log']],
    [{ '--log': 3 }, ['--log=3']],
    [{ '--log': '7' }, ['--log=7']],
    [{ '--no-autostash': null }, ['--no-autostash']],
    [{ '--no-commit': null }, ['--no-commit']],
    [{ '--no-ff': null }, ['--no-ff']],
    [{ '--no-gpg-sign': null }, ['--no-gpg-sign']],
    [{ '--no-log': null }, ['--no-log']],
    [{ '--no-rebase': null }, ['--no-rebase']],
    [{ '--no-recurse-submodules': null }, ['--no-recurse-submodules']],
    [{ '--no-signoff': null }, ['--no-signoff']],
    [{ '--no-squash': null }, ['--no-squash']],
    [{ '--no-stat': null }, ['--no-stat']],
    [{ '--no-verify': null }, ['--no-verify']],
    [{ '--no-verify-signatures': null }, ['--no-verify-signatures']],
    [{ '--porcelain': null }, ['--porcelain']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--rebase': null }, ['--rebase']],
    [{ '--rebase': 'merges' }, ['--rebase=merges']],
    [{ '--recurse-submodules': null }, ['--recurse-submodules']],
    [{ '--recurse-submodules': 'yes' }, ['--recurse-submodules=yes']],
    [{ '--signoff': null }, ['--signoff']],
    [{ '--squash': null }, ['--squash']],
    [{ '--stat': null }, ['--stat']],
    [{ '--strategy': 'A' }, ['--strategy=A']],
    [{ '--strategy': ['A'] }, ['--strategy=A']],
    [{ '--strategy': ['A', 'B'] }, ['--strategy=A', '--strategy=B']],
    [{ '--strategy-option': 'A' }, ['--strategy-option=A']],
    [{ '--verbose': null }, ['--verbose']],
    [{ '--verify': null }, ['--verify']],
    [{ '--verify-signatures': null }, ['--verify-signatures']],
    // one fetch common option to validate subclass
    [{ '--ipv6': null }, ['--ipv6']],
  ];

  test.each(tests)('PullOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.pull(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
