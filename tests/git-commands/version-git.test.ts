import * as anx from '../../src/index';

describe('versionGit', () => {

  test('returns the git version', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionGit();

    expect(result.exitCode).toBe(0);
    expect(result.out).toContain('git version ');
    expect(result.out).not.toContain('sizeof-size_t:');
  });

  test('includes build information', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionGit({ '--build-options': null });

    expect(result.exitCode).toBe(0);
    expect(result.out).toContain('git version ');
    expect(result.out).toContain('sizeof-size_t:');
  });
});
