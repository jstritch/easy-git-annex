import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('mincopies', () => {
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
    let rslt = await myAnx.mincopies();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('global mincopies is not set');

    rslt = await myAnx.mincopies('1');
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('mincopies 1 ok');

    rslt = await myAnx.mincopies();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain('1');
  });

});
