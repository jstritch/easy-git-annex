import { AnnexOptions } from './annex-options';

/**
 * SyncOptions defines the supported options for the git-annex sync command.
 * @category Command Options
 */
export interface SyncOptions extends AnnexOptions {

  /**
   * Requests all available versions of files be synced.
   */
  '--all'?: null;

  /**
   * Controls whether to merge histories that do not share a common ancestor.
   * See also [[--no-allow-unrelated-histories]].
   */
  '--allow-unrelated-histories'?: null;

  /**
   * Removes the local and remote synced/ branches created and pushed by git-annex sync.
   */
  '--cleanup'?: null;

  /**
   * The complement of [[--no-commit]].
   */
  '--commit'?: null;

  /**
   * Causes the content of annexed files to also be uploaded and downloaded as necessary.
   * See also [[--no-content]].
   */
  '--content'?: null;

  /**
   * Limits the transferred files to the specified relative paths.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   */
  '--content-of'?: string | string[];

  /**
   * Specifies the number of cores to use for synchronizing multiple files in parallel.
   */
  '--jobs'?: number | string;

  /**
   * Specifies the commit message.
   */
  '--message'?: string;

  /**
   * The complement of [[--allow-unrelated-histories]].
   */
  '--no-allow-unrelated-histories'?: null;

  /**
   * Avoids committing local changes.
   * See also [[--commit]].
   */
  '--no-commit'?: null;

  /**
   * The complement of [[--content]].
   */
  '--no-content'?: null;

  /**
   * Disables all pulling.
   * See also [[--pull]].
   */
  '--no-pull'?: null;

  /**
   * Disables all pushing.
   * See also [[--push]].
   */
  '--no-push'?: null;

  /**
   * Disables automatic merge conflict resolution.
   * See also [[--resolvemerge]].
   */
  '--no-resolvemerge'?: null;

  /**
   * The complement of [[--only-annex]].
   */
  '--not-only-annex'?: null;

  /**
   * Syncs only the git-annex branch and annexed content, not other Git branches.
   * See also [[--not-only-annex]].
   */
  '--only-annex'?: null;

  /**
   * The complement of [[--no-pull]].
   */
  '--pull'?: null;

  /**
   * The complement of [[--no-push]].
   */
  '--push'?: null;

  /**
   * The complement of [[--no-resolvemerge]].
   */
  '--resolvemerge'?: null;
}
