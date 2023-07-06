import * as anx from '../../src/index.ts';

describe('PullAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.PullAnxOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--allow-unrelated-histories': null }, ['--allow-unrelated-histories']],
    [{ '--backend': 'A' }, ['--backend=A']],
    [{ '--content': null }, ['--content']],
    [{ '--content-of': 'A' }, ['--content-of=A']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--no-allow-unrelated-histories': null }, ['--no-allow-unrelated-histories']],
    [{ '--no-content': null }, ['--no-content']],
    [{ '--no-resolvemerge': null }, ['--no-resolvemerge']],
    [{ '--not-only-annex': null }, ['--not-only-annex']],
    [{ '--only-annex': null }, ['--only-annex']],
    [{ '--resolvemerge': null }, ['--resolvemerge']],
  ];

  test.each(tests)('PullAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.pullAnx(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
