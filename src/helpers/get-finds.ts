import { createFromTextLines } from '../helpers/creators';
import { FindOptions } from '../interfaces/find-options';
import { GitAnnexAccessor } from '../git-annex-accessor';
import { Parser } from '../interfaces/parser';

/**
 * Returns information about available files in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the {@link GitAnnexAPI.find} method.
 *
 * @param guard The type predicate to validate each file.
 * @param columns Maps the columns returned by the --format option
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param relativePaths The files for the find command.
 * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
 * @param gitOptions The FindOptions for the command.
 * The --format option must end with `\\n`.
 * @param columnDelimiter The column delimiter used by the --format option.
 * If unspecified, `\t` is used to split at `\\t` in --format.
 * @typeParam T - The application-defined type of the returned objects.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function getFinds<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, relativePaths?: string | string[], gitOptions?: FindOptions | string[], columnDelimiter?: string): Promise<T[]> {
  const myAnx = GitAnnexAccessor.create(repositoryPath);
  const result = await myAnx.find(relativePaths, gitOptions);
  return createFromTextLines(guard, columns, result.out, columnDelimiter);
}
