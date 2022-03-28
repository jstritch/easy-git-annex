/**
 * MergeAnxOptions defines the supported options for the git=annex merge command.
 * @category Command Options
 */
export interface MergeAnxOptions {

  /**
   * Permits merge histories that do not share a common ancestor.
   */
  '--allow-unrelated-histories'?: null;
}
