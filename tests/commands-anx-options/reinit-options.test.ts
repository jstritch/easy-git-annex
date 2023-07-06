import * as anx from '../../src/index.ts';

describe('ReinitOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ReinitOptions, string[]][] = [
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
  ];

  test.each(tests)('ReinitOptions "%o"', async (anxOptions, expected) => {
    const uuid = 'cb405bae-1b52-11ee-b0e9-bb09c2d2a6bb';
    const rslt = await myAnx.reinit(uuid, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
