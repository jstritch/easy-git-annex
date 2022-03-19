import * as anx from '../../src/index';
import { copyAddGit, createRepository, deleteDirectory, TestFile } from '../helpers';

describe('reset', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('restores a file', async () => {
    await copyAddGit(TestFile.TXT1, repositoryPath);
    const rslt = await myAnx.reset();
    expect(rslt.exitCode).toBe(0);
  });

});

describe('ResetOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ResetOptions, string[]][] = [
    [{ '--hard': null }, ['--hard']],
    [{ '--keep': null }, ['--keep']],
    [{ '--merge': null }, ['--merge']],
    [{ '--mixed': null }, ['--mixed']],
    [{ '--no-recurse-submodules': null }, ['--no-recurse-submodules']],
    [{ '--no-quiet': null }, ['--no-quiet']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--recurse-submodules': null }, ['--recurse-submodules']],
    [{ '--soft': null }, ['--soft']],
  ];

  test.each(tests)('ResetOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.reset(undefined, undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
