import * as anx from '../../src/index.ts';
import * as path from 'node:path';
import { allTestFiles, copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';
import { promises as fs } from 'node:fs';

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

interface FooFile {
  path: string;
  objectName: string;
  objectMode: string;
  stage: string;
}

function isFooFile(o: unknown): o is FooFile {
  if (!anx.isRecord(o)) { return false; }
  if (!anx.isString(o['path'])) { return false; }
  if (!anx.isString(o['objectName'])) { return false; }
  if (!anx.isString(o['objectMode'])) { return false; }
  if (!anx.isString(o['stage'])) { return false; }
  return true;
}

describe('listFiles', () => {
  let repositoryPath: string;

  beforeAll(async () => {
    repositoryPath = await createRepository();
    await setRepositoryAuthor(repositoryPath);
    await copyAddGitCommit([TestFile.TXT1, TestFile.TXT2, TestFile.TXT3], repositoryPath, 'add three test files for gitLsFiles');
    await fs.rm(path.join(repositoryPath, TestFile.TXT2));        // a deleted file
    await copyFile(TestFile.TXT2, repositoryPath, TestFile.TXT3); // a modified file
  });

  afterAll(async () => {
    await deleteDirectory(repositoryPath);
  });

  const columns: [string, anx.Parser?][] = [
    ['path'],
    ['objectName'],
    ['objectMode'],
    ['stage'],
  ];

  const gitOptions: anx.LsFilesOptions = {
    '--format': '%(path)%x09%(objectname)%x09%(objectmode)%x09%(stage)'
  };

  const tests: [[(string | string[])?], number][] = [
    [[], 3],
    [[TestFile.TXT2], 1],
  ];

  test.each(tests)('listFiles "%o"', async ([relativePaths], expected) => {
    const files = await anx.listFiles(isFooFile, columns, repositoryPath, gitOptions, relativePaths);
    expect(files).toHaveLength(expected);  // no extra files or empty strings
  });

});
