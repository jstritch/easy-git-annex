import * as anx from '../../src/index';
import * as path from 'path';
import { createDirectory, deleteDirectory } from '../helpers';

const cloneSource = 'https://github.com/jstritch/easy-git-annex.git';
const nonexistentSource = 'https://github.com/jstritch/nonexistent.git';

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

  test('correctly clones a git repository with all defaults', async () => {
    const result = await myAnx.clone(cloneSource);

    expect(result.exitCode).toBe(0);
    expect(result.err).toEqual(expect.stringContaining('Cloning into \'easy-git-annex\''));
    expect(result.out).toBe('');

    const clonedAnx = anx.createAccessor(path.join(repositoryPath, 'easy-git-annex'));
    const remoteResult = await clonedAnx.remote();

    expect(remoteResult.exitCode).toBe(0);
    expect(remoteResult.out).toEqual(expect.stringContaining('origin'));
  }, cloneTimeout);

  test('correctly clones a git repository with --origin', async () => {
    const remoteName = 'github';
    const result = await myAnx.clone(cloneSource, repositoryPath, { '--origin': remoteName });

    expect(result.exitCode).toBe(0);
    expect(result.err).toEqual(expect.stringContaining(`Cloning into '${repositoryPath}'`));
    expect(result.out).toBe('');

    const remoteResult = await myAnx.remote();

    expect(remoteResult.exitCode).toBe(0);
    expect(remoteResult.out).toEqual(expect.stringContaining(remoteName));
  }, cloneTimeout);

  test('correctly reports a bad url', async () => {
    const result = await myAnx.clone(nonexistentSource, repositoryPath, { '--progress': null });

    expect(result.exitCode).not.toBe(0);
    expect(result.err).toEqual(expect.stringMatching(`.*repository.*${nonexistentSource}.*not found.*`));
    expect(result.out).toBe('');
  }, cloneTimeout);

});
