import * as anx from '../../src/index';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('grep', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
    await copyAddGitCommit([TestFile.TXT1, TestFile.TXT2, TestFile.TXT3], repositoryPath, 'add three files for grep');
  });

  afterAll(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('adds a string', async () => {
    const rslt = await myAnx.grep(undefined, undefined, { '-e': 'ipsum', '--files-with-matches': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.TXT2);
  });

});

describe('GrepOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.GrepOptions, string[]][] = [
    [{ '--after-context': 3 }, ['--after-context', '3']],
    [{ '--after-context': '7' }, ['--after-context', '7']],
    [{ '--all-match': null }, ['--all-match']],
    [{ '--before-context': 3 }, ['--before-context', '3']],
    [{ '--before-context': '7' }, ['--before-context', '7']],
    [{ '--break': null }, ['--break']],
    [{ '--cached': null }, ['--cached']],
    [{ '--column': null }, ['--column']],
    [{ '--context': 3 }, ['--context', '3']],
    [{ '--context': '7' }, ['--context', '7']],
    [{ '--count': null }, ['--count']],
    [{ '--exclude-standard': null }, ['--exclude-standard']],
    [{ '--files-with-matches': null }, ['--files-with-matches']],
    [{ '--files-without-match': null }, ['--files-without-match']],
    [{ '--fixed-strings': null }, ['--fixed-strings']],
    [{ '--function-context': null }, ['--function-context']],
    [{ '--heading': null }, ['--heading']],
    [{ '--ignore-case': null }, ['--ignore-case']],
    [{ '--invert-match': null }, ['--invert-match']],
    [{ '--line-number': null }, ['--line-number']],
    [{ '--max-count': 3 }, ['--max-count', '3']],
    [{ '--max-count': '7' }, ['--max-count', '7']],
    [{ '--max-depth': 3 }, ['--max-depth', '3']],
    [{ '--max-depth': '7' }, ['--max-depth', '7']],
    [{ '--no-exclude-standard': null }, ['--no-exclude-standard']],
    [{ '--no-index': null }, ['--no-index']],
    [{ '--no-recursive': null }, ['--no-recursive']],
    [{ '--no-textconv': null }, ['--no-textconv']],
    [{ '--only-matching': null }, ['--only-matching']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--recurse-submodules': null }, ['--recurse-submodules']],
    [{ '--recursive': null }, ['--recursive']],
    [{ '--show-function': null }, ['--show-function']],
    [{ '--text': null }, ['--text']],
    [{ '--textconv': null }, ['--textconv']],
    [{ '--threads': 3 }, ['--threads', '3']],
    [{ '--threads': '7' }, ['--threads', '7']],
    [{ '--untracked': null }, ['--untracked']],
    [{ '--word-regexp': null }, ['--word-regexp']],
    [{ '-e': 'regex' }, ['-e', 'regex']],
    [{ '-e': ['A', 'B'] }, ['-e', 'A', '-e', 'B']],
    [{ '-h': null }, ['-h']],
    [{ '-z': null }, ['-z']],
    [{ '-I': null }, ['-I']],
  ];

  test.each(tests)('GrepOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.grep(undefined, undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
