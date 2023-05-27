import { Action } from './action.js';
/**
 * ActionProgress defines an object returned by various git-annex commands.
 * @category Returned Objects
 */
export interface ActionProgress {

  /**
   * The Action being reported.
   */
  action: Action;

  /**
   * The count of bytes completed.
   */
  'byte-progress': number;

  /**
   * The total byte count.
   */
  'total-size': number;

  /**
   * A string representing the relative progress of the Action.
   */
  'percent-progress': string;
}
