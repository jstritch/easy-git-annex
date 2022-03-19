import * as anx from '../../src/index';
import { copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('diff', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;
  let remotePath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    remotePath = await createRepository();
    await setRepositoryAuthor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
    await deleteDirectory(remotePath);
  });

  test('compares a file', async () => {
    await copyAddGitCommit(TestFile.TXT1, repositoryPath, 'add one file for diff');
    await copyFile(TestFile.TXT2, repositoryPath, TestFile.TXT1);
    const rslt = await myAnx.diff(undefined, TestFile.TXT1);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(`diff --git a/${TestFile.TXT1} b/${TestFile.TXT1}`);
  });

});

describe('DiffOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.DiffOptions, string[]][] = [
    // DiffCommonOptions
    [{ '--abbrev': null }, ['--abbrev']],
    [{ '--abbrev': 4 }, ['--abbrev=4']],
    [{ '--abbrev': '7' }, ['--abbrev=7']],
    [{ '--anchored': 'A' }, ['--anchored=A']],
    [{ '--anchored': ['A', 'B'] }, ['--anchored=A', '--anchored=B']],
    [{ '--binary': null }, ['--binary']],
    [{ '--break-rewrites': null }, ['--break-rewrites']],
    [{ '--break-rewrites': 'A' }, ['--break-rewrites=A']],
    [{ '--check': null }, ['--check']],
    [{ '--combined-all-paths': null }, ['--combined-all-paths']],
    [{ '--compact-summary': null }, ['--compact-summary']],
    [{ '--cumulative': null }, ['--cumulative']],
    [{ '--diff-algorithm': 'myers' }, ['--diff-algorithm=myers']],
    [{ '--diff-filter': 'A' }, ['--diff-filter=A']],
    [{ '--diff-merges': 'combined' }, ['--diff-merges=combined']],
    [{ '--dirstat': null }, ['--dirstat']],
    [{ '--dirstat': 'A' }, ['--dirstat=A']],
    [{ '--dirstat': ['A'] }, ['--dirstat=A']],
    [{ '--dirstat': ['A', 'B'] }, ['--dirstat=A,B']],
    [{ '--dirstat-by-file': null }, ['--dirstat-by-file']],
    [{ '--dirstat-by-file': 'A' }, ['--dirstat-by-file=A']],
    [{ '--dirstat-by-file': ['A'] }, ['--dirstat-by-file=A']],
    [{ '--dirstat-by-file': ['A', 'B'] }, ['--dirstat-by-file=A,B']],
    [{ '--dst-prefix': 'A' }, ['--dst-prefix=A']],
    [{ '--ext-diff': null }, ['--ext-diff']],
    [{ '--find-copies': null }, ['--find-copies']],
    [{ '--find-copies': 4 }, ['--find-copies=4']],
    [{ '--find-copies': '7' }, ['--find-copies=7']],
    [{ '--find-copies-harder': null }, ['--find-copies-harder']],
    [{ '--find-object': 'A' }, ['--find-object=A']],
    [{ '--find-renames': null }, ['--find-renames']],
    [{ '--find-renames': 4 }, ['--find-renames=4']],
    [{ '--find-renames': '7' }, ['--find-renames=7']],
    [{ '--full-index': null }, ['--full-index']],
    [{ '--function-context': null }, ['--function-context']],
    [{ '--histogram': null }, ['--histogram']],
    [{ '--ignore-all-space': null }, ['--ignore-all-space']],
    [{ '--ignore-blank-lines': null }, ['--ignore-blank-lines']],
    [{ '--ignore-cr-at-eol': null }, ['--ignore-cr-at-eol']],
    [{ '--ignore-matching-lines': 'A' }, ['--ignore-matching-lines=A']],
    [{ '--ignore-space-at-eol': null }, ['--ignore-space-at-eol']],
    [{ '--ignore-space-change': null }, ['--ignore-space-change']],
    [{ '--ignore-submodules': null }, ['--ignore-submodules']],
    [{ '--ignore-submodules': 'A' }, ['--ignore-submodules=A']],
    [{ '--indent-heuristic': null }, ['--indent-heuristic']],
    [{ '--inter-hunk-context': 4 }, ['--inter-hunk-context=4']],
    [{ '--inter-hunk-context': '7' }, ['--inter-hunk-context=7']],
    [{ '--irreversible-delete': null }, ['--irreversible-delete']],
    [{ '--line-prefix': 'A' }, ['--line-prefix=A']],
    [{ '--minimal': null }, ['--minimal']],
    [{ '--name-only': null }, ['--name-only']],
    [{ '--name-status': null }, ['--name-status']],
    [{ '--no-diff-merges': null }, ['--no-diff-merges']],
    [{ '--no-ext-diff': null }, ['--no-ext-diff']],
    [{ '--no-indent-heuristic': null }, ['--no-indent-heuristic']],
    [{ '--no-patch': null }, ['--no-patch']],
    [{ '--no-prefix': null }, ['--no-prefix']],
    [{ '--no-relative': null }, ['--no-relative']],
    [{ '--no-renames': null }, ['--no-renames']],
    [{ '--no-rename-empty': null }, ['--no-rename-empty']],
    [{ '--no-textconv': null }, ['--no-textconv']],
    [{ '--numstat': null }, ['--numstat']],
    [{ '--output': 'A' }, ['--output=A']],
    [{ '--output-indicator-context': 'A' }, ['--output-indicator-context=A']],
    [{ '--output-indicator-new': 'A' }, ['--output-indicator-new=A']],
    [{ '--output-indicator-old': 'A' }, ['--output-indicator-old=A']],
    [{ '--patch': null }, ['--patch']],
    [{ '--patch-with-raw': null }, ['--patch-with-raw']],
    [{ '--patch-with-stat': null }, ['--patch-with-stat']],
    [{ '--patience': null }, ['--patience']],
    [{ '--pickaxe-all': null }, ['--pickaxe-all']],
    [{ '--pickaxe-regex': null }, ['--pickaxe-regex']],
    [{ '--raw': null }, ['--raw']],
    [{ '--relative': null }, ['--relative']],
    [{ '--relative': 'A' }, ['--relative=A']],
    [{ '--rename-empty': null }, ['--rename-empty']],
    [{ '--shortstat': null }, ['--shortstat']],
    [{ '--src-prefix': 'A' }, ['--src-prefix=A']],
    [{ '--stat': null }, ['--stat']],
    [{ '--stat': 'A' }, ['--stat=A']],
    [{ '--submodule': null }, ['--submodule']],
    [{ '--submodule': 'A' }, ['--submodule=A']],
    [{ '--summary': null }, ['--summary']],
    [{ '--text': null }, ['--text']],
    [{ '--textconv': null }, ['--textconv']],
    [{ '--unified': 4 }, ['--unified=4']],
    [{ '--unified': '7' }, ['--unified=7']],
    [{ '--word-diff': null }, ['--word-diff']],
    [{ '--word-diff': 'A' }, ['--word-diff=A']],
    [{ '--word-diff-regex': 'A' }, ['--word-diff-regex=A']],
    [{ '-l': 3 }, ['-l3']],
    [{ '-l': '7' }, ['-l7']],
    [{ '-z': null }, ['-z']],
    [{ '-G': 'A' }, ['-GA']],
    [{ '-O': 'A' }, ['-OA']],
    [{ '-R': null }, ['-R']],
    [{ '-S': 'A' }, ['-SA']],
    // DiffCommonOptions
    [{ '--exit-code': null }, ['--exit-code']],
    [{ '--quiet': null }, ['--quiet']],
  ];

  test.each(tests)('DiffOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.diff(undefined, undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
