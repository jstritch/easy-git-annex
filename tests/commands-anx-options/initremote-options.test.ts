import * as anx from '../../src/index';

describe('InitremoteOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.InitremoteOptions, string[]][] = [
    [{ '--private': null }, ['--private']],
    [{ '--sameas': 'A' }, ['--sameas=A']],
    [{ '--whatelse': null }, ['--whatelse']],
  ];

  test.each(tests)('InitremoteOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.initremote('', '', undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
