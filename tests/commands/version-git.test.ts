import * as anx from '../../src/index';

describe('version', () => {

  test('correctly returns the git version', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionGit({ '--build-options': null });

    expect(result).toHaveProperty('exitCode', 0);
    expect(result).toMatchObject({ out: expect.stringContaining('git version ') as unknown });
    expect(result).toMatchObject({ out: expect.stringContaining('sizeof-size_t:') as unknown });
  });

});
