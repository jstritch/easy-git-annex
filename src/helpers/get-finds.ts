import { createFromTextLines } from '../helpers/creators.js';
import { FindOptions } from '../interfaces/find-options.js';
import { GitAnnexAccessor } from '../git-annex-accessor.js';
import { Parser } from '../interfaces/parser.js';

/**
 * Returns information about available files in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the {@link GitAnnexAPI.find} method.
 *
 * @param guard The type predicate to validate each file.
 * @param columns Maps the columns returned by anxOptions.{@link FindOptions.--format}
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param anxOptions The FindOptions for the command.
 * The {@link FindOptions.--format} option is required and must end with `\\n`.
 * @param relativePaths The files for the find command.
 * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
 * @param columnDelimiter The column delimiter used by anxOptions.{@link FindOptions.--format}.
 * If unspecified, `\t` is used to split at `\\t` in anxOptions.{@link FindOptions.--format}.
 * @typeParam T - The application-defined type of the returned objects.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function getFinds<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, anxOptions: FindOptions | string[], relativePaths?: string | string[], columnDelimiter?: string): Promise<T[]> {
  const myAnx = GitAnnexAccessor.create(repositoryPath);
  const result = await myAnx.find(relativePaths, anxOptions); // eslint-disable-line unicorn/no-array-method-this-argument -- rule should not flag find not on an array
  return createFromTextLines(guard, columns, result.out, columnDelimiter);
}
