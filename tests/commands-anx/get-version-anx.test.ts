import * as anx from '../../src/index';

describe('getVersionAnx', () => {
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    myAnx = anx.createAccessor(process.cwd());
  });

  test('returns the git-annex version object', async () => {
    const versionAnx = await myAnx.getVersionAnx();
    expect(versionAnx.version.length).toBeGreaterThan(0);
    expect(versionAnx.buildFlags.length).toBeGreaterThan(0);
    expect(versionAnx.dependencyVersions.length).toBeGreaterThan(0);
    expect(versionAnx.keyValueBackends.length).toBeGreaterThan(0);
    expect(versionAnx.remoteTypes.length).toBeGreaterThan(0);
    expect(versionAnx.operatingSystem.length).toBeGreaterThan(0);
    expect(versionAnx.supportsRepositories.length).toBeGreaterThan(0);
    expect(versionAnx.upgradesRepositories.length).toBeGreaterThan(0);
  });
});
