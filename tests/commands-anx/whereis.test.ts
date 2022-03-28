import * as anx from '../../src/index';
import { allTestFiles, copyAddAnxCommit, createRepository, deleteDirectory, TestFile } from '../helpers';

interface FooWhereis {
  relativePath: string;
  byteSize: bigint;
  key: string;
  repositoryId: string;
}

function isFooWhereis(o: unknown): o is FooWhereis {
  if (!anx.isRecord(o)) { return false; }
  if (!anx.isString(o['relativePath'])) { return false; }
  if (!anx.isBigInt(o['byteSize'])) { return false; }
  if (!anx.isString(o['key'])) { return false; }
  if (!anx.isString(o['repositoryId'])) { return false; }
  return true;
}

describe('whereis', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
    await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
    await copyAddAnxCommit(allTestFiles, repositoryPath, 'add test files for whereis');
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
  });

  test('locates annexed files', async () => {
    const rslt = await myAnx.whereis(undefined, { '--format': '${file}\\t${bytesize}\\t${key}\\t${uuid}\\n' });  // eslint-disable-line no-template-curly-in-string
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(TestFile.JPG1);
    expect(rslt.out).toContain(TestFile.JPG2);
    expect(rslt.out).toContain(TestFile.JPG3);
  });

  const columns: [string, anx.Parser?][] = [
    ['relativePath'],
    ['byteSize', anx.parseBigInt],
    ['key'],
    ['repositoryId'],
  ];

  const options: anx.WhereisOptions = {
    '--format': '${file}\\t${bytesize}\\t${key}\\t${uuid}\\n' // eslint-disable-line no-template-curly-in-string
  };

  const getTests: [[anx.WhereisOptions, string?], number][] = [
    [[options], 3],
    [[options, '\t'], 3],
    [[options, '\0'], 0],
  ];

  test.each(getTests)('getWhereis(%o)', async ([gitOptions, columnDelimiter], expected) => {
    const whereis = await anx.getWhereis(isFooWhereis, columns, repositoryPath, undefined, gitOptions, columnDelimiter);
    expect(whereis).toHaveLength(expected);
  });

});
