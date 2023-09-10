import * as anx from '../../src/index.ts';

describe('OldkeysOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.OldkeysOptions, string[]][] = [
    [{ '--revision-range': 'v1.0..HEAD' }, ['--revision-range=v1.0..HEAD']],
    [{ '--unchecked': null }, ['--unchecked']],
  ];

  test.each(tests)('OldkeysOptions "%o"', async (anxOptions, expected) => {
    const rslt = await myAnx.oldkeys(undefined, anxOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
