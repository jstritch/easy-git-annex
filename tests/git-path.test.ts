import * as anx from '../src/index';

const path1 = 'aaa/bbb/ccc';
const path2 = 'xxx/yyy/zzz';
const path2back = 'xxx\\yyy\\zzz';

describe('gitPath', () => {

  test('correctly leaves forward slashes alone', () => {
    const myAnx = anx.createAccessor(process.cwd());
    const path1conv = myAnx.gitPath(path1);

    expect(path1conv).toBe(path1);
  });

  test('correctly replaces back slashes', () => {
    const myAnx = anx.createAccessor(process.cwd());
    const path2conv = myAnx.gitPath(path2back);

    expect(path2conv).toBe(path2);
  });

});

describe('gitPaths', () => {

  test('correctly replaces slashes', () => {
    const myAnx = anx.createAccessor(process.cwd());
    const pathsConv = myAnx.gitPaths([path1, path2back, path2]);

    expect(pathsConv).toEqual([path1, path2, path2]);
  });

});
