import * as anx from '../../src/index.ts';
import { copyFile, createDirectory, createRepository, deleteDirectory, TestFile } from '../helpers.ts';

describe('import', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;
  let remotePath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.jpg'] });
    remotePath = await createDirectory();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath, true);
    await deleteDirectory(remotePath);
  });

  test('imports one large and one small file from a remote', async () => {
    const remoteName = 'annex-remote';
    let rslt = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['importtree', 'yes'], ['encryption', 'none']]);
    expect(rslt.exitCode).toBe(0);

    await copyFile([TestFile.TXT1, TestFile.JPG1], remotePath);
    rslt = await myAnx.import('master', { '--from': remoteName, '--json': null });
    expect(rslt.exitCode).toBe(0);
    rslt = await myAnx.mergeAnx(`${remoteName}/master`, { '--allow-unrelated-histories': null });
    expect(rslt.exitCode).toBe(0);

    const fileNames = await myAnx.getFileNames();
    expect(fileNames).toHaveLength(2);
    expect(fileNames).toContain(TestFile.TXT1);
    expect(fileNames).toContain(TestFile.JPG1);
  });

});
