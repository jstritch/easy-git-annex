import { CommandParameters, runCommand, RunCommandResult } from '../src/helpers/run-command.ts';
import { cloneEnv } from './helpers.ts';
import { CommandResult } from '../src/interfaces/command-result.ts';
import { ConsoleHelper } from '../src/helpers/console-helper.ts';
import { jest } from '@jest/globals';

describe('CommandResult', () => {

  test('toCommandResultString()', () => {
    const commandResult = new RunCommandResult('someDir', 'someExe', ['foo', 'bar', 'baz'], 42, 'good stuff', 'other stuff');
    const resultString = commandResult.toCommandResultString();
    const expected = 'The command: someExe foo bar baz\nfor repository someDir\nreturned exit code: 42\nout: good stuff\nerr: other stuff';
    expect(resultString).toBe(expected);
  });

});

describe('new CommandParameters', () => {

  let env: Record<string, unknown>;
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

  test('sets default values when apiOptions is undefined', () => {
    const args = ['foo', 'bar', 'baz'];
    const commandParameters = new CommandParameters('someDir', 'someExe', args);

    expect(commandParameters.repositoryPath).toBe('someDir');
    expect(commandParameters.exeName).toBe('someExe');
    expect(commandParameters.args).toBe(args);
    expect(commandParameters.userEnv).toBe(false);
    expect(commandParameters.env).toBe(process.env);
    expect(commandParameters.errHandler).toBeNull();
    expect(commandParameters.outHandler).toBeNull();
    expect(con).toHaveLength(0);
  });

  test('sets values when apiOptions is provided', () => {
    const args = ['foo', 'bar', 'baz'];
    const apiOptions = { env: env, errHandler: onConsoleErr, outHandler: onConsoleOut };
    const commandParameters = new CommandParameters('someDir', 'someExe', args, apiOptions);

    expect(commandParameters.repositoryPath).toBe('someDir');
    expect(commandParameters.exeName).toBe('someExe');
    expect(commandParameters.args).toBe(args);
    expect(commandParameters.userEnv).toBe(true);
    expect(commandParameters.env).toBe(env);
    expect(commandParameters.errHandler).toBe(onConsoleErr);
    expect(commandParameters.outHandler).toBe(onConsoleOut);
    expect(con).toHaveLength(0);
  });

});

