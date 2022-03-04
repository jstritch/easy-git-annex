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

  test('sets, gets, and unsets a value', async () => {
    const key = 'annex.largefiles';
    const value = 'include=*.m4a or include=*.jpg or include=*.itl or include=*.db';

    let rslt = await myAnx.configAnx({ '--set': [key, value] });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.configAnx({ '--get': key });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(value);

    rslt = await myAnx.configAnx({ '--unset': key });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.configAnx({ '--get': key });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toBe('');
  });

});
