import { RemoteCommand, RemoteOptions } from './remote-options';
import { AddAnxOptions } from './add-anx-options';
import { AnnexOptions } from './annex-options';
import { ApiOptions } from './api-options';
import { CloneOptions } from './clone-options';
import { CommandResult } from './command-result';
import { CommitOptions } from './commit-options';
import { ConfigAnxOptions } from './config-anx-options';
import { ConfigGitOptions } from './config-git-options';
import { InitGitOptions } from './init-git-options';
import { LockOptions } from './lock-options';
import { RepositoryInfo } from './repository-info';
import { RmOptions } from './rm-options';
import { StatusAnxOptions } from './status-anx-options';
import { TagOptions } from './tag-options';
import { UnlockOptions } from './unlock-options';
import { VersionAnxOptions } from './version-anx-options';
import { VersionGitOptions } from './version-git-options';

/**
 * The GitAnnexAPI interface defines the git-annex commands.
 * @category Annex Commands
 */
export interface GitAnnexAPI {

  /**
   * Provides the ability to run any git-annex command.
   * @param args The arguments to pass to the git-annex program.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex command result.
   * @category Low-level
   */
  runAnx(args: string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Adds files to git and git-annex.
   *
   * Consult the
   * [git-annex add documentation](https://git-annex.branchable.com/git-annex-add/)
   * for additional information.
   * @param relativePaths The files to add to git and git-annex.
   * If specified, helper method [[gitPath]] or [[gitPaths]] is called internally.
   * @param anxOptions The AddAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex add result.
   * @category Contents
   */
  addAnx(relativePaths?: string | string[], anxOptions?: AddAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or set git-annex configuration settings.
   *
   * Configuration settings control the behavior of git-annex.
   * For example, annex.largefiles is a filter to determine which
   * files are stored by git-annex.
   * Files not matching the filter are stored normally by Git.
   *
   * ```javascript
   * const result = await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg or largerthan(500kb)'] });
   * ```
   *
   * Consult the
   * [git-annex config documentation](https://git-annex.branchable.com/git-annex-config/)
   * for additional information.
   * @param anxOptions The ConfigAnxOptions for the command.
   * One of [[ConfigAnxOptions.--set]], [[ConfigAnxOptions.--get]], or [[ConfigAnxOptions.--unset]] must be specified.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex config result.
   * @category Configuration
   */
  configAnx(anxOptions: ConfigAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Changes the description of a repository.
   *
   * Consult the
   * [git-annex describe documentation](https://git-annex.branchable.com/git-annex-describe/)
   * for additional information.
   * @param repository The uuid or description of the repository to modify.
   * The string `here` may be used to specify the current repository.
   * Helper method [[getRepositories]] returns an array of repositories.
   * @param description A description of the new repository.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex describe result.
   * @category Setup
   */
  describe(repository: string, description: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or sets the group association of a repository.
   *
   * ```javascript
   * const result = await myAnx.group('here', 'client');
   * ```
   *
   * Consult the
   * [git-annex group documentation](https://git-annex.branchable.com/git-annex-group)
   * for additional information.
   * @param repository The description or uuid of the repository.
   * The string `here` may be used to specify the current repository.
   * Helper method [[getRepositories]] returns an array of repositories.
   * @param groupname The single-word group name to associate with the repository.
   * The groupname may be one previously created by the [[groupwanted]] method or
   * one of the [standard groups](https://git-annex.branchable.com/preferred_content/standard_groups/).
   * If omitted, a list of current group membership is returned.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex group result.
   * @category Configuration
   */
  group(repository: string, groupname?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or sets the groupwanted expression of a repository group.
   *
   * Consult the
   * [git-annex groupwanted documentation](https://git-annex.branchable.com/git-annex-groupwanted)
   * for additional information.
   * @param groupname The single-word name of the group.
   * @param expression The
   * [preferred content expression](https://git-annex.branchable.com/git-annex-preferred-content/)
   * to set for the group.
   * If omitted, the current preferred content expression is returned.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex groupwanted result.
   * @category Configuration
   */
  groupwanted(groupname: string, expression?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Initializes a repository for use with git-annex.
   *
   * ```javascript
   * const result = await myAnx.initAnx('usb-drive-two');
   * ```
   *
   * Consult the
   * [git-annex init documentation](https://git-annex.branchable.com/git-annex-init/)
   * for additional information.
   * @param description The description of the repository.
   * If omitted, a description is generated using the username, hostname, and the path.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex init result.
   * @category Setup
   */
  initAnx(description?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Locks files to prevent modification.
   *
   * Consult the
   * [git-annex lock documentation](https://git-annex.branchable.com/git-annex-lock/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper method [[gitPath]] or [[gitPaths]] is called internally.
   * @param anxOptions The LockOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex lock result.
   * @category Contents
   */
  lock(relativePaths?: string | string[], anxOptions?: LockOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Initializes a repository for use with git-annex specifying the uuid.
   *
   * The reinit command may be used to begin replacement of an irretrievably lost repository.
   * The [[describe]] command should subsequently be used to set the repository description.
   *
   * Consult the
   * [git-annex reinit documentation](https://git-annex.branchable.com/git-annex-reinit/)
   * for additional information.
   * @param uuid The uuid of the repository being replaced.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex reinit result.
   * @category Setup
   */
  reinit(uuid: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows the working tree status.
   *
   * Consult the
   * [git-annex status documentation](https://git-annex.branchable.com/git-annex-status/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper method [[gitPath]] or [[gitPaths]] is called internally.
   * @param anxOptions The StatusAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex status result.
   * @category Contents
   */
  statusAnx(relativePaths?: string | string[], anxOptions?: StatusAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Removes a repository from a group previously set by the [[group]] command.
   *
   * Consult the
   * [git-annex ungroup documentation](https://git-annex.branchable.com/git-annex-ungroup)
   * for additional information.
   * @param repository The description or uuid of the repository.
   * The string `here` may be used to specify the current repository.
   * Helper method [[getRepositories]] returns an array of repositories.
   * @param groupname The single-word group name to dissociate with the repository.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex ungroup result.
   * @category Configuration
   */
  ungroup(repository: string, groupname: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Stops the use of git-annex in a repository.
   *
   * Consult the
   * [git-annex uninit documentation](https://git-annex.branchable.com/git-annex-uninit/)
   * for additional information.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex uninit result.
   * @category Setup
   */
  uninit(anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Unlocks files for modification.
   *
   * Consult the
   * [git-annex unlock documentation](https://git-annex.branchable.com/git-annex-unlock/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper method [[gitPath]] or [[gitPaths]] is called internally.
   * @param anxOptions The UnlockOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex unlock result.
   * @category Contents
   */
  unlock(relativePaths?: string | string[], anxOptions?: UnlockOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Obtains build information about the local git-annex installation.
   *
   * Consult the
   * [git-annex version documentation](https://git-annex.branchable.com/git-annex-version)
   * for additional information.
   * @param anxOptions The VersionAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex version information.
   * @category Version
   */
  versionAnx(anxOptions?: VersionAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or sets the wanted preferred content expression of a repository.
   *
   * ```javascript
   * const result = await myAnx.wanted('here', 'standard');
   * ```
   *
   * Consult the
   * [git-annex wanted documentation](https://git-annex.branchable.com/git-annex-wanted)
   * for additional information.
   * @param repository The description or uuid of the repository.
   * The string `here` may be used to specify the current repository.
   * Helper method [[getRepositories]] returns an array of repositories.
   * @param expression The
   * [preferred content expression](https://git-annex.branchable.com/git-annex-preferred-content/)
   * to set for the repository.
   * If omitted, the current preferred content expression is returned.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex wanted result.
   * @category Configuration
   */
  wanted(repository: string, expression?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Provides the ability to run any git command.
   * @param args The arguments to pass to the git program.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git command result.
   * @category Low-level
   */
  runGit(args: string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Clones a repository into an empty directory.
   *
   * Consult the
   * [git clone documentation](https://git-scm.com/docs/git-clone)
   * for additional information.
   * @param repository The (possibly remote) repository to be cloned.
   * @param repositoryPath The destination directory of the clone.
   * If omitted, the "humanish" part of repository is used.
   * @param gitOptions The CloneOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git clone result.
   * @category Setup
   */
  clone(repository: string, repositoryPath?: string, gitOptions?: CloneOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Records changes to the repository.
   *
   * Consult the
   * [git commit documentation](https://git-scm.com/docs/git-commit)
   * for additional information.
   * @param relativePaths The files to record in git and git-annex.
   * If specified, helper method [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The CommitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git commit result.
   * @category Contents
   */
  commit(relativePaths?: string | string[], gitOptions?: CommitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or set git configuration settings.
   *
   * Consult the
   * [git config documentation](https://git-scm.com/docs/git-config/)
   * for additional information.
   * @param gitOptions The ConfigGitOptions for the command.
   * One of [[ConfigGitOptions.--get]], [[ConfigGitOptions.--set]],
   * [[ConfigGitOptions.--unset]], or [[ConfigGitOptions.--list]] must be specified.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git config result.
   * @category Configuration
   */
  configGit(gitOptions: ConfigGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Creates an empty Git repository or reinitializes an existing one.
   *
   * Consult the
   * [git init documentation](https://git-scm.com/docs/git-init)
   * for additional information.
   * @param gitOptions The InitGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git init result.
   * @category Setup
   */
  initGit(gitOptions?: InitGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Manages the set of tracked repositories.
   *
   * Consult the
   * [git remote documentation](https://git-scm.com/docs/git-remote)
   * for additional information.
   * @param subCommand The remote subcommand to run.
   * @param commandParameters The options and arguments for the subCommand.
   * @param gitOptions The RemoteOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git remote result.
   * @category Remotes
   */
  remote(subCommand?: RemoteCommand, commandParameters?: string | string[], gitOptions?: RemoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Removes file content from the repository.
   *
   * Consult the
   * [git rm documentation](https://git-scm.com/docs/git-rm)
   * for additional information.
   * @param relativePaths The files to remove git and git-annex.
   * The helper method [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The RmOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git rm result.
   * @category Contents
   */
  rm(relativePaths: string | string[], gitOptions?: RmOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Creates, deletes, or lists tag objects.
   * When called without parameters all tags are listed.
   *
   * Consult the
   * [git tag documentation](https://git-scm.com/docs/git-tag)
   * for additional information.
   * @param tagname The name of the tag to create, delete, or describe.
   * @param gitOptions The TagOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git tag result.
   * @category Contents
   */
  tag(tagname?: string, gitOptions?: TagOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Obtains build information about the local git installation.
   *
   * Consult the
   * [git version documentation](https://git-scm.com/docs/git-version)
   * for additional information.
   * @param gitOptions The VersionGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git version result.
   * @category Version
   */
  versionGit(gitOptions?: VersionGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Obtains an array of key-value backends.
   * @returns An array containing the backend names.
   * The order of the repositories returned is indeterminate.
   * @category Helper
   */
  getBackends(): Promise<string[]>;

  /**
   * Searches a multi-line string and returns the first line begining with the specified prefix.
   * The prefix may be included or omitted from the return string.
   *
   * @param str The string to be searched.
   * @param prefix The string to locate at the beginning of a line.
   * @param includePrefix A flag indicating whether the prefix is to be included in the return value.
   * @returns The requested line or null if the prefix was not located.
   * @category Helper
   */
  getLineStarting(str: string, prefix: string, includePrefix: boolean): string | null;

  /**
   * Searches a multi-line string and returns the first line begining with the specified prefix as a string array.
   * The return array is created by removing the prefix from the beginning-of-line and
   * splitting the remainder at each space character.
   *
   * @param str The string to be searched.
   * @param prefix The string to locate at the beginning of a line.
   * Including a space at the end of prefix causes the usually desirable effect
   * of eliminating an empty string as the first element of the return array.
   * @returns The requested line as a string array or null if the prefix was not located.
   * @category Helper
   */
  getLineStartingAsArray(str: string, prefix: string): string[] | null;

  /**
   * Obtains an array identifying the current repositories.
   * @returns An array describing the repositories.
   * The order of the repositories returned is indeterminate.
   * An empty array is retuned if the repository has not been initialized by git-annex.
   * @category Helper
   */
  getRepositories(): Promise<RepositoryInfo[]>;

  /**
   * Converts an operating-system relative path to a git relative path.
   *
   * Git and git-annex commands use forward slash path separators
   * regardless of platform.
   * The gitPath method performs the conversion when necessary for the operating system.
   * @category Helper
   */
  gitPath(relativePath: string): string;

  /**
   * Converts an array of operating-system relative paths to git relative paths.
   *
   * Git and git-annex commands use forward slash path separators
   * regardless of platform.
   * The gitPath method performs the conversions when necessary for the operating system.
   * @category Helper
   */
  gitPaths(relativePaths: string[]): string[];

}
