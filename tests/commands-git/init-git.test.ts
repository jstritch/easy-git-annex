import * as anx from '../../src/index.ts';
import { createDirectory, deleteDirectory } from '../helpers.ts';

describe('initGit', () => {
  let repositoryPath: string;

  beforeEach(async () => {
    repositoryPath = await createDirectory();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('initializes a git repository', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const rslt = await myAnx.initGit();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('Initialized empty Git repository');
  });

});

describe('InitGitOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.InitGitOptions, string[]][] = [
    [{ '--bare': null }, ['--bare']],
    [{ '--initial-branch': 'dev' }, ['--initial-branch=dev']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--separate-git-dir': '/tmp' }, ['--separate-git-dir=/tmp']],
    [{ '--shared': null }, ['--shared']],
    [{ '--shared': 'group' }, ['--shared=group']],
    [{ '--template': '/tmp' }, ['--template=/tmp']],
  ];

  test.each(tests)('InitGitOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.initGit(gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
