import * as anx from '../../src/index.ts';

describe('getBuildFlags', () => {
  let myAnx: anx.GitAnnexAPI;

  beforeEach(() => {
    myAnx = anx.createAccessor(process.cwd());
  });

  test('returns the array', async () => {
    const buildFlags = await myAnx.getBuildFlags();
    expect(buildFlags.length).toBeGreaterThan(0);
  });

});
