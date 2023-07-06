import { PullAnxOptions } from './pull-anx-options.js';
import { PushAnxOptions } from './push-anx-options.js';

/**
 * AssistOptions defines the supported options for the git-annex assist command.
 * @category Command Options
 */
export interface AssistOptions extends PushAnxOptions, PullAnxOptions {

  /**
   * Specifies the commit message.
   */
  '--message'?: string;

}
