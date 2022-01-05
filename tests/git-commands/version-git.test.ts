import * as anx from '../../src/index';

describe('versionGit', () => {

  test('correctly returns the git version', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionGit();

    expect(result.exitCode).toBe(0);
    expect(result.out).toEqual(expect.stringContaining('git version '));
    expect(result.out).toEqual(expect.not.stringContaining('sizeof-size_t:'));
  });

  test('correctly includes build information', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionGit({ '--build-options': null });

    expect(result.exitCode).toBe(0);
    expect(result.out).toEqual(expect.stringContaining('git version '));
    expect(result.out).toEqual(expect.stringContaining('sizeof-size_t:'));
  });
});
