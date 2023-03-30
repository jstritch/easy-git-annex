import { BranchListOptions } from '../interfaces/branch-list-options';
import { createFromTextLines } from '../helpers/creators';
import { GitAnnexAccessor } from '../git-annex-accessor';
import { isStringArray } from '../helpers/type-predicates';
import { Parser } from '../interfaces/parser';

/**
 * Returns information about Git branches in application-defined JavaScript objects.
 * The JavaScript objects are created from the return of the {@link GitAnnexAPI.branch} method.
 *
 * @param guard The type predicate to validate each branch.
 * @param columns Maps the columns returned by gitOptions.{@link BranchListOptions.--format}
 * to property names. A parser to convert the string to another data
 * type may be provided for each column.
 * @param repositoryPath The path of the repository to interrogate.
 * @param gitOptions The BranchListOptions for the command.
 * @param pattern Filters branches using either fnmatch(3) or
 * matching completely or from the beginning up to a slash.
 * @param columnDelimiter The column delimiter used by gitOptions.{@link BranchListOptions.--format}.
 * If unspecified, `\t` is used to split at `%09` in gitOptions.{@link BranchListOptions.--format}.
 * @typeParam T - The application-defined type of the returned objects.
 * @returns An array containing objects passing the type guard function.
 * @category Generic
 */
export async function getBranches<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], repositoryPath: string, gitOptions: BranchListOptions | string[], pattern?: string, columnDelimiter?: string): Promise<T[]> {
  const myAnx = GitAnnexAccessor.create(repositoryPath);
  const opts = isStringArray(gitOptions) ? gitOptions : Object.assign({ '--list': null }, gitOptions);
  const result = await myAnx.branch(pattern, opts);
  return createFromTextLines(guard, columns, result.out, columnDelimiter);
}
