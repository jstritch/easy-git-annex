import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('remote', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;
  let remotePath: string;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    remotePath = await createRepository();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
    await deleteDirectory(remotePath);
  });

  test('adds a remote', async () => {
    const remoteName = 'fountainhead';
    let rslt = await myAnx.remote(anx.RemoteCommand.Add, [remoteName, remotePath]);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.remote(anx.RemoteCommand.Show, undefined, { '--verbose': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(remoteName);
    expect(rslt.out).toContain(remotePath);
  });

});

describe('RemoteOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.RemoteOptions, string[]][] = [
    [{ '--verbose': null }, ['--verbose']],
  ];

  test.each(tests)('RemoteOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.remote(undefined, undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
