import * as anx from '../../src/index.ts';

describe('ExportOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ExportOptions, string[]][] = [
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ '--json-progress': null }, ['--json-progress']],
    [{ '--to': 'remote' }, ['--to', 'remote']],
  ];

  test.each(tests)('ExportOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.export('master', anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
