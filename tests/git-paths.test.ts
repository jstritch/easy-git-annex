import * as anx from '../src/index.js';
import { jest } from '@jest/globals';
import { ProcessHelper } from '../src/helpers/process-helper.js';

describe('path separator conversions', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const gitSep = '/';

  const tests: [string, string][] = [
    ['darwin', '/'],
    ['linux', '/'],
    ['win32', '\\'],
  ];

  test.each(tests)('platform (%o %s)', (platform, sysSep) => {

    jest.spyOn(ProcessHelper, 'getPlatformName').mockReturnValue(platform);

    expect(anx.gitPath(sysSep)).toEqual(gitSep);
    expect(anx.gitPaths([sysSep, sysSep])).toEqual([gitSep, gitSep]);

    expect(anx.sysPath(gitSep)).toEqual(sysSep);
    expect(anx.sysPaths([gitSep, gitSep])).toEqual([sysSep, sysSep]);
  });

});
