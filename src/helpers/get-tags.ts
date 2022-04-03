import { ForEachRefOptions } from '../interfaces/for-each-ref-options';
import { getRefs } from './get-refs';
import { Parser } from '../interfaces/parser';

/**
 * Returns information about Git tags in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the [[GitAnnexAPI.forEachRef]] method.
 *
 * @param guard The type predicate to validate each tag.
 * @param columns Maps the columns returned by the --format option
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param gitOptions The ForEachRefOptions for the command.
 * @param pattern Filters tags using either fnmatch(3) or
 * matching completely or from the beginning up to a slash.
 * @param columnDelimiter The column delimiter used by the --format option.
 * If unspecified, `\t` is used to split at `%09` in --format.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function getTags<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, gitOptions: ForEachRefOptions | string[], pattern?: string, columnDelimiter?: string): Promise<T[]> {
  return getRefs(guard, columns, repositoryPath, gitOptions, pattern ? `refs/tags/${pattern}` : 'refs/tags', columnDelimiter);
}
