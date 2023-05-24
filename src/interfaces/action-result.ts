import { Action } from './action.js';
/**
 * ActionResult defines an object returned by various git-annex commands.
 * @category Returned Objects
 */
export interface ActionResult extends Action {

  success: boolean;
  'error-messages': string[];
  key?: string;
  note?: string;
}
