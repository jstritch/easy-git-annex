import { DiffCommonOptions } from './diff-common-options.js';
/**
 * DiffOptions defines the supported options for the Git diff command.
 * @category Command Options
 */
export interface DiffOptions extends DiffCommonOptions {

  /**
   * Makes the program exit with 1 if there were differences and 0 means no differences.
   */
  '--exit-code'?: null;

  /**
   * Disables all output of the program.
   * Implies --exit-code.
   */
  '--quiet'?: null;
}
