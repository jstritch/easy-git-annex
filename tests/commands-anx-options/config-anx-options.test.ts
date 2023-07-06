import * as anx from '../../src/index.ts';

describe('ConfigAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ConfigAnxOptions, string[]][] = [
    [{ '--for-file': 'A' }, ['--for-file', 'A']],
    [{ '--get': 'A' }, ['--get=A']],
    [{ '--set': ['A', 'B'] }, ['--set', 'A', 'B']],
    [{ '--show-origin': 'A' }, ['--show-origin', 'A']],
    [{ '--unset': 'A' }, ['--unset=A']],
  ];

  test.each(tests)('ConfigAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.configAnx(anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
