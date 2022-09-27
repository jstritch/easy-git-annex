import * as anx from '../src/index';
import * as path from 'path';

describe('path separators', () => {

  test('gitPath', () => {
    expect(anx.gitPath(path.sep)).toBe('/');
  });

  test('gitPaths', () => {
    expect(anx.gitPaths([path.sep, path.sep])).toEqual(['/', '/']);
  });

  test('sysPath', () => {
    expect(anx.sysPath('/')).toEqual(path.sep);
  });

  test('sysPaths', () => {
    expect(anx.sysPaths(['/', '/'])).toEqual([path.sep, path.sep]);
  });

});
