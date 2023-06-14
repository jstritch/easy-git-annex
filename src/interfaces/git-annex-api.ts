import { RemoteCommand, RemoteOptions } from './remote-options.js';
import { StashCommand, StashOptions } from './stash-options.js';
import { SubmoduleCommand, SubmoduleOptions } from './submodule-options.js';
import { AddAnxOptions } from './add-anx-options.js';
import { AddGitOptions } from './add-git-options.js';
import { AdjustOptions } from './adjust-options.js';
import { AnnexOptions } from './annex-options.js';
import { ApiOptions } from './api-options.js';
import { BranchOptions } from './branch-options.js';
import { CheckoutOptions } from './checkout-options.js';
import { CherryPickOptions } from './cherry-pick-options.js';
import { CleanOptions } from './clean-options.js';
import { CloneOptions } from './clone-options.js';
import { CommandResult } from './command-result.js';
import { CommitOptions } from './commit-options.js';
import { ConfigAnxOptions } from './config-anx-options.js';
import { ConfigGitOptions } from './config-git-options.js';
import { DiffOptions } from './diff-options.js';
import { DropOptions } from './drop-options.js';
import { DropunusedOptions } from './dropunused-options.js';
import { ExpireOptions } from './expire-options.js';
import { FetchOptions } from './fetch-options.js';
import { FindOptions } from './find-options.js';
import { ForEachRefOptions } from './for-each-ref-options.js';
import { FsckAnxOptions } from './fsck-anx-options.js';
import { FsckGitOptions } from './fsck-git-options.js';
import { GetOptions } from './get-options.js';
import { GrepOptions } from './grep-options.js';
import { InfoOptions } from './info-options.js';
import { InitAnxOptions } from './init-anx-options.js';
import { InitGitOptions } from './init-git-options.js';
import { InitremoteOptions } from './initremote-options.js';
import { ListOptions } from './list-options.js';
import { LockOptions } from './lock-options.js';
import { LogOptions } from './log-options.js';
import { LsFilesOptions } from './ls-files-options.js';
import { MergeAnxOptions } from './merge-anx-options.js';
import { MergeGitOptions } from './merge-git-options.js';
import { MoveOptions } from './move-options.js';
import { MvOptions } from './mv-options.js';
import { PullOptions } from './pull-options.js';
import { PushOptions } from './push-options.js';
import { RebaseOptions } from './rebase-options.js';
import { RepositoryInfo } from './repository-info.js';
import { ResetOptions } from './reset-options.js';
import { RestoreOptions } from './restore-options.js';
import { RevertOptions } from './revert-options.js';
import { RevParseOptions } from './rev-parse-options.js';
import { RmOptions } from './rm-options.js';
import { ShowOptions } from './show-options.js';
import { StatusAnx } from './status-anx.js';
import { StatusAnxOptions } from './status-anx-options.js';
import { StatusGit } from './status-git.js';
import { StatusGitOptions } from './status-git-options.js';
import { SwitchOptions } from './switch-options.js';
import { SyncOptions } from './sync-options.js';
import { TagOptions } from './tag-options.js';
import { UnannexOptions } from './unannex-options.js';
import { UnlockOptions } from './unlock-options.js';
import { UnusedOptions } from './unused-options.js';
import { VersionAnx } from './version-anx.js';
import { VersionAnxOptions } from './version-anx-options.js';
import { VersionGit } from './version-git.js';
import { VersionGitOptions } from './version-git-options.js';
import { WhereisOptions } from './whereis-options.js';
import { WhereusedOptions } from './whereused-options.js';

/**
 * The GitAnnexAPI interface defines the Git and git-annex commands.
 * @category Git and git-annex Commands
 */
export interface GitAnnexAPI {

