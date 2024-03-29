import { createFromTextLines } from '../helpers/creators.js';
import { GitAnnexAccessor } from '../git-annex-accessor.js';
import { Parser } from '../interfaces/parser.js';
import { WhereisOptions } from '../interfaces/whereis-options.js';

/**
 * Returns information about repositories containing files in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the {@link GitAnnexAPI.whereis} method.
 *
 * @param guard The type predicate to validate each file.
 * @param columns Maps the columns returned by anxOptions.{@link WhereisOptions.--format}
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param anxOptions The WhereisOptions for the command.
 * The {@link WhereisOptions.--format} option is required and must end with `\\n`.
 * @param relativePaths The files for the whereis command.
 * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
 * @param columnDelimiter The column delimiter used by anxOptions.{@link WhereisOptions.--format}.
 * If unspecified, `\t` is used to split at `\\t` in anxOptions.{@link WhereisOptions.--format}.
 * @typeParam T - The application-defined type of the returned objects.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function getWhereis<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, anxOptions: WhereisOptions | string[], relativePaths?: string | string[], columnDelimiter?: string): Promise<T[]> {
  const myAnx = GitAnnexAccessor.create(repositoryPath);
  const result = await myAnx.whereis(relativePaths, anxOptions);
  return createFromTextLines(guard, columns, result.out, columnDelimiter);
}
