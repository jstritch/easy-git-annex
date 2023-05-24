import * as anx from '../../src/index.ts';
import * as path from 'node:path';
import { createRepository, deleteDirectory } from '../helpers.ts';

describe('revParse', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterAll(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('merges from a branch', async () => {
    const rslt = await myAnx.revParse(undefined, { '--show-toplevel': null });
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(path.basename(repositoryPath));
  });

});

describe('RevParseOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.RevParseOptions, string[]][] = [
    [{ '--abbrev-ref': null }, ['--abbrev-ref']],
    [{ '--abbrev-ref': 'A' }, ['--abbrev-ref=A']],
    [{ '--absolute-git-dir': null }, ['--absolute-git-dir']],
    [{ '--all': null }, ['--all']],
    [{ '--default': 'A' }, ['--default', 'A']],
    [{ '--disambiguate': 'A' }, ['--disambiguate=A']],
    [{ '--exclude': 'A' }, ['--exclude=A']],
    [{ '--exclude': ['A', 'B'] }, ['--exclude=A', '--exclude=B']],
    [{ '--flags': null }, ['--flags']],
    [{ '--git-common-dir': null }, ['--git-common-dir']],
    [{ '--git-dir': null }, ['--git-dir']],
    [{ '--git-path': 'A' }, ['--git-path', 'A']],
    [{ '--glob': 'A' }, ['--glob=A']],
    [{ '--is-bare-repository': null }, ['--is-bare-repository']],
    [{ '--is-inside-git-dir': null }, ['--is-inside-git-dir']],
    [{ '--is-inside-work-tree': null }, ['--is-inside-work-tree']],
    [{ '--is-shallow-repository': null }, ['--is-shallow-repository']],
    [{ '--local-env-vars': null }, ['--local-env-vars']],
    [{ '--no-flags': null }, ['--no-flags']],
    [{ '--no-revs': null }, ['--no-revs']],
    [{ '--not': null }, ['--not']],
    [{ '--path-format': 'A' }, ['--path-format=A']],
    [{ '--prefix': 'A' }, ['--prefix', 'A']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--resolve-git-dir': 'A' }, ['--resolve-git-dir', 'A']],
    [{ '--revs-only': null }, ['--revs-only']],
    [{ '--shared-index-path': null }, ['--shared-index-path']],
    [{ '--short': null }, ['--short']],
    [{ '--short': 7 }, ['--short=7']],
    [{ '--short': '4' }, ['--short=4']],
    [{ '--show-cdup': null }, ['--show-cdup']],
    [{ '--show-object-format': null }, ['--show-object-format']],
    [{ '--show-object-format': 'A' }, ['--show-object-format=A']],
    [{ '--show-prefix': null }, ['--show-prefix']],
    [{ '--show-superproject-working-tree': null }, ['--show-superproject-working-tree']],
    [{ '--show-toplevel': null }, ['--show-toplevel']],
    [{ '--symbolic': null }, ['--symbolic']],
    [{ '--symbolic-full-name': null }, ['--symbolic-full-name']],
    [{ '--verify': null }, ['--verify']],
  ];

  test.each(tests)('RevParseOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.revParse(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });

});
