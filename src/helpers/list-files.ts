import { createFromTextLines } from '../helpers/creators';
import { GitAnnexAccessor } from '../git-annex-accessor';
import { LsFilesOptions } from '../interfaces/ls-files-options';
import { Parser } from '../interfaces/parser';

/**
 * Returns information about files in the index and the working tree in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the {@link GitAnnexAPI.lsFiles} method.
 *
 * @param guard The type predicate to validate each file.
 * @param columns Maps the columns returned by gitOptions.{@link LsFilesOptions.--format}
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param gitOptions The LsFilesOptions for the command.
 * The {@link LsFilesOptions.--format} option is required.
 * @param relativePaths The files for the ls-files command.
 * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
 * @param columnDelimiter The column delimiter used by gitOptions.{@link LsFilesOptions.--format}.
 * If unspecified, `\t` is used to split at `%x09` in gitOptions.{@link LsFilesOptions.--format}.
 * @typeParam T - The application-defined type of the returned objects.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function listFiles<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, gitOptions: LsFilesOptions | string[], relativePaths?: string | string[], columnDelimiter?: string): Promise<T[]> {
  const myAnx = GitAnnexAccessor.create(repositoryPath);
  const result = await myAnx.lsFiles(relativePaths, gitOptions);
  return createFromTextLines(guard, columns, result.out, columnDelimiter);
}
