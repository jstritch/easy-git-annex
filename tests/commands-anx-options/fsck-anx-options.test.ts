import * as anx from '../../src/index';

describe('FsckAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.FsckAnxOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--branch': 'ref' }, ['--branch=ref']],
    [{ '--from': 'remote-name' }, ['--from=remote-name']],
    [{ '--incremental': null }, ['--incremental']],
    [{ '--incremental-schedule': '7d' }, ['--incremental-schedule=7d']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--json': null }, ['--json']],
    [{ '--key': 'keyname' }, ['--key=keyname']],
    [{ '--more': null }, ['--more']],
    [{ '--unused': null }, ['--unused']],
    [{ matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }, ['--include=*.mp3', '--or', '--include=*.ogg']],
  ];

  test.each(tests)('FsckAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.fsckAnx(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
