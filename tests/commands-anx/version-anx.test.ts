import * as anx from '../../src/index';

describe('versionAnx', () => {

  test('returns the git-annex version', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionAnx();

    expect(result.exitCode).toBe(0);
    expect(result.out).toContain('git-annex version:');
    expect(result.out).toContain('key/value backends:');
  });

  test('returns only the git-annex version', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionAnx({ '--raw': null });

    expect(result.exitCode).toBe(0);
    expect(result.out.length).toBeGreaterThan(0);
    expect(result.out).not.toContain('git-annex version:');
    expect(result.out).not.toContain('key/value backends:');
  });

});
