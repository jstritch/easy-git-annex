import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('push', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('reports no remote configured', async () => {
    const rslt = await myAnx.push();
    expect(rslt.exitCode).not.toBe(0);
    expect(rslt.err).toContain('No configured push destination');
  });

});

describe('PushOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.PushOptions, string[]][] = [
    [{ '--all': null }, ['--all']],
    [{ '--atomic': null }, ['--atomic']],
    [{ '--delete': null }, ['--delete']],
    [{ '--follow-tags': null }, ['--follow-tags']],
    [{ '--force': null }, ['--force']],
    [{ '--force-if-includes': null }, ['--force-if-includes']],
    [{ '--force-with-lease': null }, ['--force-with-lease']],
    [{ '--force-with-lease': 'A' }, ['--force-with-lease=A']],
    [{ '--ipv4': null }, ['--ipv4']],
    [{ '--ipv6': null }, ['--ipv6']],
    [{ '--mirror': null }, ['--mirror']],
    [{ '--no-atomic': null }, ['--no-atomic']],
    [{ '--no-force-if-includes': null }, ['--no-force-if-includes']],
    [{ '--no-force-with-lease': null }, ['--no-force-with-lease']],
    [{ '--no-recurse-submodules': null }, ['--no-recurse-submodules']],
    [{ '--no-signed': null }, ['--no-signed']],
    [{ '--no-thin': null }, ['--no-thin']],
    [{ '--no-verify': null }, ['--no-verify']],
    [{ '--progress': null }, ['--progress']],
    [{ '--porcelain': null }, ['--porcelain']],
    [{ '--prune': null }, ['--prune']],
    [{ '--push-option': 'A' }, ['--push-option=A']],
    [{ '--push-option': ['A', 'B'] }, ['--push-option=A', '--push-option=B']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--recurse-submodules': 'check' }, ['--recurse-submodules=check']],
    [{ '--repo': 'A' }, ['--repo=A']],
    [{ '--set-upstream': null }, ['--set-upstream']],
    [{ '--signed': null }, ['--signed']],
    [{ '--signed': 'true' }, ['--signed=true']],
    [{ '--tags': null }, ['--tags']],
    [{ '--thin': null }, ['--thin']],
    [{ '--verbose': null }, ['--verbose']],
    [{ '--verify': null }, ['--verify']],
  ];

  test.each(tests)('PushOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.push(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
