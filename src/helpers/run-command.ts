import { ApiOptions, ConsoleDataHandler } from '../interfaces/api-options';
import { CommandResult } from '../interfaces/command-result';
import { isString } from '../helpers/type-predicates';
import { spawn } from 'child_process';

/**
 * An instance of the CommandParameters class completely defines a command to be executed.
 * The constructor simplifies proper initialization with specified and/or default values.
 */
export class CommandParameters {

  public repositoryPath: string;

  public exeName: string;

  public args: string[];

  public env: NodeJS.ProcessEnv;

  public errHandler: ConsoleDataHandler | null;

  public outHandler: ConsoleDataHandler | null;

  public constructor(repositoryPath: string, exeName: string, args: string[], apiOptions?: ApiOptions) {
    this.repositoryPath = repositoryPath;
    this.exeName = exeName;
    this.args = args;
    this.env = apiOptions && 'env' in apiOptions ? apiOptions.env : process.env;
    this.errHandler = apiOptions && 'errHandler' in apiOptions ? apiOptions.errHandler : null;
    this.outHandler = apiOptions && 'outHandler' in apiOptions ? apiOptions.outHandler : null;
  }
}

/**
 * Function runCommand executes a command without blocking the event loop.
 */
export async function runCommand(cmd: CommandParameters): Promise<CommandResult> {
  return new Promise((resolve, reject) => {
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
            console.error('Error from outHandler: ', e);  // eslint-disable-line no-console
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
            console.error('Error from errHandler: ', e);  // eslint-disable-line no-console
          }
        });
      }
    });

    prc.on('error', (e: Error) => {
      const msg = formatError(cmd.repositoryPath, cmd.exeName, cmd.args, cmd.env, out, err, e);
      reject(new Error(msg));
    });

    prc.on('close', (code: number) => {
      const result = {
        repositoryPath: cmd.repositoryPath,
        exeName: cmd.exeName,
        args: cmd.args,
        exitCode: code,
        out: out,
        err: err,
      };
      resolve(result);
    });

    prc.stdin.end();
  });
}

function formatError(repositoryPath: string, exeName: string, args: string[], env: NodeJS.ProcessEnv, out: string, err: string, error: string | Error): string {
  let msg = `The command: ${exeName} ${args.join(' ')}\nfor repository ${repositoryPath}\n`;
  msg += `reported ${error.toString()}\nstdout: ${out}\nstderr: ${err}\nenv:`;
  for (const [key, value] of Object.entries(env)) {
    if (isString(value)) {
      msg += `\n${key}: ${value}`;
    } else {
      msg += `\n${key}: ${typeof value}`;
    }
  }
  return msg;
}
