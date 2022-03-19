import * as anx from '../../src/index';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('revert', () => {
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

  test('reverts a commit', async () => {
    const commitMessage = 'add one text file for revert';
    await copyAddGitCommit(TestFile.TXT1, repositoryPath, commitMessage);
    const rslt = await myAnx.revert('HEAD');
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(commitMessage);
  });

});

describe('RevertOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.RevertOptions, string[]][] = [
    [{ '--abort': null }, ['--abort']],
    [{ '--cleanup': 'scissors' }, ['--cleanup=scissors']],
    [{ '--continue': null }, ['--continue']],
    [{ '--gpg-sign': null }, ['--gpg-sign']],
    [{ '--gpg-sign': 'A' }, ['--gpg-sign=A']],
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
  ];

  test.each(tests)('RevertOptionis "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.revert(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
