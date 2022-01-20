/**
* ConsoleDataHandler defines the callback signature required to
* obtain data from a command's stdout or stderr streams as it executes.
* ConsoleDataHandlers provide the ability to show progress of long-running commands.
* ConsoleDataHandler callbacks are specified by [[ApiOptions.outHandler]]
* and [[ApiOptions.errHandler]].
*
* Each function is called synchronously from the nextTick queue.
* More information about this strategy is avaiable in the article
* [The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/).
*
* Uncaught Errors thrown by ConsoleDataHandler functions are
* logged to console.error by easy-git-annex.
* An application may override this behavior by
* catching and handling any error in the callback.
*
* The bind method may be used to pass `this` and other parameters
* to the callback as shown in the JavaScript example below.
* Refer to the
* [Function.prototype.bind() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* for additional information.
*
* ```javascript
* something: 'a value'
* ...
* onAnnexOut(data) {
*   console.log(`gitAnnexOut: ${this.something} ${data}`);
* }
* ...
* const anxVersion = await myAnx.versionAnx({}, { outHandler: this.onAnnexOut.bind(this) }));
* ```
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
 * ApiOptions control the behavior of easy-git-annex.
 * @category API Options
 */
export interface ApiOptions {

  /**
   * The environment to use when running the command.
   * If unspecified, the environment of the current process is used.
   *
   * If the desired environment will be a modification of the current environment,
   * consider cloning process.env to avoid polluting the current environment.
   * The following two lines illustrate one way to clone the current environment
   * and add a new environemnt variable to the copy.
   *
   * ```javascript
   * const anxEnv = Object.assign({}, process.env);
   * anxEnv['variableName'] = 'stringValue';
   * ```
   *
   * Reliable information about cloning JavaScript objects may be found in the
   * [Object.assign() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
   *
   * The
   * [Node.js process.env documentation](https://nodejs.org/api/process.html#processenv)
   * describes the environment object.
   */
  env?: NodeJS.ProcessEnv;

  /**
   * The callback to receive stderr data as it becomes available.
   * The output may be used to display progress of a long-running command.
   * If unspecified, no stderr callback is invoked.
   * Refer to [[ConsoleDataHandler]] for implementation details.
   */
  errHandler?: ConsoleDataHandler;

  /**
   * The callback to receive stdout data as it becomes available.
   * The output may be used to display progress of a long-running command.
   * If unspecified, no stdout callback is invoked.
   * Refer to [[ConsoleDataHandler]] for implementation details.
   */
  outHandler?: ConsoleDataHandler;
}
