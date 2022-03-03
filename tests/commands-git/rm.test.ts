import * as anx from '../../src/index';
import { allTestFiles, copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('rm', () => {
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

  test('accepts the -r and --force options', async () => {
    await copyAddGitCommit(allTestFiles, repositoryPath, 'add all test files for rm');
    await copyFile(TestFile.JPG1, repositoryPath, TestFile.JPG2);
    await copyFile(TestFile.TXT1, repositoryPath, TestFile.TXT2);
    const rslt = await myAnx.rm(allTestFiles, { '-r': null, '--force': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.JPG1);
    expect(rslt.out).toContain(TestFile.JPG2);
    expect(rslt.out).toContain(TestFile.JPG3);
    expect(rslt.out).toContain(TestFile.TXT1);
    expect(rslt.out).toContain(TestFile.TXT2);
    expect(rslt.out).toContain(TestFile.TXT3);
  });

});

describe('RmOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.RmOptions, string[]][] = [
    [{ '--cached': null }, ['--cached']],
    [{ '--force': null }, ['--force']],
    [{ '--ignore-unmatch': null }, ['--ignore-unmatch']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--sparse': null }, ['--sparse']],
    [{ '-r': null }, ['-r']],
  ];

  test.each(tests)('RmOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.rm('', gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
