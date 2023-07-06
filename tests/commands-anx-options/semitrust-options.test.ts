import * as anx from '../../src/index.ts';

describe('SemitrustOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.SemitrustOptions, string[]][] = [
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
  ];

  test.each(tests)('SemitrustOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.semitrust('here', anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
