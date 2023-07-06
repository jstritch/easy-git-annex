import * as anx from '../../src/index.ts';

describe('AddunusedOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.AddunusedOptions, string[]][] = [
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
  ];

  test.each(tests)('AddunusedOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.addunused('all', anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
