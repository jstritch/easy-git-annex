import { createFromTextLines } from '../helpers/creators';
import { GitAnnexAccessor } from '../git-annex-accessor';
import { Parser } from '../interfaces/parser';
import { WhereisOptions } from '../interfaces/whereis-options';

/**
 * Returns information about repositories containing files in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the [[GitAnnexAPI.whereis]] method.
 *
 * @param guard The type predicate to validate each file.
 * @param columns Maps the columns returned by the --format option
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param relativePaths The files for the whereis command.
 * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
 * @param gitOptions The WhereisOptions for the command.
 * The --format option must end with `\\n`.
 * @param columnDelimiter The column delimiter used by the --format option.
 * If unspecified, `\t` is used to split at `\\t` in --format.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function getWhereis<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, relativePaths?: string | string[], gitOptions?: WhereisOptions | string[], columnDelimiter?: string): Promise<T[]> {
  const myAnx = GitAnnexAccessor.create(repositoryPath);
  const result = await myAnx.whereis(relativePaths, gitOptions);
  return createFromTextLines(guard, columns, result.out, columnDelimiter);
}
