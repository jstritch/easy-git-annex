import * as anx from '../../src/index.ts';

describe('ImportOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ImportOptions, string[]][] = [
    [{ '--backend': 'A' }, ['--backend=A']],
    [{ '--content': null }, ['--content']],
    [{ '--from': 'remote' }, ['--from', 'remote']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ '--json-progress': null }, ['--json-progress']],
    [{ '--no-check-gitignore': null }, ['--no-check-gitignore']],
    [{ '--no-content': null }, ['--no-content']],
  ];

  test.each(tests)('ImportOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.import('master', anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
