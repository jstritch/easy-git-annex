import * as anx from '../../src/index';
import { allTestFiles, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('lsFiles', () => {
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

  test('lists untracked files', async () => {
    await copyFile(allTestFiles, repositoryPath);
    const rslt = await myAnx.lsFiles(undefined, { '--others': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.JPG1);
    expect(rslt.out).toContain(TestFile.JPG2);
    expect(rslt.out).toContain(TestFile.JPG3);
    expect(rslt.out).toContain(TestFile.TXT1);
    expect(rslt.out).toContain(TestFile.TXT2);
    expect(rslt.out).toContain(TestFile.TXT3);
  });

});

describe('LsFilesOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.LsFilesOptions, string[]][] = [
    [{ '--abbrev': null }, ['--abbrev']],
    [{ '--abbrev': 3 }, ['--abbrev=3']],
    [{ '--abbrev': '7' }, ['--abbrev=7']],
    [{ '--cached': null }, ['--cached']],
    [{ '--debug': null }, ['--debug']],
    [{ '--deduplicate': null }, ['--deduplicate']],
    [{ '--deleted': null }, ['--deleted']],
    [{ '--directory': null }, ['--directory']],
    [{ '--eol': null }, ['--eol']],
    [{ '--error-unmatch': null }, ['--error-unmatch']],
    [{ '--exclude': 'a' }, ['--exclude=a']],
    [{ '--exclude-standard': null }, ['--exclude-standard']],
    [{ '--full-name': null }, ['--full-name']],
    [{ '--ignored': null }, ['--ignored']],
    [{ '--killed': null }, ['--killed']],
    [{ '--modified': null }, ['--modified']],
    [{ '--no-empty-directory': null }, ['--no-empty-directory']],
    [{ '--others': null }, ['--others']],
    [{ '--recurse-submodules': null }, ['--recurse-submodules']],
    [{ '--sparse': null }, ['--sparse']],
    [{ '--stage': null }, ['--stage']],
    [{ '--unmerged': null }, ['--unmerged']],
    [{ '-z': null }, ['-z']],
  ];

  test.each(tests)('LsFilesOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.lsFiles(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
