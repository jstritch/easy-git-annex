import * as anx from '../../src/index.ts';

describe('DropunusedOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.DropunusedOptions, string[]][] = [
    [{ '--from': 'A' }, ['--from=A']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
  ];

  test.each(tests)('DropunusedOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.dropunused('all', anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
