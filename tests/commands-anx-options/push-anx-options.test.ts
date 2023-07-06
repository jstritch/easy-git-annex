import * as anx from '../../src/index.ts';

describe('PushAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.PushAnxOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--cleanup': null }, ['--cleanup']],
    [{ '--content': null }, ['--content']],
    [{ '--content-of': 'A' }, ['--content-of=A']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--no-content': null }, ['--no-content']],
    [{ '--not-only-annex': null }, ['--not-only-annex']],
    [{ '--only-annex': null }, ['--only-annex']],
  ];

  test.each(tests)('PushAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.pushAnx(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
