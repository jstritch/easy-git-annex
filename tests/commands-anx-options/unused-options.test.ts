import * as anx from '../../src/index.ts';

describe('UnusedOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.UnusedOptions, string[]][] = [
    [{ '--from': 'A' }, ['--from=A']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ '--used-refspec': 'A' }, ['--used-refspec=A']],
  ];

  test.each(tests)('UnusedOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.unused(anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
