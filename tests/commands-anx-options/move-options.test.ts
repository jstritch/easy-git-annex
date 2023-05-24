import * as anx from '../../src/index.ts';

describe('MoveOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.MoveOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--branch': 'ref' }, ['--branch=ref']],
    [{ '--failed': null }, ['--failed']],
    [{ '--from': 'A' }, ['--from=A']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ '--json-progress': null }, ['--json-progress']],
    [{ '--key': 'A' }, ['--key=A']],
    [{ '--to': 'A' }, ['--to=A']],
    [{ '--unused': null }, ['--unused']],
    [{ matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }, ['--include=*.mp3', '--or', '--include=*.ogg']],
  ];

  test.each(tests)('MoveOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.move(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
