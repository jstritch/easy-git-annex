import { CommandParameters, runCommand, RunCommandResult } from '../src/helpers/run-command';
import { cloneEnv } from './helpers';
import { CommandResult } from '../src/interfaces/command-result';

describe('toCommandResultString', () => {

  test('correctly reports the member variables', () => {

    const commandResult = new RunCommandResult('someDir', 'someExe', ['foo', 'bar', 'baz'], 42, 'good stuff', 'other stuff');
    const resultString = commandResult.toCommandResultString();
    const expected = 'The command: someExe foo bar baz\nfor repository someDir\nreturned exit code: 42\nout: good stuff\nerr: other stuff';

    expect(resultString).toBe(expected);
  });

});

describe('new CommandParameters', () => {

  let env: NodeJS.ProcessEnv;
  let con: string;

  beforeEach(() => {
    env = cloneEnv();
    env['annexTest'] = 'someValue';
    con = '';
  });

  function onConsoleErr(data: string): void {
    con += data;
  }

  function onConsoleOut(data: string): void {
    con += data;
  }

  test('correctly sets default values when apiOptions is undefined', () => {
    const commandParameters = new CommandParameters('someDir', 'someExe', ['foo', 'bar', 'baz']);

    expect(commandParameters).toHaveProperty('repositoryPath', 'someDir');
    expect(commandParameters).toHaveProperty('exeName', 'someExe');
    expect(commandParameters).toHaveProperty('args', ['foo', 'bar', 'baz']);
    expect(commandParameters).toHaveProperty('env', process.env);
    expect(commandParameters).toHaveProperty('errHandler', null);
    expect(commandParameters).toHaveProperty('outHandler', null);
    expect(con).toHaveLength(0);
  });

  test('correctly sets default values when apiOptions is empty', () => {
    const commandParameters = new CommandParameters('someDir', 'someExe', ['foo', 'bar', 'baz'], {});

    expect(commandParameters).toHaveProperty('repositoryPath', 'someDir');
    expect(commandParameters).toHaveProperty('exeName', 'someExe');
    expect(commandParameters).toHaveProperty('args', ['foo', 'bar', 'baz']);
    expect(commandParameters).toHaveProperty('env', process.env);
    expect(commandParameters).toHaveProperty('errHandler', null);
    expect(commandParameters).toHaveProperty('outHandler', null);
    expect(con).toHaveLength(0);
  });

  test('correctly sets values when apiOptions is provided', () => {
    const apiOptions = { env: env, errHandler: onConsoleErr, outHandler: onConsoleOut };
    const commandParameters = new CommandParameters('someDir', 'someExe', ['foo', 'bar', 'baz'], apiOptions);

    expect(commandParameters).toHaveProperty('repositoryPath', 'someDir');
    expect(commandParameters).toHaveProperty('exeName', 'someExe');
    expect(commandParameters).toHaveProperty('args', ['foo', 'bar', 'baz']);
    expect(commandParameters).toHaveProperty('env', env);
    expect(commandParameters).toHaveProperty('errHandler', onConsoleErr);
    expect(commandParameters).toHaveProperty('outHandler', onConsoleOut);
    expect(con).toHaveLength(0);
  });

});

