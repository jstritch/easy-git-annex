import * as anx from '../../src/index';

describe('VersionAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.VersionAnxOptions, string[]][] = [
    [{ '--raw': null }, ['--raw']],
  ];

  test.each(tests)('VersionAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.versionAnx(anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
