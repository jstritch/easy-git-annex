import * as anx from '../../src/index.ts';
import * as path from 'node:path';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';
import { promises as fs } from 'node:fs';

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
    expect(await anx.pathExists(fullPath)).toBe(true);
    await fs.rm(fullPath);
    expect(await anx.pathExists(fullPath)).toBe(false);
    const rslt = await myAnx.restore(TestFile.TXT1);
    expect(rslt.exitCode).toBe(0);
    expect(await anx.pathExists(fullPath)).toBe(true);
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
