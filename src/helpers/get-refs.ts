import { createFromTextLines } from '../helpers/creators.js';
import { ForEachRefOptions } from '../interfaces/for-each-ref-options.js';
import { GitAnnexAccessor } from '../git-annex-accessor.js';
import { Parser } from '../interfaces/parser.js';

/**
 * Returns information about Git refs in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the {@link GitAnnexAPI.forEachRef} method.
 *
 * @param guard The type predicate to validate each ref.
 * @param columns Maps the columns returned by gitOptions.{@link ForEachRefOptions.--format}
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param gitOptions The ForEachRefOptions for the command.
 * The {@link ForEachRefOptions.--format} option is required.
 * @param pattern Filters refs using either fnmatch(3) or
 * matching completely or from the beginning up to a slash.
 * @param columnDelimiter The column delimiter used by gitOptions.{@link ForEachRefOptions.--format}.
 * If unspecified, `\t` is used to split at `%09` in gitOptions.{@link ForEachRefOptions.--format}.
 * @typeParam T - The application-defined type of the returned objects.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function getRefs<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, gitOptions: ForEachRefOptions | string[], pattern?: string, columnDelimiter?: string): Promise<T[]> {
  const myAnx = GitAnnexAccessor.create(repositoryPath);
  const result = await myAnx.forEachRef(gitOptions, pattern);
  return result.exitCode === 0 ? createFromTextLines(guard, columns, result.out, columnDelimiter) : [];
}
