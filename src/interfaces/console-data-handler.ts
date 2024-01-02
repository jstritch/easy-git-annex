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
 */
export interface ConsoleDataHandler {
  /**
   * The function to process the console output.
   * @param data The recently generated console output.
   */
  (data: string): void;
}
