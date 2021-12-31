import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('wanted', () => {
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

  test('correctly sets and gets the wanted expression', async () => {
    const expression = 'include=*.mp3 or include=*.ogg';
    const result = await myAnx.wanted('here', expression);

    expect(result.exitCode).toBe(0);

    const getResult = await myAnx.wanted('here');

    expect(getResult.exitCode).toBe(0);
    expect(getResult.out).toEqual(expect.stringContaining(expression));
  });

});
