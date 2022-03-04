import * as anx from '../../src/index';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers';

describe('tag', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(async () => {
    repositoryPath = await createRepository();
    myAnx = anx.createAccessor(repositoryPath);
    await setRepositoryAuthor(repositoryPath);
  });

  afterAll(async () => {
    await deleteDirectory(repositoryPath);
  });

  test('creates, moves, deletes, and lists tags', async () => {
    const tag1 = 'v1.0';
    const tag2 = 'v1.1';
    const tag3 = 'v2.0';

    await copyAddGitCommit(TestFile.JPG1, repositoryPath, 'add first file');

    let rslt = await myAnx.tag(tag1);
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.tag(tag2, { '--annotate': null, '--message': 'the second tag' });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.tag(tag3, { '--message': 'the third tag' });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.tag();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).toContain(tag1);
    expect(rslt.out).toContain(tag2);
    expect(rslt.out).toContain(tag3);

    await copyAddGitCommit(TestFile.TXT1, repositoryPath, 'add second file');

    rslt = await myAnx.tag(tag3, { '--force': null, '--message': 'the third tag, revised' });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.tag(tag1, { '--delete': null });
    expect(rslt.exitCode).toBe(0);

    rslt = await myAnx.tag();
    expect(rslt.exitCode).toBe(0);
    expect(rslt.out).not.toContain(tag1);
    expect(rslt.out).toContain(tag2);
    expect(rslt.out).toContain(tag3);
  });

});

describe('TagOptions', () => {
  let repositoryPath: string;
  let myAnx: anx.GitAnnexAPI;

  beforeAll(() => {
    repositoryPath = process.cwd();
    myAnx = anx.createAccessor(repositoryPath);
  });

  const tests: [anx.TagOptions, string[]][] = [
    [{ '-n': null }, ['-n']],
    [{ '-n': 3 }, ['-n3']],
    [{ '-n': '7' }, ['-n7']],
    [{ '--annotate': null }, ['--annotate']],
    [{ '--cleanup': 'strip' }, ['--cleanup=strip']],
    [{ '--column': null }, ['--column']],
    [{ '--column': ['always', 'nodense'] }, ['--column=always,nodense']],
    [{ '--contains': null }, ['--contains']],
    [{ '--contains': 'HEAD' }, ['--contains', 'HEAD']],
    [{ '--create-reflog': null }, ['--create-reflog']],
    [{ '--delete': null }, ['--delete']],
    [{ '--force': null }, ['--force']],
    [{ '--format': '%(taggerdate:unix)' }, ['--format=%(taggerdate:unix)']],
    [{ '--ignore-case': null }, ['--ignore-case']],
    [{ '--list': null }, ['--list']],
    [{ '--local-user': 'keyid' }, ['--local-user=keyid']],
    [{ '--merged': null }, ['--merged']],
    [{ '--merged': 'HEAD' }, ['--merged', 'HEAD']],
    [{ '--message': 'tag contents' }, ['--message=tag contents']],
    [{ '--no-column': null }, ['--no-column']],
    [{ '--no-contains': null }, ['--no-contains']],
    [{ '--no-contains': 'HEAD' }, ['--no-contains', 'HEAD']],
    [{ '--no-create-reflog': null }, ['--no-create-reflog']],
    [{ '--no-merged': null }, ['--no-merged']],
    [{ '--no-merged': 'HEAD' }, ['--no-merged', 'HEAD']],
    [{ '--no-sign': null }, ['--no-sign']],
    [{ '--points-at': null }, ['--points-at']],
    [{ '--points-at': 'HEAD' }, ['--points-at', 'HEAD']],
    [{ '--sign': null }, ['--sign']],
    [{ '--sort': 'key' }, ['--sort=key']],
    [{ '--verify': null }, ['--verify']],
  ];

  test.each(tests)('TagOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.tag(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
