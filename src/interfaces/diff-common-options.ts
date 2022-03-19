/**
 * DiffCommonOptions defines the supported diff options used by commands.
 * @category Command Options
 */
export interface DiffCommonOptions {

  /**
   * Shows the shortest prefix that is at least <n> hexdigits long that uniquely refers the object.
   */
  '--abbrev'?: number | string | null;

  /**
   * Generates a diff using the "anchored diff" algorithm.
   */
  '--anchored'?: string | string[];

  /**
   * Outputs a binary diff.
   */
  '--binary'?: null;

  /**
   * Breaks complete rewrite changes into pairs of delete and create.
   */
  '--break-rewrites'?: string | null;

  /**
   * Warns if changes introduce conflict markers or whitespace errors.
   */
  '--check'?: null;

  /**
   * Lists the file name from all parents.
   */
  '--combined-all-paths'?: null;

  /**
   * Outputs a condensed summary of extended header information.
   */
  '--compact-summary'?: null;

  /**
   * Synonym for --dirstat=cumulative.
   */
  '--cumulative'?: null;

  /**
   * Selects a diff algorithm.
   */
  '--diff-algorithm'?: string;

  /**
   * Selects files by status.
   */
  '--diff-filter'?: string;

  /**
   * Specifies the diff format for merge commits.
   */
  '--diff-merges'?: string;

  /**
   * Generates a diffstat.
   */
  '--dirstat'?: string | string[] | null;

  /**
   * Generates a diffstat.
   */
  '--dirstat-by-file'?: string | string[] | null;

  /**
   * Shows the given destination prefix instead of "a/".
   */
  '--dst-prefix'?: string;

  /**
   * Allows an external diff helper to be executed.
   */
  '--ext-diff'?: null;

  /**
   * Detects and reports renames for each commit.
   */
  '--find-copies'?: number | string | null;

  /**
   * Inspects unmodified files as candidates for the source of copy.
   */
  '--find-copies-harder'?: null;

  /**
   * Looks for differences that change the number of occurrences of the specified object.
   */
  '--find-object'?: string;

  /**
   * Detects and reports renames for each commit.
   */
  '--find-renames'?: number | string | null;

  /**
   * Shows the full pre- and post-image blob object names on the "index" line.
   */
  '--full-index'?: null;

  /**
   * Shows whole function as context lines for each change.
   */
  '--function-context'?: null;

  /**
   * Generates a diff using the "histogram diff" algorithm.
   */
  '--histogram'?: null;

  /**
   * gnores whitespace when comparing lines.
   */
  '--ignore-all-space'?: null;

  /**
   * gnores whitespace when comparing lines.
   */
  '--ignore-blank-lines'?: null;

  /**
   * Ignores carriage-return at the end of line.
   */
  '--ignore-cr-at-eol'?: null;

  /**
   * Ignores changes whose all lines match regex.
   */
  '--ignore-matching-lines'?: string;

  /**
   * Ignores whitespace at the end of line.
   */
  '--ignore-space-at-eol'?: null;

  /**
   * Ignores changes in the amount of whitespace.
   */
  '--ignore-space-change'?: null;

  /**
   * Ignores changes to submodules in the diff generation.
   */
  '--ignore-submodules'?: string | null;

  /**
   * Enables the heuristic that shifts diff hunk boundaries to make patches easier to read.
   */
  '--indent-heuristic'?: null;

  /**
   * Shows the context between diff hunks, up to the specified number of lines.
   */
  '--inter-hunk-context'?: number | string;

  /**
   * Omits the preimage for deletes.
   */
  '--irreversible-delete'?: null;

  /**
   * Prepends an additional prefix to every line of output.
   */
  '--line-prefix'?: string;

  /**
   * Spends extra time to make sure the smallest possible diff is produced.
   */
  '--minimal'?: null;

  /**
   * Shows only the names of changed files.
   */
  '--name-only'?: null;

  /**
   * Shows only the names and status of changed files.
   */
  '--name-status'?: null;

