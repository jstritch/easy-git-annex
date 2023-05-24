import * as anx from '../../src/index.ts';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';

describe('switch', () => {
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
    await copyAddGitCommit(TestFile.JPG1, repositoryPath, 'add one binary file for switch');
    const branchName = 'new-branch-name';
    const rslt = await myAnx.switch(undefined, { '--create': branchName });
    expect(rslt.exitCode).toBe(0);
    const branchNames = await myAnx.getBranchNames();
    expect(branchNames).toContain(branchName);
  });

});

describe('SwitchOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.SwitchOptions, string[]][] = [
    [{ '--conflict': 'diff3' }, ['--conflict=diff3']],
    [{ '--create': 'A' }, ['--create', 'A']],
    [{ '--detach': null }, ['--detach']],
    [{ '--discard-changes': null }, ['--discard-changes']],
    [{ '--force-create': 'A' }, ['--force-create', 'A']],
    [{ '--ignore-other-worktrees': null }, ['--ignore-other-worktrees']],
    [{ '--merge': null }, ['--merge']],
    [{ '--no-progress': null }, ['--no-progress']],
    [{ '--no-recurse-submodules': null }, ['--no-recurse-submodules']],
    [{ '--no-track': null }, ['--no-track']],
    [{ '--orphan': 'A' }, ['--orphan', 'A']],
    [{ '--progress': null }, ['--progress']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--recurse-submodules': null }, ['--recurse-submodules']],
    [{ '--track': null }, ['--track']],
    [{ '--track': 'direct' }, ['--track', 'direct']],
  ];

  test.each(tests)('SwitchOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.switch(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
