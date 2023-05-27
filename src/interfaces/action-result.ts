import { Action } from './action.js';
/**
 * ActionResult defines an object returned by various git-annex commands.
 * @category Returned Objects
 */
export interface ActionResult extends Action {

  /**
   * Success indicator.
   */
  success: boolean;

  /**
   * The list of errors encountered
   */
  'error-messages': string[];

  /**
   * The actual file key.
   */
  key?: string;

  /**
   * A remark.
   */
  note?: string;
}
