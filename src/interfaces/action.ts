/**
 * Action defines an object returned by various git-annex commands.
 * @category Returned Objects
 */
export interface Action {

  command: string;
  file: string;
  input: string[];
}
