import * as anx from '../../src/index.ts';

describe('versionGit', () => {
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    myAnx = anx.createAccessor(process.cwd());
  });

  test('returns the git version', async () => {
    const rslt = await myAnx.versionGit();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('git version ');
    expect(rslt.out).not.toContain('sizeof-size_t:');
  });

  test('includes build information', async () => {
    const rslt = await myAnx.versionGit({ '--build-options': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('git version ');
    expect(rslt.out).toContain('sizeof-size_t:');
  });
});

describe('VersionGitOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.VersionGitOptions, string[]][] = [
    [{ '--build-options': null }, ['--build-options']],
  ];

  test.each(tests)('VersionGitOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.versionGit(gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
