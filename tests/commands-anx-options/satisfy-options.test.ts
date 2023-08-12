import * as anx from '../../src/index.ts';

describe('SatisfyOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.SatisfyOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--content-of': 'A' }, ['--content-of=A']],
    [{ '--content-of': ['A', 'B'] }, ['--content-of=A', '--content-of=B']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
  ];

  test.each(tests)('SatisfyOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.satisfy(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
