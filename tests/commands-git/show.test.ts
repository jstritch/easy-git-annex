import * as anx from '../../src/index';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

const message1 = 'add first file for show';
const message2 = 'add second file for show';
const message3 = 'add third file for show';
const tag1 = 'v1.0';

interface FooShow {
  objectName: string;
  authorDate: Date;
  authorName: string;
  contents?: string;
}

function isFooShow(o: unknown): o is FooShow {
  if (!anx.isRecord(o)) { return false; }
  if (!anx.isString(o['objectName'])) { return false; }
  if (!anx.isDate(o['authorDate'])) { return false; }
  if (!anx.isString(o['authorName'])) { return false; }
  if ('contents' in o && !anx.isString(o['contents'])) { return false; }
  return true;
}

describe('show', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
    await copyAddGitCommit(TestFile.TXT1, repositoryPath, message1);
    await myAnx.tag(tag1);
    await copyAddGitCommit(TestFile.TXT2, repositoryPath, message2);
    await copyAddGitCommit(TestFile.TXT3, repositoryPath, message3);
  });

  afterAll(async () => {
    await deleteDirectory(repositoryPath);
  });

  const options: anx.ShowOptions = {
    '--format': '%H%x09%at%x09%an%x09%s'
  };

  const showTests: [[string[]?, anx.ShowOptions?], string][] = [
    [[[tag1], options], TestFile.TXT1],
    [[, options], TestFile.TXT3],
  ];

  test.each(showTests)('show(%o)', async ([commandParameters, gitOptions], expected) => {
    const rslt = await myAnx.show(commandParameters, gitOptions);
    expect(rslt.out).toContain(expected);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(expected);
  });

  const getShowsTests: [[string[]?, anx.ShowOptions?], number][] = [
    [[[tag1], options], 1],
    [[, options], 1],
  ];

  const columns: [string, anx.Parser?][] = [
    ['objectName'],
    ['authorDate', anx.parseUnixDate],
    ['authorName'],
    ['contents', anx.parseOptionalString],
  ];

  test.each(getShowsTests)('getShows(%o)', async ([commandParameters, gitOptions], expected) => {
    const shows = await anx.getShows(isFooShow, columns, repositoryPath, commandParameters, gitOptions);
    expect(shows).toHaveLength(expected);
  });

});

describe('ShowOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ShowOptions, string[]][] = [
    [{ '--abbrev-commit': null }, ['--abbrev-commit']],
    [{ '--children': null }, ['--children']],
    [{ '--date': 'unix' }, ['--date=unix']],
    [{ '--encoding': 'utf16' }, ['--encoding=utf16']],
    [{ '--expand-tabs': null }, ['--expand-tabs']],
    [{ '--expand-tabs': 3 }, ['--expand-tabs=3']],
    [{ '--expand-tabs': '4' }, ['--expand-tabs=4']],
    [{ '--format': 'oneline' }, ['--format=oneline']],
    [{ '--graph': null }, ['--graph']],
    [{ '--left-right': null }, ['--left-right']],
    [{ '--no-abbrev-commit': null }, ['--no-abbrev-commit']],
    [{ '--no-expand-tabs': null }, ['--no-expand-tabs']],
    [{ '--no-notes': null }, ['--no-notes']],
    [{ '--notes': null }, ['--notes']],
    [{ '--notes': 'A' }, ['--notes=A']],
    [{ '--notes': ['A', 'B'] }, ['--notes=A', '--notes=B']],
    [{ '--oneline': null }, ['--oneline']],
    [{ '--parents': null }, ['--parents']],
    [{ '--show-linear-break': null }, ['--show-linear-break']],
    [{ '--show-linear-break': 'A' }, ['--show-linear-break=A']],
    [{ '--show-signature': null }, ['--show-signature']],
    // one diff option to validate subclass
    [{ '--ignore-cr-at-eol': null }, ['--ignore-cr-at-eol']],
  ];

  test.each(tests)('ShowOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.show(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
