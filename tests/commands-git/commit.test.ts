import * as anx from '../../src/index';
import { copyAddGit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('commit', () => {
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

  test('commits one binary file', async () => {
    await copyAddGit(TestFile.JPG1, repositoryPath);

    const rslt = await myAnx.commit(TestFile.JPG1, { '--message': 'add one binary file for commit' });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.JPG1);
  });

  test('commits an array of files', async () => {
    await copyAddGit(TestFile.JPG1, repositoryPath);
    await copyAddGit(TestFile.TXT1, repositoryPath);

    const rslt = await myAnx.commit([TestFile.JPG1, TestFile.TXT1], { '--message': 'add one binary and one text file for commit' });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.JPG1);
    expect(rslt.out).toContain(TestFile.TXT1);
  });

});

describe('CommitOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.CommitOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--amend': null }, ['--amend']],
    [{ '--gpg-sign': null }, ['--gpg-sign']],
    [{ '--gpg-sign': 'A' }, ['--gpg-sign=A']],
    [{ '--message': 'A B' }, ['--message=A B']],
    [{ '--no-gpg-sign': null }, ['--no-gpg-sign']],
    [{ '--quiet': null }, ['--quiet']],
  ];

  test.each(tests)('CommitOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.commit(TestFile.JPG1, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
