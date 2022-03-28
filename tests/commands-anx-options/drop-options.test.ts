import * as anx from '../../src/index';

describe('DropOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.DropOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--auto': null }, ['--auto']],
    [{ '--branch': 'ref' }, ['--branch=ref']],
    [{ '--from': 'A' }, ['--from=A']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ '--key': 'A' }, ['--key=A']],
    [{ '--unused': null }, ['--unused']],
    [{ matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }, ['--include=*.mp3', '--or', '--include=*.ogg']],
  ];

  test.each(tests)('DropOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.drop(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