  /**
   * Provides the ability to run any git-annex command.
   * @param args The arguments to pass to the git-annex program.
   * The application is responsible for calling {@link gitPath} and {@link gitPaths}
   * for all relative paths when constructing the argument list.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex command result.
   * @category Low-level
   */
  runAnx(args: string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Adds files to Git and git-annex.
   *
   * Consult the
   * [git-annex add documentation](https://git-annex.branchable.com/git-annex-add/)
   * for additional information.
   * @param relativePaths The files to add to Git and git-annex.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The AddAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex add result.
   * @category Contents
   */
  addAnx(relativePaths?: string | string[], anxOptions?: AddAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Enters an adjusted branch.
   *
   * Consult the
   * [git-annex adjust documentation](https://git-annex.branchable.com/git-annex-adjust/)
   * for additional information.
   * @param anxOptions The AdjustOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex adjust result.
   * @category Branching
   */
  adjust(anxOptions: AdjustOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or set git-annex configuration settings.
   *
   * Consult the
   * [git-annex config documentation](https://git-annex.branchable.com/git-annex-config/)
   * for additional information.
   * @param anxOptions The ConfigAnxOptions for the command.
   * One of {@link ConfigAnxOptions.--set}, {@link ConfigAnxOptions.--get}, or {@link ConfigAnxOptions.--unset} must be specified.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex config result.
   * @category Configuration
   */
  configAnx(anxOptions: ConfigAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Copies file content to or from another repository.
   *
   * Consult the
   * [git-annex copy documentation](https://git-annex.branchable.com/git-annex-copy/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The CopyOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex copy result.
   * @category Contents
   */
  copy(relativePaths?: string | string[], anxOptions?: MoveOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Hides a lost repository.
   *
   * Consult the
   * [git-annex dead documentation](https://git-annex.branchable.com/git-annex-dead)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method {@link GitAnnexAPI.getRepositories} returns an array of repositories.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex dead result.
   * @category Remotes
   */
  dead(repository: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Changes the description of a repository.
   *
   * Consult the
   * [git-annex describe documentation](https://git-annex.branchable.com/git-annex-describe/)
   * for additional information.
   * @param repository The name, uuid, or description of the repository to modify.
   * The string `here` may be used to specify the current repository.
   * Method {@link GitAnnexAPI.getRepositories} returns an array of repositories.
   * @param description A description of the new repository.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex describe result.
   * @category Setup
   */
  describeAnx(repository: string, description: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Removes file content from a repository.
   *
   * Consult the
   * [git-annex drop documentation](https://git-annex.branchable.com/git-annex-drop/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The DropOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex drop result.
   * @category Contents
   */
  drop(relativePaths?: string | string[], anxOptions?: DropOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Drops unused file content.
   *
   * Consult the
   * [git-annex dropunused documentation](https://git-annex.branchable.com/git-annex-dropunused/)
   * for additional information.
   * @param indices The indicies to drop.
   * @param anxOptions The DropunusedOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex dropunused result.
   * @category Contents
   */
  dropunused(indices: string | string[], anxOptions?: DropunusedOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Enables use of an existing remote in the current repository.
   *
   * Consult the
   * [git-annex enableremote documentation](https://git-annex.branchable.com/git-annex-enableremote/)
   * for additional information.
   * @param name The name of the repository.
   * If not specified, the remotes are listed in CommandResult.err.
   * @param parameters Configuration of the remote.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex enableremote result.
   * @category Remotes
   */
  enableremote(name?: string, parameters?: [string, string] | [string, string][], anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Expires inactive repositories.
   *
   * Consult the
   * [git-annex expire documentation](https://git-annex.branchable.com/git-annex-expire/)
   * for additional information.
   * @param expirations The expiration specifiers.
   * @param anxOptions The ExpireOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex expire result.
   * @category Remotes
   */
  expire(expirations: string, anxOptions?: ExpireOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Lists available files.
   * Consider using generic function {@link getFinds} if JavaScript objects are desired.
   *
   * Consult the
   * [git-annex find documentation](https://git-annex.branchable.com/git-annex-find/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The FindOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex find result.
   * @category Contents
   */
  find(relativePaths?: string | string[], anxOptions?: FindOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Verifies the validity of objects in git-annex.
   *
   * Consult the
   * [git-annex fsck documentation](https://git-annex.branchable.com/git-annex-fsck/)
   * for additional information.
   * @param relativePaths The files to check.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The FsckAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex fsck result.
   * @category Maintenance
   */
  fsckAnx(relativePaths?: string | string[], anxOptions?: FsckAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Makes content of annexed files available.
   *
   * Consult the
   * [git-annex get documentation](https://git-annex.branchable.com/git-annex-get/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The GetOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex get result.
   * @category Contents
   */
  get(relativePaths?: string | string[], anxOptions?: GetOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or sets the group association of a repository.
   *
   * Consult the
   * [git-annex group documentation](https://git-annex.branchable.com/git-annex-group)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method {@link GitAnnexAPI.getRepositories} returns an array of repositories.
   * @param groupname The single-word group name to associate with the repository.
   * The groupname may be one previously created by the {@link GitAnnexAPI.groupwanted} method or
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
   * Obtains information about an item or the repository.
   * Consider using method {@link GitAnnexAPI.getRepositories} if a list of repositories is required
   * or {@link GitAnnexAPI.getRepositoryInfo} if the current repository is required.
   *
   * Consult the
   * [git-annex info documentation](https://git-annex.branchable.com/git-annex-info/)
   * for additional information.
   * @param items The items of interest.
   * @param anxOptions The InfoOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex info result.
   * @category Inspection
   */
  info(items?: string | string[], anxOptions?: InfoOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Initializes a repository for use with git-annex.
   *
   * Consult the
   * [git-annex init documentation](https://git-annex.branchable.com/git-annex-init/)
   * for additional information.
   * @param description The description of the repository.
   * If omitted, a description is generated using the username, hostname, and path.
   * @param anxOptions The InitAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex init result.
   * @category Setup
   */
  initAnx(description?: string, anxOptions?: InitAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Creates a special remote.
   *
   * Consult the
   * [git-annex initremote documentation](https://git-annex.branchable.com/git-annex-initremote/)
   * for additional information.
   * @param name The name of the repository.
   * @param type The remote type.
   * Method {@link GitAnnexAPI.getSpecialRemoteTypes} obtains a list of valid types.
   * @param parameters The remote configuration.
   * @param anxOptions The InitremoteOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex initremote result.
   * @category Remotes
   */
  initremote(name: string, type: string, parameters?: [string, string] | [string, string][], anxOptions?: InitremoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows which remotes contain files.
   *
   * Consult the
   * [git-annex list documentation](https://git-annex.branchable.com/git-annex-list/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The ListOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex list result.
   * @category Inspection
   */
  list(relativePaths?: string | string[], anxOptions?: ListOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Locks files to prevent modification.
   *
   * Consult the
   * [git-annex lock documentation](https://git-annex.branchable.com/git-annex-lock/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The LockOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex lock result.
   * @category Contents
   */
  lock(relativePaths?: string | string[], anxOptions?: LockOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   *  Joins two or more development histories.
   *
   * Consult the
   * [git-annex merge documentation](https://git-annex.branchable.com/git-annex-lock/)
   * for additional information.
   * @param branchName The name of the branch to merge.
   * @param anxOptions The MergeAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex merge result.
   * @category Branching
   */
  mergeAnx(branchName?: string, anxOptions?: MergeAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or sets the minimum number of copies.
   *
   * Consult the
   * [git-annex mincopies documentation](https://git-annex.branchable.com/git-annex-mincopies/)
   * for additional information.
   * @param n The value to set. If omitted, the  current value is returned.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex mincopies result.
   * @category Configuration
   */
  mincopies(n?: number | string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Moves file content to or from another repository.
   *
   * Consult the
   * [git-annex move documentation](https://git-annex.branchable.com/git-annex-move/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The MoveOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex move result.
   * @category Contents
   */
  move(relativePaths?: string | string[], anxOptions?: MoveOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or sets the desired number of copies.
   *
   * Consult the
   * [git-annex numcopies documentation](https://git-annex.branchable.com/git-annex-numcopies/)
   * for additional information.
   * @param n The value to set. If omitted, the  current value is returned.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex numcopies result.
   * @category Configuration
   */
  numcopies(n?: number | string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Initializes a repository for use with git-annex specifying the uuid.
   *
   * The reinit command may be used to begin replacement of an irretrievably lost repository.
   * The {@link describeAnx} command should subsequently be used to set the repository description.
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
   * Changes name of a special remote.
   *
   * Consult the
   * [git-annex renameremote documentation](https://git-annex.branchable.com/git-annex-renameremote/)
   * for additional information.
   * @param name The name of the remote.
   * @param newName The new name of the remote.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex renameremote result.
   * @category Remotes
   */
  renameremote(name: string, newName: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Recovers a broken Git repository.
   *
   * Consult the
   * [git-annex repair documentation](https://git-annex.branchable.com/git-annex-repair/)
   * for additional information.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex repair result.
   * @category Maintenance
   */
  repair(anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or sets the required content expression of a repository.
   *
   * Consult the
   * [git-annex required documentation](https://git-annex.branchable.com/git-annex-required)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method {@link GitAnnexAPI.getRepositories} returns an array of repositories.
   * @param expression The
   * [preferred content expression](https://git-annex.branchable.com/git-annex-preferred-content/)
   * to set for the repository.
   * If omitted, the current required content expression is returned.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex required result.
   * @category Configuration
   */
  required(repository: string, expression?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Sets a repository to the default trust level.
   *
   * Consult the
   * [git-annex semitrust documentation](https://git-annex.branchable.com/git-annex-semitrust)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method {@link GitAnnexAPI.getRepositories} returns an array of repositories.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex semitrust result.
   * @category Remotes
   */
  semitrust(repository: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows the working tree status.
   * Consider using method {@link getStatusAnx} if JavaScript objects are desired.
   *
   * Consult the
   * [git-annex status documentation](https://git-annex.branchable.com/git-annex-status/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The StatusAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @deprecated The git-annex status command was deprecated in version 10.20230321, use {@link statusGit} instead.
   * @returns The git-annex status result.
   * @category Contents
   */
  statusAnx(relativePaths?: string | string[], anxOptions?: StatusAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Synchronizes the local repository with remotes.
   *
   * Consult the
   * [git-annex sync documentation](https://git-annex.branchable.com/git-annex-sync/)
   * for additional information.
   * @param remotes The remote names or remote groups to be synchronized.
   * If unspecified, all remotes are synchronized.
   * @param anxOptions The SyncOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex sync result.
   * @category Remotes
   */
  sync(remotes?: string | string[], anxOptions?: SyncOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Undoes a git-annex add command.
   *
   * Consult the
   * [git-annex unannex documentation](https://git-annex.branchable.com/git-annex-unannex/)
   * for additional information.
   * @param relativePaths The files to unannex.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The UnannexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex unannex result.
   * @category Contents
   */
  unannex(relativePaths?: string | string[], anxOptions?: UnannexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Removes a repository from a group previously set by the {@link group} command.
   *
   * Consult the
   * [git-annex ungroup documentation](https://git-annex.branchable.com/git-annex-ungroup)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method {@link GitAnnexAPI.getRepositories} returns an array of repositories.
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
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The UnlockOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex unlock result.
   * @category Contents
   */
  unlock(relativePaths?: string | string[], anxOptions?: UnlockOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Records that a repository is not trusted and could lose content at any time.
   *
   * Consult the
   * [git-annex untrust documentation](https://git-annex.branchable.com/git-annex-untrust)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method {@link GitAnnexAPI.getRepositories} returns an array of repositories.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex untrust result.
   * @category Remotes
   */
  untrust(repository: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Looks for unused file content.
   *
   * Consult the
   * [git-annex unused documentation](https://git-annex.branchable.com/git-annex-unused/)
   * for additional information.
   * @param anxOptions The UnusedOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex unused result.
   * @category Contents
   */
  unused(anxOptions?: UnusedOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Obtains build information about the local git-annex installation.
   * Consider using method {@link getVersionAnx} if a JavaScript object is desired.
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
   * Gets or sets the wanted content expression of a repository.
   *
   * Consult the
   * [git-annex wanted documentation](https://git-annex.branchable.com/git-annex-wanted)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method {@link GitAnnexAPI.getRepositories} returns an array of repositories.
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
   * Lists repositories containing files.
   * Consider using generic function {@link getWhereis} if JavaScript objects are desired.
   *
   * Consult the
   * [git-annex whereis documentation](https://git-annex.branchable.com/git-annex-whereis/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param anxOptions The WhereisOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex whereis result.
   * @category Contents
   */
  whereis(relativePaths?: string | string[], anxOptions?: WhereisOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Finds which files use or used a key.
   *
   * Consult the
   * [git-annex whereused documentation](https://git-annex.branchable.com/git-annex-whereused/)
   * for additional information.
   * @param anxOptions The WhereusedOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex whereused result.
   * @category Contents
   */
  whereused(anxOptions?: WhereusedOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Provides the ability to run any Git command.
   * @param args The arguments to pass to the Git program.
   * The application is responsible for calling {@link gitPath} and {@link gitPaths}
   * for all relative paths when constructing the argument list.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git command result.
   * @category Low-level
   */
  runGit(args: string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Adds file contents to the index.
   *
   * Consult the
   * [Git add documentation](https://git-scm.com/docs/git-add)
   * for additional information.
   * @param relativePaths The files to record in git.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The AddGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git add result.
   * @category Contents
   */
  addGit(relativePaths?: string | string[], gitOptions?: AddGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Manages branches.
   * Consider using method {@link getBranchNames} if a list of remote names is required
   * or generic function {@link getBranches} if JavaScript objects are desired.
   *
   * Consult the
   * [Git branch documentation](https://git-scm.com/docs/git-branch)
   * for additional information.
   * @param commandParameters The parameters for the branch command.
   * @param gitOptions The BranchOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git branch result.
   * @category Branching
   */
  branch(commandParameters?: string | string[], gitOptions?: BranchOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Switches branches or restores working tree files.
   *
   * Consult the
   * [Git checkout documentation](https://git-scm.com/docs/git-checkout)
   * for additional information.
   * @param commandParameters The parameters for the checkout command.
   * @param relativePaths The files for the checkout command.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The CheckoutOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git checkout result.
   * @category Branching
   */
  checkout(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: CheckoutOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   *  Applies changes introduced by existing commits.
   *
   * Consult the
   * [Git cherry-pick documentation](https://git-scm.com/docs/git-cherry-pick)
   * for additional information.
   * @param commandParameters The parameters for the cherry-pick command.
   * @param gitOptions The CherryPickOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git cherry-pick result.
   * @category Branching
   */
  cherryPick(commandParameters?: string | string[], gitOptions?: CherryPickOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Removes untracked files from the working tree.
   *
   * Consult the
   * [Git clean documentation](https://git-scm.com/docs/git-clean)
   * for additional information.
   * @param relativePaths The paths for the clean command.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The CleanOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git clean result.
   * @category Contents
   */
  clean(relativePaths?: string | string[], gitOptions?: CleanOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Clones a repository into an empty directory.
   *
   * Consult the
   * [Git clone documentation](https://git-scm.com/docs/git-clone)
   * for additional information.
   * @param repository The (possibly remote) repository to be cloned.
   * @param repositoryPath The destination directory of the clone.
   * If omitted, the repositoryPath passed to createAccessor is used.
   * @param gitOptions The CloneOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git clone result.
   * @category Setup
   */
  clone(repository: string, repositoryPath?: string, gitOptions?: CloneOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Records changes to the repository.
   *
   * Consult the
   * [Git commit documentation](https://git-scm.com/docs/git-commit)
   * for additional information.
   * @param relativePaths The files to record in Git and git-annex.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The CommitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git commit result.
   * @category Contents
   */
  commit(relativePaths?: string | string[], gitOptions?: CommitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or set Git configuration settings.
   *
   * Consult the
   * [Git config documentation](https://git-scm.com/docs/git-config/)
   * for additional information.
   * @param gitOptions The ConfigGitOptions for the command.
   * One of {@link ConfigGitOptions.--get}, {@link ConfigGitOptions.set},
   * {@link ConfigGitOptions.--unset}, or {@link ConfigGitOptions.--list} must be specified.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git config result.
   * @category Configuration
   */
  configGit(gitOptions: ConfigGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows changes between commits, commit and working tree, etc.
   *
   * Consult the
   * [Git diff documentation](https://git-scm.com/docs/git-diff)
   * for additional information.
   * @param commandParameters The parameters for the diff command.
   * @param relativePaths The files for the diff command.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The DiffOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git diff result.
   * @category Contents
   */
  diff(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: DiffOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Downloads objects and refs from another repository.
   *
   * Consult the
   * [Git fetch documentation](https://git-scm.com/docs/git-fetch)
   * for additional information.
   * @param commandParameters The parameters for the fetch command.
   * @param gitOptions The FetchOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git fetch result.
   * @category Remotes
   */
  fetch(commandParameters?: string | string[], gitOptions?: FetchOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Reports information about each ref.
   * Consider using generic function {@link getRefs} if JavaScript objects are desired.
   *
   * Consult the
   * [Git for-each-ref documentation](https://git-scm.com/docs/git-for-each-ref)
   * for additional information.
   * @param gitOptions The ForEachRefOptions for the command.
   * @param pattern Filters refs using either fnmatch(3) or
   * matching completely or from the beginning up to a slash.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git for-each-ref result.
   * @category Inspection
   */
  forEachRef(gitOptions?: ForEachRefOptions | string[], pattern?: string | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Verifies the connectivity and validity of objects in Git.
   *
   * Consult the
   * [Git fsck documentation](https://git-scm.com/docs/git-fsck)
   * for additional information.
   * @param object An object to treat as the head of an unreachability trace.
   * If omitted, the index file, all SHA-1 references in refs namespace, and all reflogs are used.
   * @param gitOptions The FsckGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git fsck result.
   * @category Maintenance
   */
  fsckGit(object?: string, gitOptions?: FsckGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Finds lines matching a pattern.
   *
   * Consult the
   * [Git grep documentation](https://git-scm.com/docs/git-grep)
   * for additional information.
   * @param commandParameters If specified, searches blobs in the given trees.
   * @param relativePaths The paths for the grep command.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The GrepOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git grep result.
   * @category Contents
   */
  grep(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: GrepOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Creates an empty Git repository or reinitializes an existing one.
   *
   * Consult the
   * [Git init documentation](https://git-scm.com/docs/git-init)
   * for additional information.
   * @param gitOptions The InitGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git init result.
   * @category Setup
   */
  initGit(gitOptions?: InitGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows commit log entries.
   * Consider using generic function {@link getLogs} if JavaScript objects are desired.
   *
   * Consult the
   * [Git log documentation](https://git-scm.com/docs/git-log)
   * for additional information.
   * @param commandParameters The parameters for the log command.
   * @param relativePaths The files for the log command.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The LogOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git log result.
   * @category Branching
   */
  log(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: LogOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows information about files in the index and the working tree.
   * Consider using method {@link getFileNames} if an array of filenames desired
   * or generic function {@link listFiles} if JavaScript objects are required.
   *
   * Consult the
   * [Git ls-files documentation](https://git-scm.com/docs/git-ls-files)
   * for additional information.
   * @param relativePaths The files to show.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The LsFilesOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git ls-files result.
   * @category Contents
   */
  lsFiles(relativePaths?: string | string[], gitOptions?: LsFilesOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   *  Joins two or more development histories.
   *
   * Consult the
   * [Git merge documentation](https://git-scm.com/docs/git-merge)
   * for additional information.
   * @param commandParameters The parameters for the merge command.
   * @param gitOptions The MergeGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git merge result.
   * @category Branching
   */
  mergeGit(commandParameters?: string | string[], gitOptions?: MergeGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Moves or renames a file, a directory, or a symlink.
   *
   * Consult the
   * [Git mv documentation](https://git-scm.com/docs/git-mv)
   * for additional information.
   * @param relativePaths The files to move.
   * The helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param destination The move destination path.
   * If relativePaths specifies more than one file, destination must be a directory.
   * The helper function {@link gitPath} is called internally.
   * @param gitOptions The MvOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git mv result.
   * @category Contents
   */
  mv(relativePaths: string | string[], destination: string, gitOptions?: MvOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Fetches from and integrates with another repository or a local branch.
   *
   * Consult the
   * [Git pull documentation](https://git-scm.com/docs/git-pull)
   * for additional information.
   * @param commandParameters The parameters for the pull command.
   * @param gitOptions The PullOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git pull result.
   * @category Remotes
   */
  pull(commandParameters?: string | string[], gitOptions?: PullOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Updates remote refs along with associated objects.
   *
   * Consult the
   * [Git push documentation](https://git-scm.com/docs/git-push)
   * for additional information.
   * @param commandParameters The parameters for the push command.
   * @param gitOptions The PushOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git push result.
   * @category Remotes
   */
  push(commandParameters?: string | string[], gitOptions?: PushOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Reapplies commits on top of another base tip.
   *
   * Consult the
   * [Git rebase documentation](https://git-scm.com/docs/git-rebase)
   * for additional information.
   * @param commandParameters The parameters for the rebase command.
   * @param gitOptions The RebaseOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git rebase result.
   * @category Branching
   */
  rebase(commandParameters?: string | string[], gitOptions?: RebaseOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Manages the set of tracked repositories.
   * Consider using method {@link getRemoteNames} if a list of remote names is required.
   *
   * Consult the
   * [Git remote documentation](https://git-scm.com/docs/git-remote)
   * for additional information.
   * @param subCommand The remote subcommand to run.
   * If omitted, a list of existing remotes is returned.
   * @param commandParameters The options and arguments for the subCommand.
   * @param gitOptions The RemoteOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git remote result.
   * @category Remotes
   */
  remote(subCommand?: RemoteCommand, commandParameters?: string | string[], gitOptions?: RemoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Resets the current HEAD to the specified state.
   *
   * Consult the
   * [Git reset documentation](https://git-scm.com/docs/git-reset)
   * for additional information.
   * @param commandParameters The parameters for the reset command.
   * @param relativePaths The files affected by the operation.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The ResetOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git reset result.
   * @category Branching
   */
  reset(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: ResetOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Restores working tree files.
   *
   * Consult the
   * [Git restore documentation](https://git-scm.com/docs/git-restore)
   * for additional information.
   * @param relativePaths The files to restore.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The RestoreOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git restore result.
   * @category Branching
   */
  restore(relativePaths?: string | string[], gitOptions?: RestoreOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   *  Reverts existing commits.
   *
   * Consult the
   * [Git revert documentation](https://git-scm.com/docs/git-revert)
   * for additional information.
   * @param commandParameters The parameters for the revert command.
   * @param gitOptions The RevertOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git revert result.
   * @category Branching
   */
  revert(commandParameters?: string | string[], gitOptions?: RevertOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Picks out and massages parameters.
   *
   * Consult the
   * [Git rev-parse documentation](https://git-scm.com/docs/git-rev-parse)
   * for additional information.
   * @param commandParameters The parameters for the rev-parse command.
   * @param gitOptions The RevParseOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git rev-parse result.
   * @category Inspection
   */
  revParse(commandParameters?: string | string[], gitOptions?: RevParseOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Removes file content from the repository.
   *
   * Consult the
   * [Git rm documentation](https://git-scm.com/docs/git-rm)
   * for additional information.
   * @param gitOptions The RmOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git rm result.
   * @category Contents
   */
  rm(relativePaths: string | string[], gitOptions?: RmOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Displays various types of objects.
   * Consider using generic function {@link getShows} if JavaScript objects are desired.
   *
   * Consult the
   * [Git show documentation](https://git-scm.com/docs/git-show)
   * for additional information.
   * @param commandParameters The parameters for the show command.
   * @param gitOptions The ShowOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git show result.
   * @category Inspection
   */
  show(commandParameters?: string | string[], gitOptions?: ShowOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Saves the changes in a dirty working directory.
   *
   * Consult the
   * [Git stash documentation](https://git-scm.com/docs/git-stash)
   * for additional information.
   * @param subCommand The stash subcommand to run.
   * If omitted, a list of existing stashes is returned.
   * @param commandParameters The parameters for the stash command.
   * @param relativePaths The files for the stash command.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The StashOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git stash result.
   * @category Branching
   */
  stash(subCommand?: StashCommand, commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: StashOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows the working tree status.
   * Consider using method {@link getStatusGit} if JavaScript objects are desired.
   *
   * Consult the
   * [Git status documentation](https://git-scm.com/docs/git-status)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param gitOptions The StatusGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git status result.
   * @category Contents
   */
  statusGit(relativePaths?: string | string[], gitOptions?: StatusGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Initializes, updates, or inspects submodules.
   *
   * Consult the
   * [Git submodule documentation](https://git-scm.com/docs/git-submodule)
   * for additional information.
   * @param subCommand The submodule subcommand to run.
   * If omitted, the status of existing submodules is returned.
   * @param relativePaths The files for the submodule command.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param commandParameter The parameter for the submodule command.
   * If subCommand is {@link SubmoduleCommand.Add}, commandParameter is `repository`.
   * If subCommand is {@link SubmoduleCommand.ForEach}, commandParameter is `command`.
   * If subCommand is {@link SubmoduleCommand.SetUrl}, commandParameter is `newurl`.
   * If subCommand is {@link SubmoduleCommand.Summary}, commandParameter is `commit`.
   * @param gitOptions The SubmoduleOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git submodule result.
   * @category Setup
   */
  submodule(subCommand?: SubmoduleCommand, relativePaths?: string | string[], commandParameter?: string, gitOptions?: SubmoduleOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows changes between commits, commit and working tree, etc.
   *
   * Consult the
   * [Git switch documentation](https://git-scm.com/docs/git-switch)
   * for additional information.
   * @param commandParameters The parameters for the switch command.
   * @param gitOptions The SwitchOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git switch result.
   * @category Branching
   */
  switch(commandParameters?: string | string[], gitOptions?: SwitchOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Creates, deletes, or lists tag objects.
   * Consider using method {@link getTagNames} if a list of tag names is required
   * or generic function {@link getTags} if JavaScript objects are desired.
   *
   * Consult the
   * [Git tag documentation](https://git-scm.com/docs/git-tag)
   * for additional information.
   * @param tagName The name of the tag to create, delete, or describe.
   * @param gitOptions The TagOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git tag result.
   * @category Branching
   */
  tag(tagName?: string, gitOptions?: TagOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Obtains build information about the local Git installation.
   * Consider using method {@link getVersionGit} if a JavaScript object is desired.
   *
   * Consult the
   * [Git version documentation](https://git-scm.com/docs/git-version)
   * for additional information.
   * @param gitOptions The VersionGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The Git version result.
   * @category Version
   */
  versionGit(gitOptions?: VersionGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Obtains an array of key-value backends.
   * @returns An array containing the backend names.
   * The order of the repositories returned is indeterminate.
   * @category Inspection
   */
  getBackends(): Promise<string[]>;

  /**
   * Obtains an array of branch names.
   * @param pattern Filters branches using either fnmatch(3) or
   * matching completely or from the beginning up to a slash.
   * @param ignoreCase Specify true to make sorting and filtering branches case insensitive.
   * @returns An array containing the branch names.
   * The array elements are ordered by `*refname`.
   * @category Branching
   */
  getBranchNames(pattern?: string, ignoreCase?: boolean): Promise<string[]>;

  /**
   * Obtains an array of the git-annex build flags.
   * @returns An array containing the git-annex build flags.
   * The order of the flags returned is indeterminate.
   * @category Inspection
   */
  getBuildFlags(): Promise<string[]>;

  /**
   * Obtains an array of filenames in the index and the working tree.
   *
   * Consult the
   * [Git ls-files documentation](https://git-scm.com/docs/git-ls-files)
   * for additional information.
   * @param relativePaths The files to show.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @param showCached Includes cached files in the output.
   * @param showDeleted Includes deleted files in the output.
   * @param showModified Includes modified files in the output.
   * @param showOthers Includes other (i.e. untracked) files in the output.
   * @returns A deduplicated array of the requested filenames.
   * Forward slash, `/`, path separators are used regardless of platform.
   * @category Contents
   */
  getFileNames(relativePaths?: string | string[], showCached?: boolean, showDeleted?: boolean, showModified?: boolean, showOthers?: boolean): Promise<string[]>;

  /**
   * Obtains an array of remote names.
   * @returns An array containing the remote names.
   * @category Remotes
   */
  getRemoteNames(): Promise<string[]>;

  /**
   * Obtains an array identifying the known repositories.
   * @returns An array describing the repositories.
   * The order of the repositories returned is indeterminate.
   * An empty array is retuned if the directory has not been initialized by git-annex.
   * @category Inspection
   */
  getRepositories(): Promise<RepositoryInfo[]>;

  /**
   * Obtains an object identifying the current repository.
   * @returns A RepositoryInfo identifying the current repository or undefined if the directory has not been initialized by git-annex.
   * @category Inspection
   */
  getRepositoryInfo(): Promise<RepositoryInfo | undefined>;

  /**
   * Obtains an array of special remote types.
   * @returns An array containing the special remote type names.
   * The order of the names returned is indeterminate.
   * @category Inspection
   */
  getSpecialRemoteTypes(): Promise<string[]>;

  /**
   * Obtains an array describing the working tree status.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @deprecated The git-annex status command was deprecated in version 10.20230321, use {@link getStatusGit} instead.
   * @returns An array describing the working tree.
   * @category Contents
   */
  getStatusAnx(relativePaths?: string | string[]): Promise<StatusAnx[]>;

  /**
   * Obtains an array describing the working tree status.
   * @param relativePaths The files of interest.
   * If specified, helper function {@link gitPath} or {@link gitPaths} is called internally.
   * @returns An array describing the working tree.
   * @category Contents
   */
  getStatusGit(relativePaths?: string | string[]): Promise<StatusGit[]>;

  /**
   * Obtains an array of tag names.
   * @param pattern Filters tags using either fnmatch(3) or
   * matching completely or from the beginning up to a slash.
   * @param ignoreCase Specify true to make sorting and filtering tags case insensitive.
   * @returns An array containing the tag names.
   * The array elements are ordered by `*refname`.
   * @category Branching
   */
  getTagNames(pattern?: string, ignoreCase?: boolean): Promise<string[]>;

  /**
   * Obtains an object describing the local git-annex version.
   * @returns An object describing the local git-annex version.
   * @category Version
   */
  getVersionAnx(): Promise<VersionAnx>;

  /**
   * Obtains an object describing the local Git version.
   * @returns An object describing the local Git version.
   * @category Version
   */
  getVersionGit(): Promise<VersionGit>;
}
