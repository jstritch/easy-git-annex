import * as anx from '../../src/index.ts';
import { createRepository, deleteDirectory, setRepositoryAuthor } from '../helpers.ts';

const submoduleSource = 'https://github.com/jstritch/easy-git-annex.git';

describe('submodule', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeEach(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('adds a submodule', async () => {
    const rslt = await myAnx.submodule(anx.SubmoduleCommand.Add, undefined, submoduleSource);
    expect(rslt.exitCode).toBe(0);
  });

});

describe('SubmoduleOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [[anx.SubmoduleCommand?, (string | string[])?, string?, anx.SubmoduleOptions?], string[]][] = [
    [[], ['submodule']],
    [[, , , { '--quiet': null }], ['submodule', '--quiet']],
    [[, , , { '--all': null }], ['submodule', '--all']],
    [[, , , { '--branch': 'A' }], ['submodule', '--branch', 'A']],
    [[, , , { '--cached': null }], ['submodule', '--cached']],
    [[, , , { '--checkout': null }], ['submodule', '--checkout']],
    [[, , , { '--default': null }], ['submodule', '--default']],
    [[, , , { '--depth': 2 }], ['submodule', '--depth', '2']],
    [[, , , { '--depth': '3' }], ['submodule', '--depth', '3']],
    [[, , , { '--dissociate': null }], ['submodule', '--dissociate']],
    [[, , , { '--files': null }], ['submodule', '--files']],
    [[, , , { '--filter': 'A' }], ['submodule', '--filter', 'A']],
    [[, , , { '--force': null }], ['submodule', '--force']],
    [[, , , { '--init': null }], ['submodule', '--init']],
    [[, , , { '--jobs': 2 }], ['submodule', '--jobs', '2']],
    [[, , , { '--jobs': '3' }], ['submodule', '--jobs', '3']],
    [[, , , { '--merge': null }], ['submodule', '--merge']],
    [[, , , { '--name': 'A' }], ['submodule', '--name', 'A']],
    [[, , , { '--no-fetch': null }], ['submodule', '--no-fetch']],
    [[, , , { '--no-recommend-shallow': null }], ['submodule', '--no-recommend-shallow']],
    [[, , , { '--no-single-branch': null }], ['submodule', '--no-single-branch']],
    [[, , , { '--progress': null }], ['submodule', '--progress']],
    [[, , , { '--rebase': null }], ['submodule', '--rebase']],
    [[, , , { '--recursive': null }], ['submodule', '--recursive']],
    [[, , , { '--recommend-shallow': null }], ['submodule', '--recommend-shallow']],
    [[, , , { '--reference': 'A' }], ['submodule', '--reference', 'A']],
    [[, , , { '--remote': null }], ['submodule', '--remote']],
    [[, , , { '--single-branch': null }], ['submodule', '--single-branch']],
    [[, , , { '--summary-limit': 2 }], ['submodule', '--summary-limit', '2']],
    [[, , , { '--summary-limit': '3' }], ['submodule', '--summary-limit', '3']],
    [[anx.SubmoduleCommand.Add, 'path', 'repository', { '--force': null, '--quiet': null }], ['submodule', '--quiet', 'add', '--force', '--', 'repository', 'path']],
    [[anx.SubmoduleCommand.Add, 'path', 'repository', { '--force': null }], ['submodule', 'add', '--force', '--', 'repository', 'path']],
    [[anx.SubmoduleCommand.Add, , 'repository', { '--force': null }], ['submodule', 'add', '--force', 'repository']],
    [[anx.SubmoduleCommand.Status, 'path', , { '--recursive': null }], ['submodule', 'status', '--recursive', '--', 'path']],
    [[anx.SubmoduleCommand.Init, 'path'], ['submodule', 'init', '--', 'path']],
    [[anx.SubmoduleCommand.Deinit, 'path', , { '--force': null }], ['submodule', 'deinit', '--force', '--', 'path']],
    [[anx.SubmoduleCommand.Update, 'path', , { '--force': null }], ['submodule', 'update', '--force', '--', 'path']],
    [[anx.SubmoduleCommand.SetBranch, 'path', , { '--default': null }], ['submodule', 'set-branch', '--default', '--', 'path']],
    [[anx.SubmoduleCommand.SetUrl, 'path', 'newurl'], ['submodule', 'set-url', '--', 'path', 'newurl']],
    [[anx.SubmoduleCommand.Summary, 'path', 'commit', { '--files': null }], ['submodule', 'summary', '--files', 'commit', '--', 'path']],
    [[anx.SubmoduleCommand.Summary, , 'commit', { '--files': null }], ['submodule', 'summary', '--files', 'commit']],
    [[anx.SubmoduleCommand.ForEach, , 'command', { '--recursive': null }], ['submodule', 'foreach', '--recursive', 'command']],
    [[anx.SubmoduleCommand.Sync, 'path', , { '--recursive': null }], ['submodule', 'sync', '--recursive', '--', 'path']],
    [[anx.SubmoduleCommand.AbsorbGitDirs, 'path'], ['submodule', 'absorbgitdirs', '--', 'path']],
  ];

  test.each(tests)('SubmoduleOptions "%o"', async ([subCommand, relativePaths, commandParameter, gitOptions], expected) => {
    const rslt = await myAnx.submodule(subCommand, relativePaths, commandParameter, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expected);
  });
});
