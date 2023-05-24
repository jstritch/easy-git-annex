import * as anx from '../../src/index.ts';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';

describe('checkout', () => {
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

  test('creates a new branch', async () => {
    await copyAddGitCommit(TestFile.JPG1, repositoryPath, 'add one binary file for checkout');
    const branchName = 'new-branch-name';
    const rslt = await myAnx.checkout(undefined, undefined, { '-b': branchName });
    expect(rslt.exitCode).toBe(0);
    const branchNames = await myAnx.getBranchNames();
    expect(branchNames).toContain(branchName);
  });

});

describe('CheckoutOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.CheckoutOptions, string[]][] = [
    [{ '-b': 'A' }, ['-b', 'A']],
    [{ '-b': ['A'] }, ['-b', 'A']],
    [{ '-b': ['A', 'B'] }, ['-b', 'A', 'B']],
    [{ '-l': null }, ['-l']],
    [{ '--detach': null }, ['--detach']],
    [{ '--force': null }, ['--force']],
    [{ '--ignore-skip-worktree-bits': null }, ['--ignore-skip-worktree-bits']],
    [{ '--merge': null }, ['--merge']],
    [{ '--no-progress': null }, ['--no-progress']],
    [{ '--no-track': null }, ['--no-track']],
    [{ '--orphan': 'A' }, ['--orphan', 'A']],
    [{ '--orphan': ['A'] }, ['--orphan', 'A']],
    [{ '--orphan': ['A', 'B'] }, ['--orphan', 'A', 'B']],
    [{ '--ours': null }, ['--ours']],
    [{ '--progress': null }, ['--progress']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--thiers': null }, ['--thiers']],
    [{ '--track': null }, ['--track']],
    [{ '--track': 'direct' }, ['--track=direct']],
  ];

  test.each(tests)('CheckoutOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.checkout(undefined, undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