describe('runCommand', () => {

  const exeName = 'git';  // git is installed in CI environments, git-annex is not
  let conOut: string;
  let conErr: string;
  let cbErrFn: jest.SpyInstance;

  beforeAll(() => {
    cbErrFn = jest.spyOn(console, 'error').mockImplementation(() => { return; });
  });

  afterAll(() => {
    cbErrFn.mockRestore();
  });

  beforeEach(() => {
    conOut = '';
    conErr = '';
  });

  afterEach(() => {
    cbErrFn.mockClear();
  });

  test('correctly runs a simple command', async () => {
    let commandResult: CommandResult | null = null;
    let error: unknown = null;

    try {
      const cmd = new CommandParameters(process.cwd(), exeName, ['help']);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e;
    }

    expect(commandResult).toHaveProperty('repositoryPath', process.cwd());
    expect(commandResult).toHaveProperty('exeName', exeName);
    expect(commandResult).toHaveProperty('args', ['help']);
    expect(commandResult).toHaveProperty('exitCode', 0);
    expect(commandResult).toMatchObject({ out: expect.stringContaining('usage: git [--version] [--help]') as unknown });
    expect(commandResult).toHaveProperty('err', '');
    expect(error).toBeNull();
    expect(cbErrFn).not.toHaveBeenCalled();
  });

  test('correctly identifies a nonexistent repositoryPath', async () => {
    let error: unknown = null;

    try {
      const cmd = new CommandParameters('foobarbaz', exeName, ['help']);
      await runCommand(cmd);
    } catch (e: unknown) {
      error = e;
    }

    expect(error).toMatchObject({ message: expect.stringMatching('reported Error: spawn git ENOENT') as unknown });
  });

  test('correctly identifies a nonexistent executable', async () => {
    let error: unknown = null;

    try {
      const cmd = new CommandParameters(process.cwd(), 'foobar', []);
      await runCommand(cmd);
    } catch (e: unknown) {
      error = e;
    }

    expect(error).toMatchObject({ message: expect.stringMatching('reported Error: spawn foobar ENOENT') as unknown });
  });

  test('correctly identifies an empty argument list', async () => {
    let commandResult: CommandResult | null = null;
    let error: unknown = null;

    try {
      const cmd = new CommandParameters(process.cwd(), exeName, []);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(commandResult).toHaveProperty('repositoryPath', process.cwd());
    expect(commandResult).toHaveProperty('exeName', exeName);
    expect(commandResult).toHaveProperty('args', []);
    expect(commandResult).toHaveProperty('exitCode', 1);
    expect(commandResult).toMatchObject({ out: expect.stringContaining('usage: git [--version] [--help]') as unknown });
    expect(commandResult).toHaveProperty('err', '');
    expect(error).toBeNull();
    expect(cbErrFn).not.toHaveBeenCalled();
  });

  test('correctly identifies a nonexistent command name', async () => {
    let commandResult: CommandResult | null = null;
    let error: unknown = null;

    try {
      const cmd = new CommandParameters(process.cwd(), exeName, ['asdfghjkl']);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(commandResult).toHaveProperty('repositoryPath', process.cwd());
    expect(commandResult).toHaveProperty('exeName', exeName);
    expect(commandResult).toHaveProperty('args', ['asdfghjkl']);
    expect(commandResult).toHaveProperty('exitCode', 1);
    expect(commandResult).toHaveProperty('out', '');
    expect(commandResult).toHaveProperty('err', 'git: \'asdfghjkl\' is not a git command. See \'git --help\'.\n');
    expect(error).toBeNull();
    expect(cbErrFn).not.toHaveBeenCalled();
  });

  test('correctly includes the environment variables on an error condition', async () => {
    let error: unknown = null;

    try {
      const anxEnv = cloneEnv();
      anxEnv['annexTest'] = 'someValue';
      anxEnv['annexTestUndefined'] = undefined;
      const apiOptions = { env: anxEnv };

      const cmd = new CommandParameters(process.cwd(), 'foobar', [], apiOptions);
      await runCommand(cmd);
    } catch (e: unknown) {
      error = e;
    }

    expect(error).toMatchObject({ message: expect.stringMatching('annexTest: someValue') as unknown });
    expect(error).toMatchObject({ message: expect.stringMatching('annexTestUndefined: undefined') as unknown });
  });

  function onConsoleOut(data: string): void {
    conOut += data;
    throw new Error('Boo from stdout!');
  }

  function onConsoleErr(data: string): void {
    conErr += data;
    throw new Error('Boo from stderr!');
  }

  test('correctly invokes a user-supplied stdout handler', async () => {
    let commandResult: CommandResult | null = null;
    let error: unknown = null;

    try {
      const apiOptions = { outHandler: onConsoleOut };
      const cmd = new CommandParameters(process.cwd(), exeName, ['help'], apiOptions);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e;
    }

    expect(commandResult).toHaveProperty('repositoryPath', process.cwd());
    expect(commandResult).toHaveProperty('exeName', exeName);
    expect(commandResult).toHaveProperty('args', ['help']);
    expect(commandResult).toHaveProperty('exitCode', 0);
    expect(commandResult).toHaveProperty('out', conOut);
    expect(commandResult).toHaveProperty('err', '');
    expect(error).toBeNull();
    expect(cbErrFn).toHaveBeenCalledWith(expect.any(String), expect.anything());
  });

  test('correctly invokes a user-supplied stderr handler', async () => {
    let commandResult: CommandResult | null = null;
    let error: unknown = null;

    try {
      const anxEnv = cloneEnv();
      anxEnv['GIT_TRACE'] = '2';
      const apiOptions = { env: anxEnv, outHandler: onConsoleOut, errHandler: onConsoleErr };
      const cmd = new CommandParameters(process.cwd(), exeName, ['help'], apiOptions);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e;
    }

    expect(commandResult).toHaveProperty('repositoryPath', process.cwd());
    expect(commandResult).toHaveProperty('exeName', exeName);
    expect(commandResult).toHaveProperty('args', ['help']);
    expect(commandResult).toHaveProperty('exitCode', 0);
    expect(commandResult).toHaveProperty('out', conOut);
    expect(commandResult).toHaveProperty('err', conErr);
    expect(conErr).toContain('trace: built-in: git help');
    expect(error).toBeNull();
    expect(cbErrFn).toHaveBeenCalledWith(expect.any(String), expect.anything());
  });

});
