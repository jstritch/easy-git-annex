import * as anx from '../../src/index.ts';

describe('FindOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.FindOptions, string[]][] = [
    [{ '--branch': 'ref' }, ['--branch=ref']],
    [{ '--format': '${file}\\t${bytesize}\\t${key}\\n' }, ['--format=${file}\\t${bytesize}\\t${key}\\n']],  // eslint-disable-line no-template-curly-in-string
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }, ['--include=*.mp3', '--or', '--include=*.ogg']],
  ];

  test.each(tests)('FindOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.find(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
