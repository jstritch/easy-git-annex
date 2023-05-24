import * as anx from '../../src/index.ts';

describe('AnnexOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.AnnexOptions, string[]][] = [
    [{ '--c': ['A', 'B'] }, ['--c', 'A=B']],
    [{ '--c': [['A', 'B'], ['C', 'D']] }, ['--c', 'A=B', '--c', 'C=D']],
    [{ '--debug': null }, ['--debug']],
    [{ '--debugfilter': 'Process' }, ['--debugfilter=Process']],
    [{ '--debugfilter': ['Process', 'External'] }, ['--debugfilter=Process,External']],
    [{ '--fast': null }, ['--fast']],
    [{ '--force': null }, ['--force']],
    [{ '--mincopies': 2 }, ['--mincopies=2']],
    [{ '--mincopies': '1' }, ['--mincopies=1']],
    [{ '--no-debug': null }, ['--no-debug']],
    [{ '--numcopies': 2 }, ['--numcopies=2']],
    [{ '--numcopies': '1' }, ['--numcopies=1']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--size-limit': 'A' }, ['--size-limit=A']],
    [{ '--time-limit': 'A' }, ['--time-limit=A']],
    [{ '--verbose': null }, ['--verbose']],
  ];

  test.each(tests)('AnnexOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.versionAnx(anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
