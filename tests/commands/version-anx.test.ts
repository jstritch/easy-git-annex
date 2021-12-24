import * as anx from '../../src/index';

describe('version', () => {

  test('correctly returns the git-annex version', async () => {
    const myAnx = anx.createAccessor('');
    const result = await myAnx.versionAnx({}, {});

    expect(result).toHaveProperty('exitCode', 0);
    expect(result).toMatchObject({ out: expect.stringContaining('git-annex version:') as unknown });
  });

});
