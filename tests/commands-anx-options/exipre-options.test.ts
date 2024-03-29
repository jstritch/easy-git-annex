import * as anx from '../../src/index.ts';

describe('ExipreOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.ExpireOptions, string[]][] = [
    [{ '--activity': 'Fsck' }, ['--activity=Fsck']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ '--no-act': null }, ['--no-act']],
  ];

  test.each(tests)('ExipreOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.expire('45d', anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
