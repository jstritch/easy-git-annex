import * as anx from '../../src/index.ts';
import * as path from 'node:path';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';
import { promises as fs } from 'node:fs';

const subDir = 'sub directory';

describe('mv', () => {
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

  test('moves an array of files showing file names with --verbose', async () => {
    await copyAddGitCommit([TestFile.TXT1, TestFile.TXT2], repositoryPath, 'add two text files for mv');
    await fs.mkdir(path.join(repositoryPath, subDir));
    const rslt = await myAnx.mv([TestFile.TXT1, TestFile.TXT2], subDir, { '--verbose': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('Renaming');
  });

});

describe('MvOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.MvOptions, string[]][] = [
    [{ '--force': null }, ['--force']],
    [{ '--verbose': null }, ['--verbose']],
    [{ '-k': null }, ['-k']],
  ];

  test.each(tests)('MvOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.mv('', '', gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
