import * as anx from '../../src/index';

describe('getSpecialRemoteTypes', () => {
  let myAnx: anx.GitAnnexAPI;

  beforeEach(() => {
    myAnx = anx.createAccessor(process.cwd());
  });

  test('returns the array', async () => {
    const remoteTypes = await myAnx.getSpecialRemoteTypes();
    expect(remoteTypes.length).toBeGreaterThan(0);
  });

});
