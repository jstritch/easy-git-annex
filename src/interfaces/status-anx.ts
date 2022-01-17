/**
 * StatusAnx defines an object returned by various git-annex commands.
 * @category Returned Objects
 */
export interface StatusAnx {

  file: string;
  status: string;
  'error-messages': string[];
}
