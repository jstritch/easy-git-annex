import * as anx from '../../src/index';

describe('versionAnx', () => {

  test('returns the git-annex version', async () => {
    const myAnx = anx.createAccessor('');
    const rslt = await myAnx.versionAnx();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('build flags:');
    expect(rslt.out).toContain('git-annex version:');
    expect(rslt.out).toContain('key/value backends:');
  });

  test('returns only the git-annex version', async () => {
    const myAnx = anx.createAccessor('');
    const rslt = await myAnx.versionAnx({ '--raw': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out.length).toBeGreaterThan(0);
    expect(rslt.out).not.toContain('build flags:');
    expect(rslt.out).not.toContain('git-annex version:');
    expect(rslt.out).not.toContain('key/value backends:');
  });

});
