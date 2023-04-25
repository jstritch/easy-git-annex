import { createFromTextLines } from '../helpers/creators';
import { GitAnnexAccessor } from '../git-annex-accessor';
import { LogOptions } from '../interfaces/log-options';
import { Parser } from '../interfaces/parser';

/**
 * Returns information about Git commits in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the {@link GitAnnexAPI.log} method.
 *
 * @param guard The type predicate to validate each commit.
 * @param columns Maps the columns returned by gitOptions.{@link LogOptions.--format}
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param gitOptions The LogOptions for the command.
 * The {@link LogOptions.--format} option is required.
 * @param commandParameters The parameters for the log command.
 * @param relativePaths The files for the log command.
 * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
 * @param columnDelimiter The column delimiter used by gitOptions.{@link LogOptions.--format}.
 * If unspecified, `\t` is used to split at `%x09` in gitOptions.{@link LogOptions.--format}.
 * @typeParam T - The application-defined type of the returned objects.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function getLogs<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, gitOptions: LogOptions | string[], commandParameters?: string | string[], relativePaths?: string | string[], columnDelimiter?: string): Promise<T[]> {
  const myAnx = GitAnnexAccessor.create(repositoryPath);
  const result = await myAnx.log(commandParameters, relativePaths, gitOptions);
  return createFromTextLines(guard, columns, result.out, columnDelimiter);
}
