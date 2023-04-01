import * as anx from '../../src/index';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

const message1 = 'add first file for log';
const message2 = 'add second file for log';
const message3 = 'add third file for log';
const tag1 = 'v1.0';

interface FooLog {
  objectName: string;
  authorDate: Date;
  authorName: string;
  contents?: string;
}

function isFooLog(o: unknown): o is FooLog {
  if (!anx.isRecord(o)) { return false; }
  if (!anx.isString(o['objectName'])) { return false; }
  if (!anx.isDate(o['authorDate'])) { return false; }
  if (!anx.isString(o['authorName'])) { return false; }
  if ('contents' in o && !anx.isString(o['contents'])) { return false; }
  return true;
}

describe('log', () => {
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

  const options: anx.LogOptions = {
    '--format': '%H%x09%at%x09%an%x09%B'
  };

  const logTests: [[string[]?, string[]?, anx.LogOptions?], string][] = [
    [[[tag1],, options], message1],
    [[, [TestFile.TXT2], options], message2],
    [[,, options], message3],
  ];

  test.each(logTests)('log(%o)', async ([commandParameters, relativePaths, gitOptions], expected) => {
    const rslt = await myAnx.log(commandParameters, relativePaths, gitOptions);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(expected);
  });

  const getLogsTests: [[anx.LogOptions, string[]?, string[]?], number][] = [
    [[options, [tag1]], 1],
    [[options, , [TestFile.TXT2]], 1],
    [[options, ,], 3],
  ];

  const columns: [string, anx.Parser?][] = [
    ['objectName'],
    ['authorDate', anx.parseUnixDate],
    ['authorName'],
    ['contents', anx.parseOptionalString],
  ];

  test.each(getLogsTests)('getLogs(%o)', async ([gitOptions, commandParameters, relativePaths], expected) => {
    const logs = await anx.getLogs(isFooLog, columns, repositoryPath, gitOptions, commandParameters, relativePaths);
    expect(logs).toHaveLength(expected);
  });

});

