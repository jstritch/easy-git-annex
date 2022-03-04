import * as anx from '../../src/index';

describe('UnlockOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.UnlockOptions, string[]][] = [
    [{ '--json': null }, ['--json']],
    [{ '--json-error-messages': null }, ['--json-error-messages']],
    [{ matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }, ['--include=*.mp3', '--or', '--include=*.ogg']],
  ];

  test.each(tests)('UnlockOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.unlock(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
