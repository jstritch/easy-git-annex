import * as anx from '../../src/index';
import { createDirectory, deleteDirectory } from '../helpers';

const cloneSource = 'https://github.com/jstritch/easy-git-annex.git';

describe('clone', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createDirectory();
    myAnx = anx.createAccessor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('clone to specified directory with --origin', async () => {
    const remoteName = 'github';
    const rslt = await myAnx.clone(cloneSource, repositoryPath, { '--origin': remoteName });
    expect(rslt.exitCode).toBe(0);

    const remoteNames = await myAnx.getRemoteNames();
    expect(remoteNames).toHaveLength(1);
    expect(remoteNames).toContain(remoteName);
  });

});

describe('CloneOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.CloneOptions, string[]][] = [
    [{ '--bare': null }, ['--bare']],
    [{ '--branch': 'github' }, ['--branch', 'github']],
    [{ '--config': ['name', 'value'] }, ['--config', 'name=value']],
    [{ '--config': [['name0', 'value0'], ['name1', 'value1']] }, ['--config', 'name0=value0,name1=value1']],
    [{ '--depth': 3 }, ['--depth=3']],
    [{ '--depth': '7' }, ['--depth=7']],
    [{ '--dissociate': null }, ['--dissociate']],
    [{ '--filter': 'blob:none' }, ['--filter=blob:none']],
    [{ '--jobs': 3 }, ['--jobs', '3']],
    [{ '--jobs': '7' }, ['--jobs', '7']],
    [{ '--local': null }, ['--local']],
    [{ '--mirror': null }, ['--mirror']],
    [{ '--no-checkout': null }, ['--no-checkout']],
    [{ '--no-hardlinks': null }, ['--no-hardlinks']],
    [{ '--no-reject-shallow': null }, ['--no-reject-shallow']],
    [{ '--no-remote-submodules': null }, ['--no-remote-submodules']],
    [{ '--no-shallow-submodules': null }, ['--no-shallow-submodules']],
    [{ '--no-single-branch': null }, ['--no-single-branch']],
    [{ '--no-tags': null }, ['--no-tags']],
    [{ '--origin': 'github' }, ['--origin', 'github']],
    [{ '--progress': null }, ['--progress']],
    [{ '--quiet': null }, ['--quiet']],
    [{ '--recurse-submodules': '/tmp' }, ['--recurse-submodules=/tmp']],
    [{ '--recurse-submodules': ['/tmp', '/etc'] }, ['--recurse-submodules=/tmp', '--recurse-submodules=/etc']],
    [{ '--reference': '/tmp' }, ['--reference', '/tmp']],
    [{ '--reference-if-able': '/tmp' }, ['--reference-if-able', '/tmp']],
    [{ '--reject-shallow': null }, ['--reject-shallow']],
    [{ '--remote-submodules': null }, ['--remote-submodules']],
    [{ '--separate-git-dir': '/tmp' }, ['--separate-git-dir=/tmp']],
    [{ '--server-option': ['A', 'B'] }, ['--server-option=A', '--server-option=B']],
    [{ '--shallow-exclude': ['A', 'B'] }, ['--shallow-exclude=A', '--shallow-exclude=B']],
    [{ '--shallow-since': '3 years' }, ['--shallow-since=3 years']],
    [{ '--shallow-submodules': null }, ['--shallow-submodules']],
    [{ '--shared': null }, ['--shared']],
    [{ '--single-branch': null }, ['--single-branch']],
    [{ '--sparse': null }, ['--sparse']],
    [{ '--template': '/tmp' }, ['--template=/tmp']],
    [{ '--upload-pack': '/tmp' }, ['--upload-pack', '/tmp']],
    [{ '--verbose': null }, ['--verbose']],
  ];

  test.each(tests)('CloneOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.clone('', undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
