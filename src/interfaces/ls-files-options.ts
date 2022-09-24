/**
 * LsFilesOptions defines the supported options for the Git ls-files command.
 * @category Command Options
 */
export interface LsFilesOptions {

  /**
   * Instead of showing the full 40-byte hexadecimal object lines, shows the shortest prefix that is at least <n> hexdigits long that uniquely refers the object.
   */
  '--abbrev'?: number | string | null;

  /**
   * Shows cached files in the output.
   */
  '--cached'?: null;

  /**
   * After each line that describes a file, adds more data about its cache entry.
   * This is intended to show as much information as possible for manual inspection; the exact format may change at any time.
   */
  '--debug'?: null;

  /**
   * When only filenames are shown, suppresses duplicates that may come from having multiple stages during a merge, or giving --deleted and --modified option at the same time.
   */
  '--deduplicate'?: null;

  /**
   * Shows deleted files in the output.
   */
  '--deleted'?: null;

  /**
   * If a whole directory is classified as "other", shows just its name (with a trailing slash) and not its whole contents.
   */
  '--directory'?: null;

  /**
   * Shows <eolinfo> and <eolattr> of files.
   */
  '--eol'?: null;

  /**
   * If any <file> does not appear in the index, treat this as an error (return 1).
   */
  '--error-unmatch'?: null;

  /**
   * Skips untracked files matching the pattern.
   */
  '--exclude'?: string;

  /**
   * Adds the standard Git exclusions.
   */
  '--exclude-standard'?: null;

  /**
   * Forces paths to be output relative to the project top directory.
   */
  '--full-name'?: null;

  /**
   * Shows other (i.e. untracked) files in the output.
   */
  '--ignored'?: null;

  /**
   * Shows files on the filesystem that need to be removed due to file/directory conflicts for checkout-index to succeed.
   */
  '--killed'?: null;

  /**
   * Shows modified files in the output.
   */
  '--modified'?: null;

  /**
   * Does not list empty directories. Has no effect without --directory.
   */
  '--no-empty-directory'?: null;

  /**
   * Shows other (i.e. untracked) files in the output.
   */
  '--others'?: null;

  /**
   * Recursively calls ls-files on each active submodule in the repository.
   */
  '--recurse-submodules'?: null;

  /**
   * If the index is sparse, shows the sparse directories without expanding to the contained files.
   */
  '--sparse'?: null;

  /**
   * Shows staged contents' mode bits, object name and stage number in the output.
   */
  '--stage'?: null;

  /**
   * Shows unmerged files in the output (forces --stage).
   */
  '--unmerged'?: null;

  /**
   * \0 line termination on output and does not quote filenames.
   */
  '-z'?: null;
}
