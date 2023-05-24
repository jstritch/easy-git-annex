import * as anx from '../../src/index.ts';

describe('StatusAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.StatusAnxOptions, string[]][] = [
    [{ '--ignore-submodules': null }, ['--ignore-submodules']],
    [{ '--ignore-submodules': 'none' }, ['--ignore-submodules=none']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
  ];

  test.each(tests)('StatusAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.statusAnx(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
