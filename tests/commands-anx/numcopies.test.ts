import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('numcopies', () => {
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

  test('gets and sets the value', async () => {
    let rslt = await myAnx.numcopies();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('global numcopies is not set');

    rslt = await myAnx.numcopies(2);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('numcopies 2 ok');

    rslt = await myAnx.numcopies();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toBe('2\n');
  });

});
