import { DiffCommonOptions } from './diff-common-options';
/**
 * LogOptions defines the supported options for the Git log command.
 * @category Command Options
 */
export interface LogOptions extends DiffCommonOptions {

  /**
   * Shows a prefix that names the object uniquely.
   * See also {@link --no-abbrev-commit}.
   */
  '--abbrev-commit'?: null;

  /**
   * Includes all the refs in refs/, along with HEAD.
   */
  '--all'?: null;

  /**
   * Limits the commits those matching all specified {@link --grep} expressions.
   */
  '--all-match'?: null;

  /**
   * Includes all the objects mentioned as ref tips of alternate repositories.
   */
  '--alternate-refs'?: null;

  /**
   * Displays commits that are both descendants of commit1, and ancestors of commit2 when given a range of commits.
   */
  '--ancestry-path'?: null;

  /**
   * Limits the commits those with author header lines matching the specified regular expression.
   */
  '--author'?: string | string[];

  /**
   * Shows no parents before all of its children are shown, but otherwise shows commits in the author timestamp order.
   */
  '--author-date-order'?: null;

  /**
   * Considers limiting patterns to be basic regular expressions; this is the default.
   */
  '--basic-regexp'?: null;

  /**
   * Pretends as if the bad bisection ref refs/bisect/bad was listed and as if it was followed by --not and the good bisection refs refs/bisect/good-* on the command line.
   */
  '--bisect'?: null;

  /**
   * Outputs excluded boundary commits.
   */
  '--boundary'?: null;

  /**
   * Includes all the refs in refs/heads.
   */
  '--branches'?: string;

  /**
   * A synonym for `--right-only --cherry-mark --no-merges`.
   */
  '--cherry'?: null;

  /**
   * Like {@link --cherry-pick} but marks equivalent commits with `=` rather than omitting them, and inequivalent ones with `+`.
   */
  '--cherry-mark'?: null;

  /**
   * Omits any commit that introduces the same change as another commit on the “other side” when the set of commits are limited with symmetric difference.
   */
  '--cherry-pick'?: null;

  /**
   * Prints the children of the commit.
   */
  '--children'?: null;

  /**
   * Limits the commits to those with committer header lines matching the specified regular expression.
   */
  '--committer'?: string | string[];

  /**
   * Specifies the date format for output.
   */
  '--date'?: string;

  /**
   * Shows no parents before all of its children are shown, but otherwise shows commits in the commit timestamp order.
   */
  '--date-order'?: null;

  /**
   * Prints the ref names of any commits.
   * See also {@link --no-decorate}.
   */
  '--decorate'?: string | null;

  /**
   * Overrides a match in log.excludeDecoration.
   * See also {@link --decorate-refs-exclude}.
   */
  '--decorate-refs'?: string;

  /**
   * Specifies the refs to exclude.
   * See also {@link --decorate-refs}.
   */
  '--decorate-refs-exclude'?: string;

  /**
   * Shows only the selected commits, plus some to have a meaningful history.
   */
  '--dense'?: null;

  /**
   * Re-codes the commit log message in the specified encoding.
   */
  '--encoding'?: string;

  /**
   * Excludes all the refs matching the specified pattern.
   */
  '--exclude'?: string | string[];

  /**
   * Follows only the first parent commit upon seeing a merge commit.
   */
  '--exclude-first-parent-only'?: null;

  /**
   * Performs tab expansion.
   * See also {@link --no-expand-tabs}.
   */
  '--expand-tabs'?: number | string | null;

  /**
   * Considers limiting patterns to be extended regular expressions.
   */
  '--extended-regexp'?: null;

  /**
   * Follows only the first parent commit upon seeing a merge commit.
   */
  '--first-parent'?: null;

  /**
   * Considers limiting patterns to be fized strings, not reguar expresions.
   */
  '--fixed-strings'?: null;

  /**
   * Lists the history of a file beyond renames.
   */
  '--follow'?: null;

  /**
   * Prints the commit logs using the supplied format string.
   */
  '--format'?: string;

  /**
   * Shows the full diff for commits that touch the specified paths.
   */
  '--full-diff'?: null;

  /**
   * Does not prune history.
   */
  '--full-history'?: null;

  /**
   * Includes all the refs matching the specified pattern.
   */
  '--glob'?: string;

  /**
   * Draws a text-based graphical representation of the commit history on the left side of the output.
   */
  '--graph'?: null;

  /**
   * Limits the commits those with log messages matching the specified regular expression.
   */
  '--grep'?: string | string[];

  /**
   * Limits the commits those with reflog matching the specified regular expression.
   */
  '--grep-reflog'?: string | string[];

  /**
   * Ignores invalid object names.
   */
  '--ignore-missing'?: null;

  /**
   * Limits the commits those not matching {@link --grep} expressions.
   */
  '--invert-grep'?: null;

