import * as anx from '../../src/index';

describe('version', () => {

  test('correctly returns the git-annex version', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionAnx();

    expect(result.exitCode).toBe(0);
    expect(result.out).toEqual(expect.stringContaining('git-annex version:'));
    expect(result.out).toEqual(expect.stringContaining('key/value backends:'));
  });

  test('correctly returns only the git-annex version', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionAnx({ '--raw': null });

    expect(result.exitCode).toBe(0);
    expect(result.out.length).toBeGreaterThan(0);
    expect(result.out).toEqual(expect.not.stringContaining('git-annex version:'));
    expect(result.out).toEqual(expect.not.stringContaining('key/value backends:'));
  });

});
