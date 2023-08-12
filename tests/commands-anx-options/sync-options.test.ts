import * as anx from '../../src/index.ts';

describe('SyncOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.SyncOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--allow-unrelated-histories': null }, ['--allow-unrelated-histories']],
    [{ '--backend': 'A' }, ['--backend=A']],
    [{ '--cleanup': null }, ['--cleanup']],
    [{ '--commit': null }, ['--commit']],
    [{ '--content': null }, ['--content']],
    [{ '--content-of': 'A' }, ['--content-of=A']],
    [{ '--content-of': ['A', 'B'] }, ['--content-of=A', '--content-of=B']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--message': 'A' }, ['--message=A']],
    [{ '--no-allow-unrelated-histories': null }, ['--no-allow-unrelated-histories']],
    [{ '--no-commit': null }, ['--no-commit']],
    [{ '--no-content': null }, ['--no-content']],
    [{ '--no-pull': null }, ['--no-pull']],
    [{ '--no-push': null }, ['--no-push']],
    [{ '--no-resolvemerge': null }, ['--no-resolvemerge']],
    [{ '--not-only-annex': null }, ['--not-only-annex']],
    [{ '--only-annex': null }, ['--only-annex']],
    [{ '--pull': null }, ['--pull']],
    [{ '--push': null }, ['--push']],
    [{ '--resolvemerge': null }, ['--resolvemerge']],
  ];

  test.each(tests)('SyncOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.sync(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
