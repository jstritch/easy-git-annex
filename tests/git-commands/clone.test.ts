import * as anx from '../../src/index';
import * as path from 'path';
import { createDirectory, deleteDirectory } from '../helpers';

const cloneSource = 'https://github.com/jstritch/git-annex-js.git';
const nonexistentSource = 'https://github.com/jstritch/nonexistent.git';

describe('init', () => {
  let repositoryPath: string;
  let clonePath: string;

  beforeAll(() => {
    jest.setTimeout(10 * 1000);
  });

  beforeEach(async () => {
    repositoryPath = await createDirectory();
    clonePath = await createDirectory();
  });

  afterEach(async () => {
    await deleteDirectory(repositoryPath);
    await deleteDirectory(clonePath);
  });

  test('correctly clones a git repository with all defaults', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.clone(cloneSource);

    expect(result.exitCode).toBe(0);
    expect(result.err).toEqual(expect.stringContaining('Cloning into \'git-annex-js\''));
    expect(result.out).toBe('');

    const clonedAnx = anx.createAccessor(path.join(repositoryPath, 'git-annex-js'));
    const remoteResult = await clonedAnx.runGit(['remote']);

    expect(remoteResult.exitCode).toBe(0);
    expect(remoteResult.out).toEqual(expect.stringContaining('origin'));
  });

  test('correctly clones a git repository', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.clone(cloneSource, clonePath, { '--progress': null });

    expect(result.exitCode).toBe(0);
    expect(result.err).toEqual(expect.stringContaining(`Cloning into '${clonePath}'`));
    expect(result.out).toBe('');

    const clonedAnx = anx.createAccessor(clonePath);
    const remoteResult = await clonedAnx.runGit(['remote']);

    expect(remoteResult.exitCode).toBe(0);
    expect(remoteResult.out).toEqual(expect.stringContaining('origin'));
  });

  test('correctly clones a git repository with --progress', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.clone(cloneSource, clonePath, { '--progress': null });

    expect(result.exitCode).toBe(0);
    expect(result.err).toEqual(expect.stringContaining(`Cloning into '${clonePath}'`));
    expect(result.out).toBe('');
  });

  test('correctly clones a git repository with --quiet', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.clone(cloneSource, clonePath, { '--quiet': null });

    expect(result.exitCode).toBe(0);
    expect(result.err).toBe('');
    expect(result.out).toBe('');
  });

  test('correctly clones a git repository with --verbose', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.clone(cloneSource, clonePath, { '--quiet': null, '--verbose': null });

    expect(result.exitCode).toBe(0);
    expect(result.err).toEqual(expect.stringContaining('POST git-upload-pack'));
    expect(result.out).toBe('');
  });

  test('correctly clones a git repository with --origin', async () => {
    const remoteName = 'github';
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.clone(cloneSource, clonePath, { '--origin': remoteName });

    expect(result.exitCode).toBe(0);
    expect(result.err).toEqual(expect.stringContaining(`Cloning into '${clonePath}'`));
    expect(result.out).toBe('');

    const clonedAnx = anx.createAccessor(clonePath);
    const remoteResult = await clonedAnx.runGit(['remote']);

    expect(remoteResult.exitCode).toBe(0);
    expect(remoteResult.out).toEqual(expect.stringContaining(remoteName));
  });

  test('correctly reports a bad url', async () => {
    const myAnx = anx.createAccessor(repositoryPath);
    const result = await myAnx.clone(nonexistentSource, clonePath, { '--progress': null });

    expect(result.exitCode).not.toBe(0);
    expect(result.err).toEqual(expect.stringMatching(`.*repository.*${nonexistentSource}.*not found.*`));
    expect(result.out).toBe('');
  });

});
