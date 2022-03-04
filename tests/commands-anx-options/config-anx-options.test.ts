import * as anx from '../../src/index';

describe('ConfigAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ConfigAnxOptions, string[]][] = [
    [{ '--get': 'A' }, ['--get=A']],
    [{ '--set': ['A', 'B'] }, ['--set', 'A', 'B']],
    [{ '--unset': 'A' }, ['--unset=A']],
  ];

  test.each(tests)('ConfigAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.configAnx(anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
