import * as anx from '../../src/index';
import { copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('getStatusGit', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('shows an untracked file', async () => {
    await copyFile(TestFile.TXT1, repositoryPath);

    const statusGit = await myAnx.getStatusGit();
    expect(statusGit).toHaveLength(1);
    expect(statusGit[0].x).toBe('?');
    expect(statusGit[0].y).toBe('?');
    expect(statusGit[0].path).toContain(TestFile.TXT1);
    expect(statusGit[0].origPath).toBeUndefined();
  });

  test('includes origPath for a renamed file', async () => {
    await copyAddGitCommit(TestFile.TXT1, repositoryPath, 'add one text file for getStatusGit');
    const rslt = await myAnx.mv(TestFile.TXT1, TestFile.TXT2);
    expect(rslt.exitCode).toBe(0);

    const statusGit = await myAnx.getStatusGit();
    expect(statusGit).toHaveLength(1);
    expect(statusGit[0].x).toBe('R');
    expect(statusGit[0].y).toBe(' ');
    expect(statusGit[0].path).toContain(TestFile.TXT2);
    expect(statusGit[0]?.origPath).toContain(TestFile.TXT1);
  });

});
