import * as anx from '../../src/index.ts';
import { copyAddGitCommit, createRepository, deleteDirectory, setRepositoryAuthor, TestFile } from '../helpers.ts';

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
    [{ '--contains': 'c233c7a' }, ['--contains', 'c233c7a']],
    [{ '--contains': ['c233c7a'] }, ['--contains', 'c233c7a']],
    [{ '--contains': ['c233c7a', 'ab2c420'] }, ['--contains', 'c233c7a', '--contains', 'ab2c420']],
    [{ '--create-reflog': null }, ['--create-reflog']],
    [{ '--delete': null }, ['--delete']],
    [{ '--force': null }, ['--force']],
    [{ '--format': '%(taggerdate:unix)' }, ['--format=%(taggerdate:unix)']],
    [{ '--ignore-case': null }, ['--ignore-case']],
    [{ '--list': null }, ['--list']],
    [{ '--local-user': 'keyid' }, ['--local-user=keyid']],
    [{ '--merged': null }, ['--merged']],
    [{ '--merged': 'c233c7a' }, ['--merged', 'c233c7a']],
    [{ '--merged': ['c233c7a'] }, ['--merged', 'c233c7a']],
    [{ '--merged': ['c233c7a', 'ab2c420'] }, ['--merged', 'c233c7a', '--merged', 'ab2c420']],
    [{ '--message': 'tag contents' }, ['--message=tag contents']],
    [{ '--no-column': null }, ['--no-column']],
    [{ '--no-contains': null }, ['--no-contains']],
    [{ '--no-contains': 'c233c7a' }, ['--no-contains', 'c233c7a']],
    [{ '--no-contains': ['c233c7a'] }, ['--no-contains', 'c233c7a']],
    [{ '--no-contains': ['c233c7a', 'ab2c420'] }, ['--no-contains', 'c233c7a', '--no-contains', 'ab2c420']],
    [{ '--no-create-reflog': null }, ['--no-create-reflog']],
    [{ '--no-merged': null }, ['--no-merged']],
    [{ '--no-merged': 'c233c7a' }, ['--no-merged', 'c233c7a']],
    [{ '--no-merged': ['c233c7a'] }, ['--no-merged', 'c233c7a']],
    [{ '--no-merged': ['c233c7a', 'ab2c420'] }, ['--no-merged', 'c233c7a', '--no-merged', 'ab2c420']],
    [{ '--no-sign': null }, ['--no-sign']],
    [{ '--omit-empty': null }, ['--omit-empty']],
    [{ '--points-at': null }, ['--points-at']],
    [{ '--points-at': 'HEAD' }, ['--points-at', 'HEAD']],
    [{ '--sign': null }, ['--sign']],
    [{ '--sort': 'A' }, ['--sort=A']],
    [{ '--sort': ['A', 'B'] }, ['--sort=A', '--sort=B']],
    [{ '--verify': null }, ['--verify']],
  ];

  test.each(tests)('TagOptions "%o"', async (gitOptions, expected) => {
    const rslt = await myAnx.tag(undefined, gitOptions, { noOp: true });
    expect(rslt.exitCode).toBeNaN();
    expect(rslt.args).toEqual(expect.arrayContaining(expected));
  });
});
