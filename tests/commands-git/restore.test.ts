import * as anx from '../../src/index';
import * as path from 'path';
import { copyAddGitCommit, createRepository, deleteDirectory, pathExists, setRepositoryAuthor, TestFile } from '../helpers';
import { promises as fs } from 'fs';

describe('restore', () => {
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

  test('restores a file', async () => {
    await copyAddGitCommit(TestFile.TXT1, repositoryPath, 'add one text file for restore');
    const fullPath = path.join(repositoryPath, TestFile.TXT1);
    expect(await pathExists(fullPath)).toBe(true);
    await fs.unlink(fullPath);
    expect(await pathExists(fullPath)).toBe(false);
    const rslt = await myAnx.restore(TestFile.TXT1);
    expect(rslt.exitCode).toBe(0);
    expect(await pathExists(fullPath)).toBe(true);
  });

});

describe('RestoreOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.RestoreOptions, string[]][] = [
    [{ '--conflict': 'diff3' }, ['--conflict=diff3']],
    [{ '--ignore-skip-worktree-bits': null }, ['--ignore-skip-worktree-bits']],
    [{ '--ignore-unmerged': null }, ['--ignore-unmerged']],
    [{ '--merge': null }, ['--merge']],
    [{ '--no-overlay': null }, ['--no-overlay']],
    [{ '--no-progress': null }, ['--no-progress']],
    [{ '--no-recurse-submodules': null }, ['--no-recurse-submodules']],
    [{ '--ours': null }, ['--ours']],
    [{ '--overlay': null }, ['--overlay']],
    [{ '--progress': null }, ['--progress']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--recurse-submodules': null }, ['--recurse-submodules']],
    [{ '--source': 'A' }, ['--source=A']],
    [{ '--staged': null }, ['--staged']],
    [{ '--thiers': null }, ['--thiers']],
    [{ '--worktree': null }, ['--worktree']],
  ];

  test.each(tests)('RestoreOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.restore(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
