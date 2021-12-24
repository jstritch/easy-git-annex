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

  test('correctly sets the groupwanted expression', async () => {
    const groupname = 'redundantarchive';
    const expression = 'not (copies=redundantarchive:3)';
    const result = await myAnx.groupwanted(groupname, expression);

    expect(result).toHaveProperty('exitCode', 0);

    const getResult = await myAnx.groupwanted(groupname);

    expect(getResult).toMatchObject({ out: expect.stringContaining(expression) as unknown });
  });

});