  /**
   * Disable output of diffs for merge commits.
   */
  '--no-diff-merges'?: null;

  /**
   * Disallows external diff drivers.
   */
  '--no-ext-diff'?: null;

  /**
   * Disables the heuristic that shifts diff hunk boundaries to make patches easier to read.
   */
  '--no-indent-heuristic'?: null;

  /**
   * Suppresses diff output.
   */
  '--no-patch'?: null;

  /**
   * Does not show any source or destination prefix.
   */
  '--no-prefix'?: null;

  /**
   * Countermands diff.relative.
   */
  '--no-relative'?: null;

  /**
   * Disables rename detection.
   */
  '--no-renames'?: null;

  /**
   * Does noy use empty blobs as rename source.
   */
  '--no-rename-empty'?: null;

  /**
   * Disallows external text conversion filters to be run when comparing binary files.
   */
  '--no-textconv'?: null;

  /**
   * Similar to --stat, but shows number of added and deleted lines in decimal notation and pathname without abbreviation, to make it more machine friendly.
   */
  '--numstat'?: null;

  /**
   * Outputs to a specific file instead of stdout.
   */
  '--output'?: string;

  /**
   * Specifies the character used to indicate context lines in the generated patch.
   */
  '--output-indicator-context'?: string;

  /**
   * Specifies the character used to indicate new lines in the generated patch.
   */
  '--output-indicator-new'?: string;

  /**
   * Specifies the character used to indicate old lines in the generated patch.
   */
  '--output-indicator-old'?: string;

  /**
   * Generates a patch.
   */
  '--patch'?: null;

  /**
   * Synonym for --patch --raw.
   */
  '--patch-with-raw'?: null;

  /**
   * Synonym for --patch --stat.
   */
  '--patch-with-stat'?: null;

  /**
   * Generates a diff using the "patience diff" algorithm.
   */
  '--patience'?: null;

  /**
   * Shows all the changes in that changeset.
   */
  '--pickaxe-all'?: null;

  /**
   * Treats the string given to -S as an extended POSIX regular expression to match.
   */
  '--pickaxe-regex'?: null;

  /**
   * Generates the diff in raw format.
   */
  '--raw'?: null;

  /**
   * Makes the output relative.
   */
  '--relative'?: string | null;

  /**
   * Uses empty blobs as rename source.
   */
  '--rename-empty'?: null;

  /**
   * Outputs only the last line of --stat.
   */
  '--shortstat'?: null;

  /**
   * Shows the given source prefix instead of "a/".
   */
  '--src-prefix'?: string;

  /**
   * Generates a diffstat.
   */
  '--stat'?: string | null;

  /**
   * Specifies how differences in submodules are shown.
   */
  '--submodule'?: string | null;

  /**
   * Outputs a condensed summary of extended header information.
   */
  '--summary'?: null;

  /**
   * Treats all files as text.
   */
  '--text'?: null;

  /**
   * Allows external text conversion filters to be run when comparing binary files.
   */
  '--textconv'?: null;

  /**
   * Generates diffs with the specified number of context lines.
   */
  '--unified'?: number | string;

  /**
   * Shows a word diff.
   */
  '--word-diff'?: string | null;

  /**
   * Specifies the regex to define a word.
   */
  '--word-diff-regex'?: string;

  /**
   * Prevents the exhaustive portion of rename/copy detection from running if the number of source/destination files involved exceeds the specified number.
   */
  '-l'?: number | string;

  /**
   * Does not munge pathnames and uses NULs as output field terminators.
   */
  '-z'?: null;

  /**
   * Looks for differences whose patch text contains added/removed lines that match <regex>.
   */
  '-G'?: string;

  /**
   * Controls the order in which files appear in the output.
   */
  '-O'?: string;

  /**
   * Swaps two inputs.
   */
  '-R'?: null;

  /**
   * Looks for differences that change the number of occurrences of the specified string.
   */
  '-S'?: string;
}
