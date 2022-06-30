import * as anx from '../../src/index';

describe('getBuildFlags', () => {
  let myAnx: anx.GitAnnexAPI;

  beforeEach(() => {
    myAnx = anx.createAccessor(process.cwd());
  });

  test('returns the array', async () => {
    const backends = await myAnx.getBuildFlags();
    expect(backends.length).toBeGreaterThan(0);
    expect(backends).toContain('MagicMime');
  });

});
