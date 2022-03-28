import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('whereused', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await myAnx.initAnx();
  });

  afterEach(async () => {
    await myAnx.uninit();
    await deleteDirectory(repositoryPath);
  });

  test('locates annexed files', async () => {
    const rslt = await myAnx.whereused({ '--unused': null });
    expect(rslt.exitCode).toBe(0);
  });

});
