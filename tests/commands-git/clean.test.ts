import * as anx from '../../src/index';
import { copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('clean', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
    await copyAddGitCommit(TestFile.JPG1, repositoryPath, 'add one file for clean');
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('cleans one file', async () => {
    await copyFile(TestFile.TXT1, repositoryPath);
    const rslt = await myAnx.clean(undefined, { '--force': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.TXT1);
  });

});

describe('CleanOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.CleanOptions, string[]][] = [
    [{ '--dry-run': null }, ['--dry-run']],
    [{ '--exclude': 'A' }, ['--exclude=A']],
    [{ '--force': null }, ['--force']],
    [{ '--force': [null] }, ['--force']],
    [{ '--force': [null, null] }, ['--force', '--force']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '-d': null }, ['-d']],
    [{ '-x': null }, ['-x']],
    [{ '-X': null }, ['-X']],
  ];

  test.each(tests)('CleanOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.clean(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
