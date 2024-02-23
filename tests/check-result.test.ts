import * as anx from '../src/index.ts';

describe('checkResult', () => {
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    myAnx = anx.createAccessor(process.cwd());
  });

  test('detects success', async () => {
    const rslt = anx.checkResult(await myAnx.versionGit());
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('git version ');
  });

  test('detects failure', async () => {
    await expect(async () => {
      anx.checkResult(await myAnx.versionGit(), 42);
    }).rejects.toThrow('The command: git version');
  });
});
