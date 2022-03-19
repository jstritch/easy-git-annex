import * as anx from '../../src/index';
import { commitFile, copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

const tag1 = 'v1.0.0';
const tag2 = 'v2.0.0-temp';
const tag3 = 'v2.0.0';

interface FooTag {
  name: string;
  objectName: string;
  taggerDate?: Date;
  contents?: string;
}

function isFooTag(o: unknown): o is FooTag {
  if (!anx.isRecord(o)) { return false; }
  if (!anx.isString(o['name'])) { return false; }
  if (!anx.isString(o['objectName'])) { return false; }
  if ('taggerDate' in o && !anx.isDate(o['taggerDate'])) { return false; }
  if ('contents' in o && !anx.isString(o['contents'])) { return false; }
  return true;
}

describe('forEachRef', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);

    await copyAddGitCommit(TestFile.JPG1, repositoryPath, 'add first file');
    await myAnx.tag(tag1, { '--message': 'the first release' });
    await copyFile(TestFile.JPG3, repositoryPath, TestFile.JPG1);
    await commitFile(TestFile.JPG1, repositoryPath, 'modify first file');
    await myAnx.tag(tag2);
    await myAnx.tag(tag3, { '--message': 'the second release' });
  });

  afterAll(async () => {
    await deleteDirectory(repositoryPath);
  });

  const columns: [string, anx.Parser?][] = [
    ['name'],
    ['objectName'],
    ['taggerDate', anx.parseUnixDate],
    ['contents', anx.parseOptionalString],
  ];

  const optionsTab: anx.ForEachRefOptions = {
    '--format': '%(refname:lstrip=2)%09%(objectname)%09%(taggerdate:unix)%09%(contents:lines=1)',
    '--sort': ['*refname'],
  };

  const optionsNul: anx.ForEachRefOptions = {
    '--format': '%(refname:lstrip=2)%00%(objectname)%00%(taggerdate:unix)%00%(contents:lines=1)',
    '--sort': ['*refname'],
  };

  const optionsBad: anx.ForEachRefOptions = {
    '--format': '%(refname'
  };

  const tests: [[anx.ForEachRefOptions, string], string][] = [
    [[optionsTab, 'refs/tags/v1*'], tag1],
  ];

  test.each(tests)('forEachRef(%o)', async ([gitOptions, pattern], expected) => {
    const rslt = await myAnx.forEachRef(gitOptions, pattern);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(expected);
  });

  const refsTests: [[anx.ForEachRefOptions, string, string?], number][] = [
    [[optionsTab, 'refs/tags/'], 3],
    [[optionsNul, 'refs/tags/'], 0],
    [[optionsBad, 'refs/tags/'], 0],
    [[optionsTab, 'refs/tag/'], 0],
    [[optionsTab, 'refs/tags/v1*'], 1],
    [[optionsTab, 'refs/tags/', '\t'], 3],
    [[optionsTab, 'refs/tags/', '\0'], 0],
    [[optionsNul, 'refs/tags/', '\t'], 0],
    [[optionsNul, 'refs/tags/', '\0'], 3],
  ];

  test.each(refsTests)('getRefs(%o)', async ([gitOptions, pattern, columnDelimiter], expected) => {
    const refs = await anx.getRefs(isFooTag, columns, repositoryPath, gitOptions, pattern, columnDelimiter);
    expect(refs).toHaveLength(expected);
  });

  const tagsTests: [[anx.ForEachRefOptions, string?, string?], number][] = [
    [[optionsTab], 3],
    [[optionsNul], 0],
    [[optionsBad], 0],
    [[optionsTab, 'Q'], 0],
    [[optionsTab, 'v2*'], 2],
    [[optionsNul, 'v2*', '\0'], 2],
    [[optionsTab, , '\t'], 3],
    [[optionsTab, , '\0'], 0],
    [[optionsNul, , '\t'], 0],
    [[optionsNul, , '\0'], 3],
  ];

  test.each(tagsTests)('getTags(%o)', async ([gitOptions, pattern, columnDelimiter], expected) => {
    const tags = await anx.getTags(isFooTag, columns, repositoryPath, gitOptions, pattern, columnDelimiter);
    expect(tags).toHaveLength(expected);
  });

  const tagNamesTests: [[string?, boolean?], number][] = [
    [[], 3],
    [[''], 3],
    [['v2*'], 2],
    [['V2*'], 0],
    [['V2*', false], 0],
    [['V2*', true], 2],
    [['v2'], 0],
  ];

  test.each(tagNamesTests)('getTagNames(%o)', async ([pattern, ignoreCase], expected) => {
    const names = await myAnx.getTagNames(pattern, ignoreCase);
    expect(names).toHaveLength(expected);
  });

});

describe('ForEachRefOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ForEachRefOptions, string[]][] = [
    [{ '--contains': null }, ['--contains']],
    [{ '--contains': 'c233c7a' }, ['--contains=c233c7a']],
    [{ '--contains': ['c233c7a'] }, ['--contains=c233c7a']],
    [{ '--contains': ['c233c7a', 'ab2c420'] }, ['--contains=c233c7a', '--contains=ab2c420']],
    [{ '--count': 3 }, ['--count=3']],
    [{ '--count': '7' }, ['--count=7']],
    [{ '--format': '%(taggerdate:unix)' }, ['--format=%(taggerdate:unix)']],
    [{ '--ignore-case': null }, ['--ignore-case']],
    [{ '--merged': null }, ['--merged']],
    [{ '--merged': 'c233c7a' }, ['--merged=c233c7a']],
    [{ '--merged': ['c233c7a'] }, ['--merged=c233c7a']],
    [{ '--merged': ['c233c7a', 'ab2c420'] }, ['--merged=c233c7a', '--merged=ab2c420']],
    [{ '--no-contains': null }, ['--no-contains']],
    [{ '--no-contains': 'c233c7a' }, ['--no-contains=c233c7a']],
    [{ '--no-contains': ['c233c7a'] }, ['--no-contains=c233c7a']],
    [{ '--no-contains': ['c233c7a', 'ab2c420'] }, ['--no-contains=c233c7a', '--no-contains=ab2c420']],
    [{ '--no-merged': null }, ['--no-merged']],
    [{ '--no-merged': 'c233c7a' }, ['--no-merged=c233c7a']],
    [{ '--no-merged': ['c233c7a'] }, ['--no-merged=c233c7a']],
    [{ '--no-merged': ['c233c7a', 'ab2c420'] }, ['--no-merged=c233c7a', '--no-merged=ab2c420']],
    [{ '--points-at': null }, ['--points-at']],
    [{ '--points-at': 'HEAD' }, ['--points-at', 'HEAD']],
    [{ '--sort': 'key' }, ['--sort=key']],
  ];

  test.each(tests)('ForEachRefOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.forEachRef(gitOptions, undefined, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