describe('LogOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.LogOptions, string[]][] = [
    [{ '--abbrev-commit': null }, ['--abbrev-commit']],
    [{ '--all': null }, ['--all']],
    [{ '--all-match': null }, ['--all-match']],
    [{ '--alternate-refs': null }, ['--alternate-refs']],
    [{ '--ancestry-path': null }, ['--ancestry-path']],
    [{ '--author': 'regex' }, ['--author=regex']],
    [{ '--author': ['A', 'B'] }, ['--author=A', '--author=B']],
    [{ '--author-date-order': null }, ['--author-date-order']],
    [{ '--basic-regexp': null }, ['--basic-regexp']],
    [{ '--bisect': null }, ['--bisect']],
    [{ '--boundary': null }, ['--boundary']],
    [{ '--branches': 'A' }, ['--branches=A']],
    [{ '--cherry': null }, ['--cherry']],
    [{ '--cherry-mark': null }, ['--cherry-mark']],
    [{ '--cherry-pick': null }, ['--cherry-pick']],
    [{ '--children': null }, ['--children']],
    [{ '--committer': 'regex' }, ['--committer=regex']],
    [{ '--committer': ['A', 'B'] }, ['--committer=A', '--committer=B']],
    [{ '--date': 'unix' }, ['--date=unix']],
    [{ '--date-order': null }, ['--date-order']],
    [{ '--decorate': null }, ['--decorate']],
    [{ '--decorate': 'full' }, ['--decorate=full']],
    [{ '--decorate-refs': 'refs/remotes' }, ['--decorate-refs=refs/remotes']],
    [{ '--decorate-refs-exclude': 'refs/remotes' }, ['--decorate-refs-exclude=refs/remotes']],
    [{ '--dense': null }, ['--dense']],
    [{ '--encoding': 'utf16' }, ['--encoding=utf16']],
    [{ '--exclude': 'A' }, ['--exclude=A']],
    [{ '--exclude': ['A', 'B'] }, ['--exclude=A', '--exclude=B']],
    [{ '--exclude-first-parent-only': null }, ['--exclude-first-parent-only']],
    [{ '--expand-tabs': null }, ['--expand-tabs']],
    [{ '--expand-tabs': 3 }, ['--expand-tabs=3']],
    [{ '--expand-tabs': '4' }, ['--expand-tabs=4']],
    [{ '--extended-regexp': null }, ['--extended-regexp']],
    [{ '--first-parent': null }, ['--first-parent']],
    [{ '--fixed-strings': null }, ['--fixed-strings']],
    [{ '--follow': null }, ['--follow']],
    [{ '--format': 'oneline' }, ['--format=oneline']],
    [{ '--full-diff': null }, ['--full-diff']],
    [{ '--full-history': null }, ['--full-history']],
    [{ '--glob': 'A' }, ['--glob=A']],
    [{ '--graph': null }, ['--graph']],
    [{ '--grep': 'regex' }, ['--grep=regex']],
    [{ '--grep': ['A', 'B'] }, ['--grep=A', '--grep=B']],
    [{ '--grep-reflog': 'regex' }, ['--grep-reflog=regex']],
    [{ '--grep-reflog': ['A', 'B'] }, ['--grep-reflog=A', '--grep-reflog=B']],
    [{ '--ignore-missing': null }, ['--ignore-missing']],
    [{ '--invert-grep': null }, ['--invert-grep']],
    [{ '--left-only': null }, ['--left-only']],
    [{ '--left-right': null }, ['--left-right']],
    [{ '--log-size': null }, ['--log-size']],
    [{ '--mailmap': null }, ['--mailmap']],
    [{ '--max-count': 3 }, ['--max-count=3']],
    [{ '--max-count': '7' }, ['--max-count=7']],
    [{ '--max-parents': 1 }, ['--max-parents=1']],
    [{ '--max-parents': '0' }, ['--max-parents=0']],
    [{ '--merge': null }, ['--merge']],
    [{ '--merges': null }, ['--merges']],
    [{ '--min-parents': 2 }, ['--min-parents=2']],
    [{ '--min-parents': '3' }, ['--min-parents=3']],
    [{ '--no-abbrev-commit': null }, ['--no-abbrev-commit']],
    [{ '--no-decorate': null }, ['--no-decorate']],
    [{ '--no-expand-tabs': null }, ['--no-expand-tabs']],
    [{ '--no-mailmap': null }, ['--no-mailmap']],
    [{ '--no-max-parents': null }, ['--no-max-parents']],
    [{ '--no-merges': null }, ['--no-merges']],
    [{ '--no-min-parents': null }, ['--no-min-parents']],
    [{ '--no-notes': null }, ['--no-notes']],
    [{ '--no-walk': null }, ['--no-walk']],
    [{ '--no-walk': 'sorted' }, ['--no-walk=sorted']],
    [{ '--notes': null }, ['--notes']],
    [{ '--notes': 'A' }, ['--notes=A']],
    [{ '--notes': ['A', 'B'] }, ['--notes=A', '--notes=B']],
    [{ '--oneline': null }, ['--oneline']],
    [{ '--parents': null }, ['--parents']],
    [{ '--reflog': null }, ['--reflog']],
    [{ '--regexp-ignore-case': null }, ['--regexp-ignore-case']],
    [{ '--remotes': 'A' }, ['--remotes=A']],
    [{ '--remove-empty': null }, ['--remove-empty']],
    [{ '--reverse': null }, ['--reverse']],
    [{ '--right-only': null }, ['--right-only']],
    [{ '--show-linear-break': null }, ['--show-linear-break']],
    [{ '--show-linear-break': 'A' }, ['--show-linear-break=A']],
    [{ '--show-pulls': null }, ['--show-pulls']],
    [{ '--show-signature': null }, ['--show-signature']],
    [{ '--simplify-by-decoration': null }, ['--simplify-by-decoration']],
    [{ '--simplify-merges': null }, ['--simplify-merges']],
    [{ '--since': new Date('2022-03-10T00:00:00.000Z') }, ['--since=2022-03-10T00:00:00Z']],
    [{ '--since': '2 weeks ago' }, ['--since=2 weeks ago']],
    [{ '--single-worktree': null }, ['--single-worktree']],
    [{ '--skip': 3 }, ['--skip=3']],
    [{ '--skip': '7' }, ['--skip=7']],
    [{ '--source': null }, ['--source']],
    [{ '--sparse': null }, ['--sparse']],
    [{ '--tags': 'A' }, ['--tags=A']],
    [{ '--topo-order': null }, ['--topo-order']],
    [{ '--until': new Date('2022-03-10T00:00:00.000Z') }, ['--until=2022-03-10T00:00:00Z']],
    [{ '--until': 'yesterday' }, ['--until=yesterday']],
    [{ '--walk-reflogs': null }, ['--walk-reflogs']],
    [{ '-L': '3,10:foo.js' }, ['-L3,10:foo.js']],
    [{ '-L': ':regex:foo.js' }, ['-L:regex:foo.js']],
    // one diff option to validate subclass
    [{ '--ignore-cr-at-eol': null }, ['--ignore-cr-at-eol']],
  ];

  test.each(tests)('LogOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.log(undefined, undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
