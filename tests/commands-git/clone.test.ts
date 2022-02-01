import * as anx from '../../src/index';
import { createDirectory, deleteDirectory } from '../helpers';

const cloneSource = 'https://github.com/jstritch/easy-git-annex.git';
const nonexistentSource = 'nonexistent.git';

const cloneTimeout = 30 * 1000; // milliseconds

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

  test('clones a git repository with all defaults', async () => {
    const result = await myAnx.clone(cloneSource);

    expect(result.exitCode).toBe(0);

    const remoteNames = await myAnx.getRemoteNames();

    expect(remoteNames).toHaveLength(1);
    expect(remoteNames).toContain('origin');
  }, cloneTimeout);

  test('clones to specified directory with --origin', async () => {
    const remoteName = 'github';
    const result = await myAnx.clone(cloneSource, repositoryPath, { '--origin': remoteName });

    expect(result.exitCode).toBe(0);

    const remoteNames = await myAnx.getRemoteNames();

    expect(remoteNames).toHaveLength(1);
    expect(remoteNames).toContain(remoteName);
  }, cloneTimeout);

  test('reports a bad url', async () => {
    const result = await myAnx.clone(nonexistentSource, repositoryPath, { '--progress': null });

    expect(result.exitCode).not.toBe(0);
    expect(result.err).toContain(nonexistentSource);
  }, cloneTimeout);

});
