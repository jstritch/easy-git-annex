import * as anx from '../../src/index';

describe('getRemoteTypes', () => {
  let myAnx: anx.GitAnnexAPI;

  beforeEach(() => {
    myAnx = anx.createAccessor(process.cwd());
  });

  test('returns the array', async () => {
    const remoteTypes = await myAnx.getRemoteTypes();

    expect(remoteTypes.length).toBeGreaterThan(0);
  });

});
