import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

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

  test('sets and gets the wanted expression', async () => {
    const expression = 'include=*.mp3 or include=*.ogg';
    let rslt = await myAnx.wanted('here', expression);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.wanted('here');
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(expression);
  });

});
