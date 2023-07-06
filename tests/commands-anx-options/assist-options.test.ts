import * as anx from '../../src/index.ts';

describe('AssistOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.AssistOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--allow-unrelated-histories': null }, ['--allow-unrelated-histories']],
    [{ '--backend': 'A' }, ['--backend=A']],
    [{ '--cleanup': null }, ['--cleanup']],
    [{ '--content': null }, ['--content']],
    [{ '--content-of': 'A' }, ['--content-of=A']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--message': 'A' }, ['--message=A']],
    [{ '--no-allow-unrelated-histories': null }, ['--no-allow-unrelated-histories']],
    [{ '--no-content': null }, ['--no-content']],
    [{ '--no-resolvemerge': null }, ['--no-resolvemerge']],
    [{ '--not-only-annex': null }, ['--not-only-annex']],
    [{ '--only-annex': null }, ['--only-annex']],
    [{ '--resolvemerge': null }, ['--resolvemerge']],
  ];

  test.each(tests)('AssistOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.assist(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
