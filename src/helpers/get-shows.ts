import { createFromTextLines } from '../helpers/creators';
import { GitAnnexAccessor } from '../git-annex-accessor';
import { Parser } from '../interfaces/parser';
import { ShowOptions } from '../interfaces/show-options';

/**
 * Returns information about Git objects in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the {@link GitAnnexAPI.show} method.
 *
 * @param guard The type predicate to validate each object.
 * @param columns Maps the columns returned by gitOptions.{@link ShowOptions.--format}
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param gitOptions The ShowOptions for the command.
 * @param commandParameters The parameters for the show command.
 * @param columnDelimiter The column delimiter used by gitOptions.{@link ShowOptions.--format}.
 * If unspecified, `\t` is used to split at `%x09` in gitOptions.{@link ShowOptions.--format}.
 * @typeParam T - The application-defined type of the returned objects.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function getShows<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, gitOptions: ShowOptions | string[], commandParameters?: string | string[], columnDelimiter?: string): Promise<T[]> {
  const myAnx = GitAnnexAccessor.create(repositoryPath);
  const result = await myAnx.show(commandParameters, gitOptions);
  return createFromTextLines(guard, columns, result.out, columnDelimiter);
}
