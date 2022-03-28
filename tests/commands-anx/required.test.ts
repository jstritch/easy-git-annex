import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('required', () => {
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

  test('sets and gets the required expression', async () => {
    const expression = 'include=*.mp3 or include=*.ogg';
    let rslt = await myAnx.required('here', expression);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.required('here');
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(expression);
  });

});
