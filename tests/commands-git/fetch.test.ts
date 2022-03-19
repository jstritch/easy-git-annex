import * as anx from '../../src/index';
import { createRepository, deleteDirectory } from '../helpers';

describe('fetch', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('fetches', async () => {
    const rslt = await myAnx.fetch();
    expect(rslt.exitCode).toBe(0);
  });

});

describe('FetchOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.FetchOptions, string[]][] = [
    // FetchCommonOptions
    [{ '--all': null }, ['--all']],
    [{ '--append': null }, ['--append']],
    [{ '--atomic': null }, ['--atomic']],
    [{ '--depth': 3 }, ['--depth=3']],
    [{ '--depth': '7' }, ['--depth=7']],
    [{ '--deepen': 3 }, ['--deepen=3']],
    [{ '--deepen': '7' }, ['--deepen=7']],
    [{ '--force': null }, ['--force']],
    [{ '--ipv4': null }, ['--ipv4']],
    [{ '--ipv6': null }, ['--ipv6']],
    [{ '--jobs': '7' }, ['--jobs=7']],
    [{ '--jobs': 3 }, ['--jobs=3']],
    [{ '--keep': null }, ['--keep']],
    [{ '--negotiate-only': null }, ['--negotiate-only']],
    [{ '--negotiation-tip': 'A' }, ['--negotiation-tip=A']],
    [{ '--negotiation-tip': ['A', 'B'] }, ['--negotiation-tip=A', '--negotiation-tip=B']],
    [{ '--no-show-forced-updates': null }, ['--no-show-forced-updates']],
    [{ '--no-tags': null }, ['--no-tags']],
    [{ '--prefetch': null }, ['--prefetch']],
    [{ '--progress': null }, ['--progress']],
    [{ '--prune': null }, ['--prune']],
    [{ '--refmap': 'A' }, ['--refmap=A']],
    [{ '--refmap': ['A', 'B'] }, ['--refmap=A', '--refmap=B']],
    [{ '--server-option': 'A' }, ['--server-option=A']],
    [{ '--server-option': ['A', 'B'] }, ['--server-option=A', '--server-option=B']],
    [{ '--set-upstream': null }, ['--set-upstream']],
    [{ '--shallow-exclude': 'A' }, ['--shallow-exclude=A']],
    [{ '--shallow-exclude': ['A', 'B'] }, ['--shallow-exclude=A', '--shallow-exclude=B']],
    [{ '--shallow-since': new Date('2022-03-10T00:00:00.000Z') }, ['--shallow-since=2022-03-10T00:00:00Z']],
    [{ '--shallow-since': '3 years' }, ['--shallow-since=3 years']],
    [{ '--show-forced-updates': null }, ['--show-forced-updates']],
    [{ '--tags': null }, ['--tags']],
    [{ '--unshallow': null }, ['--unshallow']],
    [{ '--update-shallow': null }, ['--update-shallow']],
    // FetchOptions
    [{ '--multiple': null }, ['--multiple']],
    [{ '--no-recurse-submodules': null }, ['--no-recurse-submodules']],
    [{ '--no-write-commit-graph': null }, ['--no-write-commit-graph']],
    [{ '--prune-tags': null }, ['--prune-tags']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--recurse-submodules': null }, ['--recurse-submodules']],
    [{ '--recurse-submodules': 'yes' }, ['--recurse-submodules=yes']],
    [{ '--recurse-submodules-default': 'yes' }, ['--recurse-submodules-default=yes']],
    [{ '--submodule-prefix': 'A' }, ['--submodule-prefix=A']],
    [{ '--update-head-ok': null }, ['--update-head-ok']],
    [{ '--verbose': null }, ['--verbose']],
    [{ '--write-commit-graph': null }, ['--write-commit-graph']],
  ];

  test.each(tests)('FetchOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.fetch(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