describe('runCommand', () => {

  const exeName = 'git';
  let conOut: string;
  let conErr: string;
  let logSpy: jest.SpiedFunction<(...parameters: unknown[]) => void>;
  let mockedLogger: jest.Mock;

  beforeAll(() => {
    logSpy = jest.spyOn(ConsoleHelper, 'writeError');
    mockedLogger = jest.fn((...parameters: unknown[]) => { parameters; });
    ConsoleHelper.setWriter(mockedLogger);
  });

  afterAll(() => {
    ConsoleHelper.setWriter(null);
  });

  beforeEach(() => {
    conOut = '';
    conErr = '';
  });

  afterEach(() => {
    logSpy.mockClear();
  });

  test('runs a simple command', async () => {
    let commandResult: CommandResult | null = null;
    let error: Error | null = null;
    const args = ['help'];

    try {
      const cmd = new CommandParameters(process.cwd(), exeName, args);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(commandResult?.repositoryPath).toBe(process.cwd());
    expect(commandResult?.exeName).toBe(exeName);
    expect(commandResult?.args).toBe(args);
    expect(commandResult?.exitCode).toBe(0);
    expect(commandResult?.out).toContain('usage: git');
    expect(commandResult?.err).toBe('');
    expect(error).toBeNull();
    expect(mockedLogger).not.toHaveBeenCalled();
  });

  test('identifies a nonexistent repositoryPath', async () => {
    let error: Error | null = null;

    try {
      const cmd = new CommandParameters('foobarbaz', exeName, ['help']);
      await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(error?.message).toContain('reported Error: spawn git ENOENT');
  });

  test('identifies a nonexistent executable', async () => {
    let error: Error | null = null;

    try {
      const cmd = new CommandParameters(process.cwd(), 'foobar', []);
      await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(error?.message).toContain('reported Error: spawn foobar ENOENT');
  });

  test('identifies an empty argument list', async () => {
    let commandResult: CommandResult | null = null;
    let error: Error | null = null;

    try {
      const cmd = new CommandParameters(process.cwd(), exeName, []);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(commandResult?.repositoryPath).toBe(process.cwd());
    expect(commandResult?.exeName).toBe(exeName);
    expect(commandResult?.args).toHaveLength(0);
    expect(commandResult?.exitCode).toBe(1);
    expect(commandResult?.out).toContain('usage: git');
    expect(commandResult?.err).toBe('');
    expect(error).toBeNull();
    expect(mockedLogger).not.toHaveBeenCalled();
  });

  test('identifies a nonexistent command name', async () => {
    let commandResult: CommandResult | null = null;
    let error: Error | null = null;
    const args = ['asdfghjkl'];

    try {
      const cmd = new CommandParameters(process.cwd(), exeName, args);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(commandResult?.repositoryPath).toBe(process.cwd());
    expect(commandResult?.exeName).toBe(exeName);
    expect(commandResult?.args).toBe(args);
    expect(commandResult?.exitCode).toBe(1);
    expect(commandResult?.out).toBe('');
    expect(commandResult?.err).toContain('git: \'asdfghjkl\' is not a git command. See \'git --help\'.\n');
    expect(error).toBeNull();
    expect(mockedLogger).not.toHaveBeenCalled();
  });

  test('includes the environment variables on an error condition', async () => {
    let error: Error | null = null;

    try {
      const anxEnv = cloneEnv();
      anxEnv['annexTest'] = 'someValue';
      anxEnv['annexTestUndefined'] = undefined;
      const apiOptions = { env: anxEnv };

      const cmd = new CommandParameters(process.cwd(), 'foobar', [], apiOptions);
      await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(error?.message).toContain('annexTest: someValue');
    expect(error?.message).toContain('annexTestUndefined: undefined');
  });

  test('does not include the default environment variables on an error condition', async () => {
    let error: Error | null = null;

    try {
      const apiOptions = {};
      const cmd = new CommandParameters(process.cwd(), 'foobar', [], apiOptions);
      await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(error?.message).not.toContain('\nenv:\n');
  });

  function onConsoleOut(data: string): void {
    conOut += data;
    throw new Error('This is a test error from stdout. No need to diagnose below here.');
  }

  function onConsoleErr(data: string): void {
    conErr += data;
    throw new Error('This is a test error from stderr. No need to diagnose below here.');
  }

  test('invokes a user-supplied stdout handler', async () => {
    let commandResult: CommandResult | null = null;
    let error: Error | null = null;
    const args = ['help'];

    try {
      const apiOptions = { outHandler: onConsoleOut };
      const cmd = new CommandParameters(process.cwd(), exeName, args, apiOptions);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(commandResult?.repositoryPath).toBe(process.cwd());
    expect(commandResult?.exeName).toBe(exeName);
    expect(commandResult?.args).toBe(args);
    expect(commandResult?.exitCode).toBe(0);
    expect(commandResult?.out).toBe(conOut);
    expect(commandResult?.err).toBe('');
    expect(error).toBeNull();
    expect(mockedLogger).toHaveBeenCalledWith(expect.any(String), expect.anything());
  });

  test('invokes a user-supplied stderr handler', async () => {
    let commandResult: CommandResult | null = null;
    let error: Error | null = null;
    const args = ['help'];

    try {
      const anxEnv = cloneEnv();
      anxEnv['GIT_TRACE'] = '2';
      const apiOptions = { env: anxEnv, outHandler: onConsoleOut, errHandler: onConsoleErr };
      const cmd = new CommandParameters(process.cwd(), exeName, args, apiOptions);
      commandResult = await runCommand(cmd);
    } catch (e: unknown) {
      error = e as Error;
    }

    expect(commandResult?.repositoryPath).toBe(process.cwd());
    expect(commandResult?.exeName).toBe(exeName);
    expect(commandResult?.args).toBe(args);
    expect(commandResult?.exitCode).toBe(0);
    expect(commandResult?.out).toBe(conOut);
    expect(commandResult?.err).toBe(conErr);
    expect(conErr).toContain('trace: built-in: git help');
    expect(error).toBeNull();
    expect(mockedLogger).toHaveBeenCalledWith(expect.any(String), expect.anything());
  });

});
