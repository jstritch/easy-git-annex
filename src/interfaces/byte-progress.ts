import { Action } from './action';
/**
 * ByteProgress defines an object returned by various git-annex commands.
 * @category Returned Objects
 */
export interface ByteProgress {

  action: Action;
  'byte-progress': number;
  'total-size': number;
  'percent-progress': string;
}
