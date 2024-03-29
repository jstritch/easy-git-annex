import * as anx from '../../src/index.ts';

describe('GetOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.GetOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--auto': null }, ['--auto']],
    [{ '--branch': 'ref' }, ['--branch=ref']],
    [{ '--failed': null }, ['--failed']],
    [{ '--from': 'A' }, ['--from=A']],
    [{ '--incomplete': null }, ['--incomplete']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ '--json-progress': null }, ['--json-progress']],
    [{ '--key': 'A' }, ['--key=A']],
    [{ '--unused': null }, ['--unused']],
    [{ matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }, ['--include=*.mp3', '--or', '--include=*.ogg']],
  ];

  test.each(tests)('GetOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.get(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
