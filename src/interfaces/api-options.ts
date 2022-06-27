/**
* ConsoleDataHandler defines the callback signature required to
* obtain data from a command's stdout or stderr streams as it executes.
* ConsoleDataHandler callbacks are specified by {@link ApiOptions.outHandler}
* and {@link ApiOptions.errHandler}.
*
* Uncaught Errors thrown by ConsoleDataHandler functions are
* logged to console.error by easy-git-annex.
* An application may override this behavior by
* catching and handling any error in the callback.
*
* The bind function may be used to pass `this` and other parameters.
* Refer to the
* [Function.prototype.bind() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* for additional information.
* @category API Options
* @callback
*/
export interface ConsoleDataHandler {
  /**
   * @param data The recently generated console output.
   */
  (data: string): void;
}

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
  env?: NodeJS.ProcessEnv;

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
