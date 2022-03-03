import * as anx from '../../src/index';

describe('getBackends', () => {
  let myAnx: anx.GitAnnexAPI;

  beforeEach(() => {
    myAnx = anx.createAccessor(process.cwd());
  });

  test('returns the array', async () => {
    const backends = await myAnx.getBackends();
    expect(backends.length).toBeGreaterThan(0);
  });

});
