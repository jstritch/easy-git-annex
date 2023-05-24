import * as anx from '../../src/index.ts';

describe('InitAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.InitAnxOptions, string[]][] = [
    [{ '--autoenable': null }, ['--autoenable']],
    [{ '--no-autoenable': null }, ['--no-autoenable']],
    [{ '--version': 8 }, ['--version=8']],
    [{ '--version': '9' }, ['--version=9']],
  ];

  test.each(tests)('InitAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.initAnx(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
