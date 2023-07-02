import * as anx from '../../src/index.ts';

describe('ForgetOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ForgetOptions, string[]][] = [
    [{ '--drop-dead': null }, ['--drop-dead']],
  ];

  test.each(tests)('ForgetOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.forget(anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
