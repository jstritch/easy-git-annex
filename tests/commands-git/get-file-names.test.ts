import * as anx from '../../src/index';
import * as path from 'path';
import { copyAddGitCommit, copyFile, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';
import { promises as fs } from 'fs';

describe('getFileNames', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
    await copyAddGitCommit([TestFile.TXT1, TestFile.TXT2, TestFile.TXT3], repositoryPath, 'add three test files for gitLsFiles');
    await fs.rm(path.join(repositoryPath, TestFile.TXT2));        // a deleted file
    await copyFile(TestFile.TXT2, repositoryPath, TestFile.TXT3); // a modified file
    await copyFile(TestFile.JPG1, repositoryPath);                // an untracked file
  });

  afterAll(async () => {
    await deleteDirectory(repositoryPath);
  });

  const tests: [[(string | string[])?, boolean?, boolean?, boolean?, boolean?], string[]][] = [
    [[, , , ,], [TestFile.TXT1, TestFile.TXT2, TestFile.TXT3]],
    [[, true, true, true, true], [TestFile.TXT1, TestFile.TXT2, TestFile.TXT3, TestFile.JPG1]],
    [['*.jpg', true, true, true, true], [TestFile.JPG1]],
    [['*.jpg', , , ,], []],
    [[, true, , ,], [TestFile.TXT1, TestFile.TXT2, TestFile.TXT3]],
    [[, , true, ,], [TestFile.TXT2]],
    [[, , , true], [TestFile.TXT2, TestFile.TXT3]],
    [[, , , , true], [TestFile.JPG1]],
  ];

  test.each(tests)('getFileNames "%o"', async ([relativePaths, showCached, showDeleted, showModified, showOthers], expected) => {
    const files = await myAnx.getFileNames(relativePaths, showCached, showDeleted, showModified, showOthers);
    expect(files).toEqual(expect.arrayContaining(expected));
    expect(files).toHaveLength(expected.length);  // no extra files or empty strings
  });

});
