import * as anx from '../src/index';
import { getPlatform } from '../src/helpers/get-platform';

jest.mock('../src/helpers/get-platform');

describe('path separator conversions', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const gitSep = '/';

  const tests: [string, string][] = [
    ['darwin', '/'],
    ['linux', '/'],
    ['win32', '\\'],
  ];

  test.each(tests)('platform (%o %s)', (platform, sysSep) => {

    (getPlatform as jest.Mock).mockReturnValue(platform);

    expect(anx.gitPath(sysSep)).toEqual(gitSep);
    expect(anx.gitPaths([sysSep, sysSep])).toEqual([gitSep, gitSep]);

    expect(anx.sysPath(gitSep)).toEqual(sysSep);
    expect(anx.sysPaths([gitSep, gitSep])).toEqual([sysSep, sysSep]);
  });

});
