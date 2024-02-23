import { CommandResult } from '../interfaces/command-result.js';

/**
 * Evaluates a CommandResult to determine if it represents a successful command completion.
 * A meaningful Error is thrown is thrown if the result indicates failure.
 *
 * @param result The CommandResult to examine.
 * @param expectedExitCode The expected success exitCode. Normally unspecified, the default value is zero.
 * @returns The result parameter if the exitCode indicates success; otherwise, an Error is thrown.
 * @category Helper
 */
export function checkResult(result: CommandResult, expectedExitCode?: number): CommandResult {
  if (expectedExitCode ?? 0 !== result.exitCode) {
    throw new Error(result.toCommandResultString());
  }
  return result;
}
