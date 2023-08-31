import { ConsoleDataHandler } from './console-data-handler.js';
/**
 * ApiOptions directs the behavior of easy-git-annex.
 * @category API Options
 */
export interface ApiOptions {

  /**
   * The environment to use when running the command.
   * If unspecified, the environment of the current process is used.
   *
   * If the desired environment will be a modification of the current environment,
   * consider cloning process.env to avoid polluting the current environment.
   *
   * The
   * [Node.js process.env documentation](https://nodejs.org/api/process.html#processenv)
   * describes the environment object.
   */
  env?: Record<string, unknown>;

  /**
   * The callback to receive stderr data as it becomes available.
   * If unspecified, no stderr callback is invoked.
   * Refer to {@link ConsoleDataHandler} for implementation details.
   */
  errHandler?: ConsoleDataHandler;

  /**
   * The callback to receive stdout data as it becomes available.
   * If unspecified, no stdout callback is invoked.
   * Refer to {@link ConsoleDataHandler} for implementation details.
   */
  outHandler?: ConsoleDataHandler;

  /**
   * Stops processing before actually running the command.
   * The CommandResult is returned with an exitCode of `Number.NaN`.
   * The repositoryPath, exeName, and args properties may be examined.
   */
  noOp?: boolean;
}
