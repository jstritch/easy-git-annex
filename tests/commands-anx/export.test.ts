import * as anx from '../../src/index.ts';
import * as path from 'node:path';
import { copyAddAnxCommit, createDirectory, createRepository, deleteDirectory, TestFile } from '../helpers.ts';

describe('export', () => {
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

  test('exports one large and one small file to a remote', async () => {
    const remoteName = 'annex-remote';
    let rslt = await myAnx.initremote(remoteName, 'directory', [['directory', remotePath], ['exporttree', 'yes'], ['encryption', 'none']]);
    expect(rslt.exitCode).toBe(0);

    await copyAddAnxCommit([TestFile.TXT1, TestFile.JPG1], repositoryPath, 'add test files for export');
    rslt = await myAnx.export('master', { '--to': remoteName, '--json': null });
    expect(rslt.exitCode).toBe(0);

    expect(await anx.pathExists(path.join(remotePath, TestFile.TXT1))).toBe(true);
    expect(await anx.pathExists(path.join(remotePath, TestFile.JPG1))).toBe(true);
  });

});
