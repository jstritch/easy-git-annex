import { AnnexOptions } from './annex-options';

/**
 * StatusAnxOptions defines the supported options for the git-annex status command.
 * @category Command Options
 */
export interface StatusAnxOptions extends AnnexOptions {

  /**
   * Produces a JSON object on each line of output.
   * Type predicate [[isStatusAnx]] may be passed to [[safeParse]] or [[safeParseToArray]] when processing the output.
   * Consider using method [[getStatusAnx]] which returns objects.
   */
  '--json'?: null;
}
