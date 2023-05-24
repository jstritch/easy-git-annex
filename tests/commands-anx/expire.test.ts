import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory } from '../helpers.ts';

describe('expire', () => {
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

  test('sets default exipration', async () => {
    const rslt = await myAnx.expire('45d');
    expect(rslt.exitCode).toBe(0);
  });

});
