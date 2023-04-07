/**
 * GrepOptions defines the supported options for the Git grep command.
 * @category Command Options
 */
export interface GrepOptions {

  /**
   * Shows the specified number of trailing lines, and places a line containing `--` between contiguous groups of matches.
   * See also {@link --before-context} and {@link --context}.
   */
  '--after-context'?: number | string;

  /**
   * When multiple pattern expressions are combined with `or`, this flag limits the match to files that have lines to match all of them.
   */
  '--all-match'?: null;

  /**
   * Shows the specified number of leading lines, and places a line containing `--` between contiguous groups of matches.
   * See also {@link --after-context} and {@link --context}.
   */
  '--before-context'?: number | string;

  /**
   * Prints an empty line between matches from different files.
   */
  '--break'?: null;

  /**
   * Searches blobs in the index.
   */
  '--cached'?: null;

  /**
   * Prefixes the 1-indexed byte-offset of the first match from the start of the matching line.
   */
  '--column'?: null;

  /**
   * Shows the specified number of leading and trailing lines, and places a line containing `--` between contiguous groups of matches.
   * See also {@link --after-context} and {@link --before-context}.
   */
  '--context'?: number | string;

  /**
   * Shows the number of lines that match, instead of showing every matched line.
   */
  '--count'?: null;

  /**
   * Does not pay attention to ignored files specified via the .gitignore mechanism.
   * Only useful with {@link --no-index}.
   * See also {@link --no-exclude-standard}.
   */
  '--exclude-standard'?: null;

  /**
   * Shows only the names of files that contain matches.
   * See also {@link --files-without-match}.
   */
  '--files-with-matches'?: null;

  /**
   * Shows only the names of files that do not contain matches.
   * See also {@link --files-with-matches}.
   */
  '--files-without-match'?: null;

  /**
   * Doesn’t interpret the pattern as a regex.
   */
  '--fixed-strings'?: null;

  /**
   * Shows the surrounding text from the previous line containing a function name up to the one before the next function name,
   * effectively showing the whole function in which the match was found.
   */
  '--function-context'?: null;

  /**
   * Shows the filename above the matches in that file instead of at the start of each shown line.
   */
  '--heading'?: null;

  /**
   * Ignores case differences between the patterns and the files.
   */
  '--ignore-case'?: null;

  /**
   * Selects non-matching lines.
   */
  '--invert-match'?: null;

  /**
   * Prefixes the line number to matching lines.
   */
  '--line-number'?: null;

  /**
   * Limits the number of matches per file.
   */
  '--max-count'?: number | string;

  /**
   * Descends at most the specified number of directory levels. A value of -1 means no limit.
   */
  '--max-depth'?: number | string;

  /**
   * Searches ignored files by not honoring the .gitignore mechanism.
   * Only useful with {@link --untracked}.
   * See also {@link --exclude-standard}.
   */
  '--no-exclude-standard'?: null;

  /**
   * Searches files in the current directory that is not managed by Git.
   */
  '--no-index'?: null;

  /**
   * Same as --max-depth=0.
   * See also {@link --recursive}.
   */
  '--no-recursive'?: null;

  /**
   * Does not honor textconv filter settings.
   * See also {@link --textconv}.
   */
  '--no-textconv'?: null;

  /**
   * Prints only the matched (non-empty) parts of a matching line, with each such part on a separate output line.
   */
  '--only-matching'?: null;

  /**
   * Does not output matched lines; instead, exits with status 0 when there is a match and with non-zero status when there isn’t.
   */
  '--quiet'?: null;

  /**
   * Recursively searches in each submodule that is active and checked out in the repository.
   */
  '--recurse-submodules'?: null;

  /**
   * Same as --max-depth=-1; this is the default.
   * See also {@link --no-recursive}.
   */
  '--recursive'?: null;

  /**
   * Shows the preceding line that contains the function name of the match, unless the matching line is a function name itself.
   */
  '--show-function'?: null;

  /**
   * Processes binary files as if they were text.
   */
  '--text'?: null;

  /**
   * Honors textconv filter settings.
   * See also {@link --no-textconv}.
   */
  '--textconv'?: null;

  /**
   * Specifies the number of grep worker threads to use.
   */
  '--threads'?: number | string;

  /**
   * Searches also in untracked files.
   */
  '--untracked'?: null;

  /**
   * Matches the pattern only at word boundary.
   */
  '--word-regexp'?: null;

  /**
   * Specifies the pattern. Multiple patterns are combined by `or`.
   * See also {@link --all-match}.
   */
  '-e'?: string | string[];

  /**
   * Suppresses the output of the filename for each match.
   */
  '-h'?: null;

  /**
   * Usees `\0` as the delimiter for pathnames in the output and prints them verbatim.
   */
  '-z'?: null;

  /**
   * Doesn’t match the pattern in binary files.
   */
  '-I'?: null;

}
