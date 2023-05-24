import * as anx from '../src/index.ts';
import * as path from 'node:path';

describe('pathExists', () => {

  const pathExistsTests: [string, boolean][] = [
    ['LICENSE.md', true],
    ['LICENSE.txt', false],
    ['src', true],
    ['source', false],
  ];

  test.each(pathExistsTests)('pathExists(%o)', async (s, expected) => {
    expect(await anx.pathExists(path.join(process.cwd(), s))).toBe(expected);
  });

});
