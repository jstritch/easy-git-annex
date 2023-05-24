import * as anx from '../../src/index.ts';

describe('AdjustOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.AdjustOptions, string[]][] = [
    [{ '--fix': null }, ['--fix']],
    [{ '--hide-missing': null }, ['--hide-missing']],
    [{ '--lock': null }, ['--lock']],
    [{ '--unlock': null }, ['--unlock']],
    [{ '--unlock-present': null }, ['--unlock-present']],
  ];

  test.each(tests)('AdjustOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.adjust(anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
