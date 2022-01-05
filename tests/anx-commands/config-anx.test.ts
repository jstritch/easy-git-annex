import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('configAnx', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('correctly sets, gets, and unsets a value', async () => {
    const key = 'annex.largefiles';
    const value = 'include=*.m4a or include=*.jpg or include=*.itl or include=*.db';

    const result = await myAnx.configAnx({ '--set': [key, value] });

    expect(result.exitCode).toBe(0);

    const getResult = await myAnx.configAnx({ '--get': key });

    expect(getResult.exitCode).toBe(0);
    expect(getResult.out).toEqual(expect.stringContaining(value));

    const unsetResult = await myAnx.configAnx({ '--unset': key });

    expect(unsetResult.exitCode).toBe(0);

    const getResult2 = await myAnx.configAnx({ '--get': key });

    expect(getResult2.exitCode).toBe(0);
    expect(getResult2.out).toBe('');
  });

});
