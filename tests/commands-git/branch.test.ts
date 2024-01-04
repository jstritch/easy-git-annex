import * as anx from '../../src/index.ts';
import { copyAddGitCommit, createDirectory, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';

const branch1 = 'v1.0-dev';
const branch2 = 'v2.0-dev';
const branch3 = 'v2.1-dev';

interface FooBranch {
  name: string;
  head: string;
  contents?: string;
}

function isFooBranch(o: unknown): o is FooBranch {
  if (!anx.isRecord(o)) { return false; }
  if (!anx.isString(o['name'])) { return false; }
  if (!anx.isString(o['head'])) { return false; }
  if ('contents' in o && !anx.isString(o['contents'])) { return false; }
  return true;
}

describe('branch', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
    await copyAddGitCommit(TestFile.JPG1, repositoryPath, 'add one file for branch');
    await myAnx.branch(branch1, { '--copy': null });
    await myAnx.branch(branch2, { '--copy': null });
    await myAnx.branch(branch3, { '--copy': null });
  });

  afterAll(async () => {
    await deleteDirectory(repositoryPath);
  });

  const columns: [string, anx.Parser?][] = [
    ['name'],
    ['head'],
    ['contents', anx.parseOptionalString],
  ];

  const optionsTab: anx.BranchListOptions = {
    '--format': '%(refname:lstrip=2)%09%(objectname)%09%(contents:lines=1)',
    '--sort': ['*refname'],
  };

  const optionsNul: anx.BranchListOptions = {
    '--format': '%(refname:lstrip=2)%00%(objectname)%00%(contents:lines=1)',
    '--sort': ['*refname'],
  };

  const optionsBad: anx.ForEachRefOptions = {
    '--format': '%(refname'
  };

  const branchesTests: [[anx.ForEachRefOptions | string[], string?, string?], number][] = [
    [[optionsTab], 4],
    [[optionsNul], 0],
    [[optionsBad], 0],
    [[['--format=%(refname:lstrip=2)%09%(objectname)%09%(contents:lines=1)']], 4],
    [[optionsTab, 'v1*'], 1],
    [[optionsTab, , '\t'], 4],
    [[optionsTab, , '\0'], 0],
    [[optionsNul, , '\t'], 0],
    [[optionsNul, , '\0'], 4],
  ];

  test.each(branchesTests)('getBranches(%o)', async ([gitOptions, pattern, columnDelimiter], expected) => {
    const refs = await anx.getBranches(isFooBranch, columns, repositoryPath, gitOptions, pattern, columnDelimiter);
    expect(refs).toHaveLength(expected);
  });

  const branchNamesTests: [[string?, boolean?], number][] = [
    [[], 4],
    [[''], 4],
    [['v1*'], 1],
    [['V1*'], 0],
    [['V1*', false], 0],
    [['V1*', true], 1],
    [['v2'], 0],
  ];

  test.each(branchNamesTests)('getBranchNames(%o)', async ([pattern, ignoreCase], expected) => {
    const names = await myAnx.getBranchNames(pattern, ignoreCase);
    expect(names).toHaveLength(expected);
  });

  test('getBranchName', async () => {
    const branchName = await myAnx.getBranchName();
    expect(branchName).toBe('master');
  });

  test('getBranchName on non-repository', async () => {
    const dir = await createDirectory();
    const notAnnex = anx.createAccessor(dir);
    const branchName = await notAnnex.getBranchName();
    expect(branchName).toHaveLength(0);
    await deleteDirectory(dir);
  });

});

describe('BranchOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.BranchOptions, string[]][] = [
    // BranchListOptions
    [{ '--abbrev': 10 }, ['--abbrev=10']],
    [{ '--abbrev': '7' }, ['--abbrev=7']],
    [{ '--all': null }, ['--all']],
    [{ '--column': null }, ['--column']],
    [{ '--column': ['always', 'nodense'] }, ['--column=always,nodense']],
    [{ '--contains': null }, ['--contains']],
    [{ '--contains': 'c233c7a' }, ['--contains', 'c233c7a']],
    [{ '--contains': ['c233c7a'] }, ['--contains', 'c233c7a']],
    [{ '--contains': ['c233c7a', 'ab2c420'] }, ['--contains', 'c233c7a', '--contains', 'ab2c420']],
    [{ '--format': '%(taggerdate:unix)' }, ['--format', '%(taggerdate:unix)']],
    [{ '--ignore-case': null }, ['--ignore-case']],
    [{ '--merged': null }, ['--merged']],
    [{ '--merged': 'c233c7a' }, ['--merged', 'c233c7a']],
    [{ '--merged': ['c233c7a'] }, ['--merged', 'c233c7a']],
    [{ '--merged': ['c233c7a', 'ab2c420'] }, ['--merged', 'c233c7a', '--merged', 'ab2c420']],
    [{ '--no-abbrev': null }, ['--no-abbrev']],
    [{ '--no-column': null }, ['--no-column']],
    [{ '--no-contains': null }, ['--no-contains']],
    [{ '--no-contains': 'c233c7a' }, ['--no-contains', 'c233c7a']],
    [{ '--no-contains': ['c233c7a'] }, ['--no-contains', 'c233c7a']],
    [{ '--no-contains': ['c233c7a', 'ab2c420'] }, ['--no-contains', 'c233c7a', '--no-contains', 'ab2c420']],
    [{ '--no-merged': null }, ['--no-merged']],
    [{ '--no-merged': 'c233c7a' }, ['--no-merged', 'c233c7a']],
    [{ '--no-merged': ['c233c7a'] }, ['--no-merged', 'c233c7a']],
    [{ '--no-merged': ['c233c7a', 'ab2c420'] }, ['--no-merged', 'c233c7a', '--no-merged', 'ab2c420']],
    [{ '--omit-empty': null }, ['--omit-empty']],
    [{ '--points-at': null }, ['--points-at']],
    [{ '--points-at': 'HEAD' }, ['--points-at', 'HEAD']],
    [{ '--remotes': null }, ['--remotes']],
    [{ '--show-current': null }, ['--show-current']],
    [{ '--sort': 'A' }, ['--sort=A']],
    [{ '--sort': ['A', 'B'] }, ['--sort=A', '--sort=B']],
    [{ '--verbose': null }, ['--verbose']],
    [{ '--verbose': [null] }, ['--verbose']],
    [{ '--verbose': [null, null] }, ['--verbose', '--verbose']],
    // BranchOptions
    [{ '--copy': null }, ['--copy']],
    [{ '--create-reflog': null }, ['--create-reflog']],
    [{ '--delete': null }, ['--delete']],
    [{ '--force': null }, ['--force']],
    [{ '--list': null }, ['--list']],
    [{ '--move': null }, ['--move']],
    [{ '--no-create-reflog': null }, ['--no-create-reflog']],
    [{ '--no-track': null }, ['--no-track']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--recurse-submodules': null }, ['--recurse-submodules']],
    [{ '--set-upstream-to': 'A' }, ['--set-upstream-to=A']],
    [{ '--track': null }, ['--track']],
    [{ '--track': 'direct' }, ['--track=direct']],
    [{ '--unset-upstream': null }, ['--unset-upstream']],
  ];

  test.each(tests)('BranchOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.branch(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