  /**
   * Lists only commits on the left side of a symmetric difference.
   * See also {@link --right-only}.
   */
  '--left-only'?: null;

  /**
   * Marks which side of a symmetric difference a commit is reachable from.
   */
  '--left-right'?: null;

  /**
   * Includes a line “log size <number>” in the output for each commit.
   */
  '--log-size'?: null;

  /**
   * Uses the mailmap file to map author and committer names and email addresses to canonical real names and email addresses.
   * See also {@link --no-mailmap}.
   */
  '--mailmap'?: null;

  /**
   * Limits the number of commits to the specified number.
   */
  '--max-count'?: number | string;

  /**
   * Limits the number of commits to those with at most the specified number of parents.
   * See also {@link --no-max-parents}.
   */
  '--max-parents'?: number | string;

  /**
   * After a failed merge, show refs that touch files having a conflict and don’t exist on all heads to merge.
   */
  '--merge'?: null;

  /**
   * Prints only merge commits.
   * See also {@link --no-merges}.
   */
  '--merges'?: null;

  /**
   * Limits the number of commits to those with at least the specified number of parents.
   */
  '--min-parents'?: number | string;

  /**
   * Shows the full object name.
   * See also {@link --no-abbrev-commit}.
   */
  '--no-abbrev-commit'?: null;

  /**
   * The complement of {@link --decorate}.
   */
  '--no-decorate'?: null;

  /**
   * The complement of {@link --expand-tabs}.
   */
  '--no-expand-tabs'?: number | null;

  /**
   * The complement of {@link --no-mailmap}.
   */
  '--no-mailmap'?: null;

  /**
   * The complement of {@link --max-parents}.
   */
  '--no-max-parents'?: null;

  /**
   * Does not print merge commits.
   * See also {@link --merges}.
   */
  '--no-merges'?: null;

  /**
   * The complement of {@link --min-parents}.
   */
  '--no-min-parents'?: null;

  /**
   * The complement of {@link --notes}.
   */
  '--no-notes'?: null;

  /**
   * Shows the given commits, but does not traverse their ancestors.
   */
  '--no-walk'?: string | null;

  /**
   * Shows notes with an optional ref value to filter notes.
   * See also {@link --no-notes}.
   */
  '--notes'?: string | string[] | null;

  /**
   * Shorthand for `--pretty=oneline --abbrev-commit`.
   */
  '--oneline'?: null;

  /**
   * Prints the parents of the commit.
   */
  '--parents'?: null;

  /**
   * Includes all the objects mentioned by reflogs.
   */
  '--reflog'?: null;

  /**
   * Matches regular expression limiting patterns without regard to case.
   */
  '--regexp-ignore-case'?: null;

  /**
   * Includes all the refs in refs/remotes.
   */
  '--remotes'?: string;

  /**
   * Stops when a given path disappears from the tree.
   */
  '--remove-empty'?: null;

  /**
   * Shows all commits in reverse order.
   */
  '--reverse'?: null;

  /**
   * Lists only commits on the right side of a symmetric difference.
   * See also {@link --left-only}.
   */
  '--right-only'?: null;

  /**
   * Puts a barrier in between two consecutive commits that do not belong to a linear branch.
   */
  '--show-linear-break'?: string | null;

  /**
   * Includes any merge commits that are not TREESAME to the first parent but are TREESAME to a later parent.
   */
  '--show-pulls'?: null;

  /**
   * Validitates signed commits.
   */
  '--show-signature'?: null;

  /**
   * Select commits referred by some branch or tag.
   */
  '--simplify-by-decoration'?: null;

  /**
   * Removes some needless merges from the resulting history.
   */
  '--simplify-merges'?: null;

  /**
   * Shows commits after the specified timestamp.
   * Relative dates, such as `yesterday`, may be used.
   * See also {@link --until}.
   */
  '--since'?: Date | string;

  /**
   * Examines the current working tree only.
   */
  '--single-worktree'?: null;

  /**
   * Skips number commits before starting.
   */
  '--skip'?: number | string;

  /**
   * Prints ref name given on the command line by which each commit was reached.
   */
  '--source'?: null;

  /**
   * Shows all commits in the simplified history.
   */
  '--sparse'?: null;

  /**
   * Includes all the refs in refs/tags.
   */
  '--tags'?: string;

  /**
   * Shows no parents before all of its children are shown, and avoids showing commits on multiple lines of history intermixed.
   */
  '--topo-order'?: null;

  /**
   * Shows commits before the specified timestamp.
   * Relative dates, such as `yesterday`, may be used.
   * See also {@link --since}.
   */
  '--until'?: Date | string;

  /**
   * Walks reflog entries from the most recent one to older ones.
   */
  '--walk-reflogs'?: null;

  /**
   * Traces the evolution within the specified file.
   */
  '-L'?: string;
}
