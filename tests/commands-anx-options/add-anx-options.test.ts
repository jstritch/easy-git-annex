import * as anx from '../../src/index.ts';

describe('AddAnxOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.AddAnxOptions, string[]][] = [
    [{ '--backend': 'A' }, ['--backend=A']],
    [{ '--dry-run': null }, ['--dry-run']],
    [{ '--force-large': null }, ['--force-large']],
    [{ '--force-small': null }, ['--force-small']],
    [{ '--jobs': 2 }, ['--jobs=2']],
    [{ '--jobs': '3' }, ['--jobs=3']],
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ '--json-progress': null }, ['--json-progress']],
    [{ '--no-check-gitignore': null }, ['--no-check-gitignore']],
    [{ '--update': null }, ['--update']],
    [{ matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }, ['--include=*.mp3', '--or', '--include=*.ogg']],
  ];

  test.each(tests)('AddAnxOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.addAnx(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
