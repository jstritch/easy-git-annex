import { ApiOptions, ConsoleDataHandler } from '../interfaces/api-options.js';
import { CommandResult } from '../interfaces/command-result.js';
import { ConsoleHelper } from '../helpers/console-helper.js';
import { isString } from '../helpers/type-predicates.js';
import { spawn } from 'node:child_process';

export class RunCommandResult implements CommandResult {

  public readonly repositoryPath: string;

  public readonly exeName: string;

  public readonly args: string[];

  public readonly exitCode: number;

  public readonly out: string;

  public readonly err: string;

  public constructor(repositoryPath: string, exeName: string, args: string[], exitCode: number, out: string, err: string) {
    this.repositoryPath = repositoryPath;
    this.exeName = exeName;
    this.args = args;
    this.exitCode = exitCode;
    this.out = out;
    this.err = err;
  }

  public toCommandResultString(): string {
    return `The command: ${this.exeName} ${this.args.join(' ')}\nfor repository ${this.repositoryPath}\nreturned exit code: ${this.exitCode}\nout: ${this.out}\nerr: ${this.err}`;
  }
}

/**
 * An instance of the CommandParameters class completely defines a command to be executed.
 * The constructor simplifies proper initialization with specified and/or default values.
 * @internal
 */
export class CommandParameters {

  public repositoryPath: string;

  public exeName: string;

  public args: string[];

  public userEnv: boolean;

  public env: NodeJS.ProcessEnv;

  public errHandler: ConsoleDataHandler | null;

  public outHandler: ConsoleDataHandler | null;

  public noOp: boolean;

  public constructor(repositoryPath: string, exeName: string, args: string[], apiOptions?: ApiOptions) {
    this.repositoryPath = repositoryPath;
    this.exeName = exeName;
    this.args = args;
    this.userEnv = apiOptions !== undefined && 'env' in apiOptions;
    this.env = apiOptions && 'env' in apiOptions ? apiOptions.env : process.env;
    this.errHandler = apiOptions && 'errHandler' in apiOptions ? apiOptions.errHandler : null;
    this.outHandler = apiOptions && 'outHandler' in apiOptions ? apiOptions.outHandler : null;
    this.noOp = apiOptions && 'noOp' in apiOptions ? apiOptions.noOp : false;
  }
}

/**
 * Function runCommand executes a command without blocking the event loop.
 * @internal
 */
export async function runCommand(cmd: CommandParameters): Promise<CommandResult> {
  return new Promise((resolve, reject) => {
    if (cmd.noOp) {
      resolve(new RunCommandResult(cmd.repositoryPath, cmd.exeName, cmd.args, Number.NaN, '', ''));
      return;
    }
    let out = '';
    let err = '';
    const outHandler = cmd.outHandler;
    const errHandler = cmd.errHandler;
    const opt = {
      cwd: cmd.repositoryPath,
      env: cmd.env,
      windowsHide: true,
    };

    const prc = spawn(cmd.exeName, cmd.args.length > 0 ? cmd.args : undefined, opt);

    prc.stdout.on('data', (data: string | Buffer) => {
      const s = data.toString();
      out += s;
      if (outHandler) {
        process.nextTick(() => {
          try {
            outHandler(s);
          } catch (e: unknown) {
            ConsoleHelper.writeError('Error from outHandler: ', e);
          }
        });
      }
    });

    prc.stderr.on('data', (data: string | Buffer) => {
      const s = data.toString();
      err += s;
      if (errHandler) {
        process.nextTick(() => {
          try {
            errHandler(s);
          } catch (e: unknown) {
            ConsoleHelper.writeError('Error from errHandler: ', e);
          }
        });
      }
    });

    prc.on('error', (e: unknown) => {
      const msg = formatError(cmd.repositoryPath, cmd.exeName, cmd.args, out, err, e, cmd.userEnv ? cmd.env : undefined);
      reject(new Error(msg));
    });

    prc.on('close', (code: number) => {
      const result = new RunCommandResult(cmd.repositoryPath, cmd.exeName, cmd.args, code, out, err);
      resolve(result);
    });

    prc.stdin.end();
  });
}

function formatError(repositoryPath: string, exeName: string, args: string[], out: string, err: string, error: unknown, env?: NodeJS.ProcessEnv): string {
  const errMsg = typeof error === 'object' && error !== null ? error.toString() : typeof error;
  let msg = `The command: ${exeName} ${args.join(' ')}\nfor repository ${repositoryPath}\n`;
  msg += `reported ${errMsg}\nstdout: ${out}\nstderr: ${err}`;
  if (env) {
    msg += '\nenv:';
    for (const [key, value] of Object.entries(env)) {
      msg += `\n${key}: ${isString(value) ? value : typeof value}`;
    }
  }
  return msg;
}
