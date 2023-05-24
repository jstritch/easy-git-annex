import * as anx from '../../src/index.ts';

describe('MergeAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.MergeAnxOptions, string[]][] = [
    [{ '--allow-unrelated-histories': null }, ['--allow-unrelated-histories']],
    [{ '--no-allow-unrelated-histories': null }, ['--no-allow-unrelated-histories']],
  ];

  test.each(tests)('MergeAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.mergeAnx(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
