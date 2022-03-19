import * as anx from '../../src/index';
import { copyFile, createRepository, deleteDirectory, TestFile } from '../helpers';

describe('addGit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('adds a file', async () => {
    await copyFile(TestFile.TXT1, repositoryPath);
    const rslt = await myAnx.addGit(TestFile.TXT1, { '--verbose': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.TXT1);
  });

});

describe('AddGitOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.AddGitOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--chmod': '+x' }, ['--chmod=+x']],
    [{ '--force': null }, ['--force']],
    [{ '--ignore-errors': null }, ['--ignore-errors']],
    [{ '--intent-to-add': null }, ['--intent-to-add']],
    [{ '--no-all': null }, ['--no-all']],
    [{ '--refresh': null }, ['--refresh']],
    [{ '--renormalize': null }, ['--renormalize']],
    [{ '--sparse': null }, ['--sparse']],
    [{ '--update': null }, ['--update']],
    [{ '--verbose': null }, ['--verbose']],
  ];

  test.each(tests)('AddGitOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.addGit(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
