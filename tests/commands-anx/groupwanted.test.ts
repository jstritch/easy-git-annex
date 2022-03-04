import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('groupwanted', () => {
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

  test('sets the groupwanted expression', async () => {
    const groupname = 'redundantarchive';
    const expression = 'not (copies=redundantarchive:3)';
    let rslt = await myAnx.groupwanted(groupname, expression);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.groupwanted(groupname);
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(expression);
  });

});
