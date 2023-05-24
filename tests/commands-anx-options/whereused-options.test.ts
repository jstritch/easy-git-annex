import * as anx from '../../src/index.ts';

describe('WhereusedOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.WhereusedOptions, string[]][] = [
    [{ '--historical': null }, ['--historical']],
    [{ '--key': 'A' }, ['--key=A']],
    [{ '--unused': null }, ['--unused']],
  ];

  test.each(tests)('WhereusedOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.whereused(anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
