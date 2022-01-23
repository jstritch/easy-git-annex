import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory } from '../helpers';
import { promises as fs } from 'fs';

const projectPath = process.cwd();
const textFile1 = 'file1.txt';
const textFile1Path = path.join(projectPath, 'tests', 'data', textFile1);
const textFile2 = 'file2.txt';

describe('getStatusGit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('shows an untracked file', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const statusGit = await myAnx.getStatusGit();

    expect(statusGit).toHaveLength(1);
    expect(statusGit[0].x).toBe('?');
    expect(statusGit[0].y).toBe('?');
    expect(statusGit[0].path).toContain(textFile1);
    expect(statusGit[0].origPath).toBeUndefined();
  });

  test('includes origPath for a renamed file', async () => {

    await fs.copyFile(textFile1Path, path.join(repositoryPath, textFile1));
    const addResult = await myAnx.runGit(['add', textFile1]);

    expect(addResult.exitCode).toBe(0);

    const commitResult = await myAnx.commit(textFile1, { '--message': 'add one text file' });

    expect(commitResult.exitCode).toBe(0);

    const mvResult = await myAnx.mv(textFile1, textFile2);

    expect(mvResult.exitCode).toBe(0);

    const statusGit = await myAnx.getStatusGit();

    expect(statusGit).toHaveLength(1);
    expect(statusGit[0].x).toBe('R');
    expect(statusGit[0].y).toBe(' ');
    expect(statusGit[0].path).toContain(textFile2);
    expect(statusGit[0]?.origPath).toContain(textFile1);
  });

});
