import { Action } from './action';
/**
 * ActionProgress defines an object returned by various git-annex commands.
 * @category Returned Objects
 */
export interface ActionProgress {

  action: Action;
  'byte-progress': number;
  'total-size': number;
  'percent-progress': string;
}
