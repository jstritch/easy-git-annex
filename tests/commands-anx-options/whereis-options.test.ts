import * as anx from '../../src/index.ts';

describe('WhereisOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.WhereisOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--branch': 'ref' }, ['--branch=ref']],
    [{ '--format': '${file}\\t${bytesize}\\t${key}\\t${uuid}\\n' }, ['--format=${file}\\t${bytesize}\\t${key}\\t${uuid}\\n']],  // eslint-disable-line no-template-curly-in-string
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ '--key': 'A' }, ['--key=A']],
    [{ '--unused': null }, ['--unused']],
    [{ matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }, ['--include=*.mp3', '--or', '--include=*.ogg']],
  ];

  test.each(tests)('WhereisOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.whereis(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
