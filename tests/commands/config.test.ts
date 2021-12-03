import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('config', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.init();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('correctly sets, gets, and unsets a value', async () => {
    const key = 'annex.largefiles';
    const value = 'include=*.m4a or include=*.jpg or include=*.itl or include=*.db';

    const result = await myAnx.config({ '--set': [key, value] });

    expect(result).toHaveProperty('exitCode', 0);

    const getResult = await myAnx.config({ '--get': key });

    expect(getResult).toMatchObject({ out: expect.stringContaining(value) as unknown });

    const unsetResult = await myAnx.config({ '--unset': key });

    expect(unsetResult).toHaveProperty('exitCode', 0);

    const getResult2 = await myAnx.config({ '--get': key });

    expect(getResult2).toHaveProperty('out', '');
  });

});
