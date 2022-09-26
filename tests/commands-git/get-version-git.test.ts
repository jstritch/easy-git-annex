import * as anx from '../../src/index';

describe('getVersionGit', () => {
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    myAnx = anx.createAccessor(process.cwd());
  });

  test('returns the Git version object', async () => {
    const versionGit = await myAnx.getVersionGit();
    expect(versionGit.version.length).toBeGreaterThan(0);
    expect(versionGit.cpu.length).toBeGreaterThan(0);
    expect(versionGit.longSize.length).toBeGreaterThan(0);
    expect(versionGit.sizeTSize.length).toBeGreaterThan(0);
    expect(versionGit.shellPath.length).toBeGreaterThan(0);
  });
});
