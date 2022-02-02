import * as anx from '../../src/index';
import * as path from 'path';
import { createRepository, deleteDirectory, setRepositoryAuthor } from '../helpers';
import { promises as fs } from 'fs';

const projectPath = process.cwd();
const file1 = 'file one.jpg';
const file1Path = path.join(projectPath, 'tests', 'data', file1);
const file2 = 'file one.txt';
const file2Path = path.join(projectPath, 'tests', 'data', file2);

describe('tag', () => {
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

  test('creates, moves, deletes, and lists tags', async () => {
    const tag1 = 'v1.0';
    const tag2 = 'v1.1';
    const tag3 = 'v2.0';

    await fs.copyFile(file1Path, path.join(repositoryPath, file1));
    const addResult1 = await myAnx.runGit(['add', file1]);

    expect(addResult1.exitCode).toBe(0);

    const commitResult1 = await myAnx.commit(file1, { '--message': 'add first file' });

    expect(commitResult1.exitCode).toBe(0);

    const result1 = await myAnx.tag(tag1);

    expect(result1.exitCode).toBe(0);

    const result2 = await myAnx.tag(tag2, { '--annotate': null, '--message': 'the second release' });

    expect(result2.exitCode).toBe(0);

    const result3 = await myAnx.tag(tag3, { '--message': 'the third release' });

    expect(result3.exitCode).toBe(0);

    const listCreatedResult = await myAnx.tag();

    expect(listCreatedResult.exitCode).toBe(0);
    expect(listCreatedResult.out).toContain(tag1);
    expect(listCreatedResult.out).toContain(tag2);
    expect(listCreatedResult.out).toContain(tag3);

    await fs.copyFile(file2Path, path.join(repositoryPath, file2));
    const addResult2 = await myAnx.runGit(['add', file2]);

    expect(addResult2.exitCode).toBe(0);

    const commitResult2 = await myAnx.commit(file2, { '--message': 'add second file' });

    expect(commitResult2.exitCode).toBe(0);

    const result4 = await myAnx.tag(tag3, { '--force': null, '--message': 'the third release, revised' });

    expect(result4.exitCode).toBe(0);

    const result5 = await myAnx.tag(tag2, { '--delete': null });

    expect(result5.exitCode).toBe(0);

    const listRevisedResult = await myAnx.tag();

    expect(listRevisedResult.exitCode).toBe(0);
    expect(listRevisedResult.out).toContain(tag1);
    expect(listRevisedResult.out).not.toContain(tag2);
    expect(listRevisedResult.out).toContain(tag3);
  });

});
