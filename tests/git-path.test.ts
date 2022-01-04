import * as anx from '../src/index';

const path1 = 'aaa/bbb/ccc';
const path2 = 'xxx/yyy/zzz';
const path2back = 'xxx\\yyy\\zzz';

describe('gitPath', () => {

  test('correctly leaves forward slashes alone', () => {
    const path1conv = anx.gitPath(path1);

    expect(path1conv).toBe(path1);
  });

  test('correctly replaces back slashes', () => {
    const path2conv = anx.gitPath(path2back);

    expect(path2conv).toBe(path2);
  });

});

describe('gitPaths', () => {

  test('correctly replaces slashes', () => {
    const pathsConv = anx.gitPaths([path1, path2back, path2]);

    expect(pathsConv).toEqual([path1, path2, path2]);
  });

});
