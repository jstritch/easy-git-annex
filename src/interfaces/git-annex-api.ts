import { RemoteCommand, RemoteOptions } from './remote-options';
import { StashCommand, StashOptions } from './stash-options';
import { AddAnxOptions } from './add-anx-options';
import { AddGitOptions } from './add-git-options';
import { AnnexOptions } from './annex-options';
import { ApiOptions } from './api-options';
import { BranchOptions } from './branch-options';
import { CheckoutOptions } from './checkout-options';
import { CherryPickOptions } from './cherry-pick-options';
import { CloneOptions } from './clone-options';
import { CommandResult } from './command-result';
import { CommitOptions } from './commit-options';
import { ConfigAnxOptions } from './config-anx-options';
import { ConfigGitOptions } from './config-git-options';
import { DiffOptions } from './diff-options';
import { FetchOptions } from './fetch-options';
import { ForEachRefOptions } from './for-each-ref-options';
import { FsckAnxOptions } from './fsck-anx-options';
import { FsckGitOptions } from './fsck-git-options';
import { InfoOptions } from './info-options';
import { InitGitOptions } from './init-git-options';
import { InitremoteOptions } from './initremote-options';
import { ListOptions } from './list-options';
import { LockOptions } from './lock-options';
import { LogOptions } from './log-options';
import { MergeOptions } from './merge-options';
import { MvOptions } from './mv-options';
import { PullOptions } from './pull-options';
import { PushOptions } from './push-options';
import { RebaseOptions } from './rebase-options';
import { RepositoryInfo } from './repository-info';
import { ResetOptions } from './reset-options';
import { RestoreOptions } from './restore-options';
import { RevertOptions } from './revert-options';
import { RevParseOptions } from './rev-parse-options';
import { RmOptions } from './rm-options';
import { ShowOptions } from './show-options';
import { StatusAnx } from './status-anx';
import { StatusAnxOptions } from './status-anx-options';
import { StatusGit } from './status-git';
import { StatusGitOptions } from './status-git-options';
import { SwitchOptions } from './switch-options';
import { SyncOptions } from './sync-options';
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
   * The application is responsible for calling [[gitPath]] and [[gitPaths]]
   * for all relative paths when constructing the argument list.
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
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param anxOptions The AddAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex add result.
   * @category Contents
   */
  addAnx(relativePaths?: string | string[], anxOptions?: AddAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or set git-annex configuration settings.
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
   * @param repository The name, uuid, or description of the repository to modify.
   * The string `here` may be used to specify the current repository.
   * Method [[getRepositories]] returns an array of repositories.
   * @param description A description of the new repository.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex describe result.
   * @category Setup
   */
  describeAnx(repository: string, description: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

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
   * Verifies the validity of objects in git-annex.
   *
   * Consult the
   * [git-annex fsck documentation](https://git-annex.branchable.com/git-annex-fsck/)
   * for additional information.
   * @param relativePaths The files to check.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param anxOptions The LockOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex fsck result.
   * @category Maintenance
   */
  fsckAnx(relativePaths?: string | string[], anxOptions?: FsckAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Gets or sets the group association of a repository.
   *
   * Consult the
   * [git-annex group documentation](https://git-annex.branchable.com/git-annex-group)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method [[getRepositories]] returns an array of repositories.
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
   * Obtains information about an item or the repository.
   * Consider using method [[getRepositories]] if a list of repositories is required.
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
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex init result.
   * @category Setup
   */
  initAnx(description?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Creates a special remote.
   *
   * Consult the
   * [git-annex initremote documentation](https://git-annex.branchable.com/git-annex-initremote/)
   * for additional information.
   * @param name The name of the repository.
   * @param type The remote type.
   * Method [[getSpecialRemoteTypes]] obtains a list of valid types.
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
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
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
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
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
   * The [[describeAnx]] command should subsequently be used to set the repository description.
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
   * Recovers a broken git repository.
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
   * Shows the working tree status.
   *
   * Consult the
   * [git-annex status documentation](https://git-annex.branchable.com/git-annex-status/)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param anxOptions The StatusAnxOptions for the command.
   * @param apiOptions The ApiOptions for the command.
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
  sync(remotes: string | string[], anxOptions?: SyncOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Removes a repository from a group previously set by the [[group]] command.
   *
   * Consult the
   * [git-annex ungroup documentation](https://git-annex.branchable.com/git-annex-ungroup)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method [[getRepositories]] returns an array of repositories.
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
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
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
   * Consult the
   * [git-annex wanted documentation](https://git-annex.branchable.com/git-annex-wanted)
   * for additional information.
   * @param repository The name, uuid, or description of the repository.
   * The string `here` may be used to specify the current repository.
   * Method [[getRepositories]] returns an array of repositories.
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
   * Provides the ability to run any Git command.
   * @param args The arguments to pass to the Git program.
   * The application is responsible for calling [[gitPath]] and [[gitPaths]]
   * for all relative paths when constructing the argument list.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git command result.
   * @category Low-level
   */
  runGit(args: string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Adds file contents to the index.
   *
   * Consult the
   * [git add documentation](https://git-scm.com/docs/git-add)
   * for additional information.
   * @param relativePaths The files to record in git.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The AddGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git add result.
   * @category Contents
   */
  addGit(relativePaths?: string | string[], gitOptions?: AddGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Manages branches.
   * Consider using method [[getBranchNames]] if a list of remote names is required.
   *
   * Consult the
   * [git branch documentation](https://git-scm.com/docs/git-branch)
   * for additional information.
   * @param commandParameters The parameters for the branch command.
   * @param gitOptions The BranchOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git branch result.
   * @category Branching
   */
  branch(commandParameters?: string | string[], gitOptions?: BranchOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Switches branches or restores working tree files.
   *
   * Consult the
   * [git checkout documentation](https://git-scm.com/docs/git-checkout)
   * for additional information.
   * @param commandParameters The parameters for the checkout command.
   * @param relativePaths The files for the checkout command.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The CheckoutOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git checkout result.
   * @category Branching
   */
  checkout(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: CheckoutOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   *  Applies changes introduced by existing commits.
   *
   * Consult the
   * [git cherry-pick documentation](https://git-scm.com/docs/git-cherry-pick)
   * for additional information.
   * @param commandParameters The parameters for the cherry-pick command.
   * @param gitOptions The CherryPickOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git cherry-pick result.
   * @category Branching
   */
  cherryPick(commandParameters?: string | string[], gitOptions?: CherryPickOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Clones a repository into an empty directory.
   *
   * Consult the
   * [git clone documentation](https://git-scm.com/docs/git-clone)
   * for additional information.
   * @param repository The (possibly remote) repository to be cloned.
   * @param repositoryPath The destination directory of the clone.
   * If omitted, the repositoryPath passed to createAccessor is used.
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
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
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
   * One of [[ConfigGitOptions.--get]], [[ConfigGitOptions.set]],
   * [[ConfigGitOptions.--unset]], or [[ConfigGitOptions.--list]] must be specified.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git config result.
   * @category Configuration
   */
  configGit(gitOptions: ConfigGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows changes between commits, commit and working tree, etc.
   *
   * Consult the
   * [git diff documentation](https://git-scm.com/docs/git-diff)
   * for additional information.
   * @param commandParameters The parameters for the diff command.
   * @param relativePaths The files for the diff command.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The DiffOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git diff result.
   * @category Contents
   */
  diff(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: DiffOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Reports information about each ref.
   *
   * Consult the
   * [git for-each-ref documentation](https://git-scm.com/docs/git-for-each-ref)
   * for additional information.
   * @param gitOptions The ForEachRefOptions for the command.
   * @param pattern Filters refs using either fnmatch(3) or
   * matching completely or from the beginning up to a slash.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git tag result.
   * @category Inspection
   */
  forEachRef(gitOptions?: ForEachRefOptions | string[], pattern?: string | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Downloads objects and refs from another repository.
   *
   * Consult the
   * [git fetch documentation](https://git-scm.com/docs/git-fetch)
   * for additional information.
   * @param commandParameters The parameters for the fetch command.
   * @param gitOptions The FetchOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git fetch result.
   * @category Remotes
   */
  fetch(commandParameters?: string | string[], gitOptions?: FetchOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Verifies the connectivity and validity of objects in git.
   *
   * Consult the
   * [git fsck documentation](https://git-scm.com/docs/git-fsck)
   * for additional information.
   * @param object An object to treat as the head of an unreachability trace.
   * If omitted, the index file, all SHA-1 references in refs namespace, and all reflogs are used.
   * @param gitOptions The FsckGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git fsck result.
   * @category Maintenance
   */
  fsckGit(object?: string, gitOptions?: FsckGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

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
   * Shows commit log entries.
   *
   * Consult the
   * [git log documentation](https://git-scm.com/docs/git-log)
   * for additional information.
   * @param commandParameters The parameters for the log command.
   * @param relativePaths The files for the log command.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The LogOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git log result.
   * @category Branching
   */
  log(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: LogOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   *  Joins two or more development histories.
   *
   * Consult the
   * [git merge documentation](https://git-scm.com/docs/git-merge)
   * for additional information.
   * @param commandParameters The parameters for the merge command.
   * @param gitOptions The MergeOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git merge result.
   * @category Branching
   */
  merge(commandParameters?: string | string[], gitOptions?: MergeOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Moves or renames a file, a directory, or a symlink.
   *
   * Consult the
   * [git mv documentation](https://git-scm.com/docs/git-mv)
   * for additional information.
   * @param relativePaths The files to move.
   * The helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param destination The move destination path.
   * If relativePaths specifies more than one file, destination must be a directory.
   * The helper function [[gitPath]] is called internally.
   * @param gitOptions The MvOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git mv result.
   * @category Contents
   */
  mv(relativePaths: string | string[], destination: string, gitOptions?: MvOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Fetches from and integrates with another repository or a local branch.
   *
   * Consult the
   * [git pull documentation](https://git-scm.com/docs/git-pull)
   * for additional information.
   * @param commandParameters The parameters for the pull command.
   * @param gitOptions The PullOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git pull result.
   * @category Remotes
   */
  pull(commandParameters?: string | string[], gitOptions?: PullOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Updates remote refs along with associated objects.
   *
   * Consult the
   * [git push documentation](https://git-scm.com/docs/git-push)
   * for additional information.
   * @param commandParameters The parameters for the push command.
   * @param gitOptions The PushOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git push result.
   * @category Remotes
   */
  push(commandParameters?: string | string[], gitOptions?: PushOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Reapplies commits on top of another base tip.
   *
   * Consult the
   * [git rebase documentation](https://git-scm.com/docs/git-rebase)
   * for additional information.
   * @param commandParameters The parameters for the rebase command.
   * @param gitOptions The RebaseOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git rebase result.
   * @category Branching
   */
  rebase(commandParameters?: string | string[], gitOptions?: RebaseOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Manages the set of tracked repositories.
   * Consider using method [[getRemoteNames]] if a list of remote names is required.
   *
   * Consult the
   * [git remote documentation](https://git-scm.com/docs/git-remote)
   * for additional information.
   * @param subCommand The remote subcommand to run.
   * If omitted, a list of existing remotes is returned.
   * @param commandParameters The options and arguments for the subCommand.
   * @param gitOptions The RemoteOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git remote result.
   * @category Remotes
   */
  remote(subCommand?: RemoteCommand, commandParameters?: string | string[], gitOptions?: RemoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Resets the current HEAD to the specified state.
   *
   * Consult the
   * [git reset documentation](https://git-scm.com/docs/git-reset)
   * for additional information.
   * @param commandParameters The parameters for the reset command.
   * @param relativePaths The files affected by the operation.
   * The helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The ResetOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git reset result.
   * @category Branching
   */
  reset(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: ResetOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Restores working tree files.
   *
   * Consult the
   * [git restore documentation](https://git-scm.com/docs/git-restore)
   * for additional information.
   * @param relativePaths The files to restore.
   * The helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The RestoreOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git restore result.
   * @category Branching
   */
  restore(relativePaths?: string | string[], gitOptions?: RestoreOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   *  Reverts existing commits.
   *
   * Consult the
   * [git revert documentation](https://git-scm.com/docs/git-revert)
   * for additional information.
   * @param commandParameters The parameters for the revert command.
   * @param gitOptions The RevertOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git revert result.
   * @category Branching
   */
  revert(commandParameters?: string | string[], gitOptions?: RevertOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Picks out and massages parameters.
   *
   * Consult the
   * [git rev-parse documentation](https://git-scm.com/docs/git-rev-parse)
   * for additional information.
   * @param commandParameters The parameters for the rev-parse command.
   * @param gitOptions The RevParseOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git rev-parse result.
   * @category Inspection
   */
  revParse(commandParameters?: string | string[], gitOptions?: RevParseOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Removes file content from the repository.
   *
   * Consult the
   * [git rm documentation](https://git-scm.com/docs/git-rm)
   * for additional information.
   * @param gitOptions The RmOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git rm result.
   * @category Contents
   */
  rm(relativePaths: string | string[], gitOptions?: RmOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   *  Displays various types of objects.
   *
   * Consult the
   * [git show documentation](https://git-scm.com/docs/git-show)
   * for additional information.
   * @param commandParameters The parameters for the show command.
   * @param gitOptions The ShowOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git show result.
   * @category Inspection
   */
  show(commandParameters?: string | string[], gitOptions?: ShowOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Saves the changes in a dirty working directory.
   *
   * Consult the
   * [git stash documentation](https://git-scm.com/docs/git-stash)
   * for additional information.
   * @param subCommand The stash subcommand to run.
   * If omitted, a list of existing stashes is returned.
   * @param commandParameters The parameters for the stash command.
   * @param relativePaths The files for the stash command.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The StashOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git stash result.
   * @category Branching
   */
  stash(subCommand?: StashCommand, commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: StashOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows the working tree status.
   *
   * Consult the
   * [git status documentation](https://git-scm.com/docs/git-status)
   * for additional information.
   * @param relativePaths The files of interest.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @param gitOptions The StatusGitOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git status result.
   * @category Contents
   */
  statusGit(relativePaths?: string | string[], gitOptions?: StatusGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Shows changes between commits, commit and working tree, etc.
   *
   * Consult the
   * [git switch documentation](https://git-scm.com/docs/git-switch)
   * for additional information.
   * @param commandParameters The parameters for the switch command.
   * @param gitOptions The SwitchOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git switch result.
   * @category Branching
   */
  switch(commandParameters?: string | string[], gitOptions?: SwitchOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Creates, deletes, or lists tag objects.
   *
   * Consult the
   * [git tag documentation](https://git-scm.com/docs/git-tag)
   * for additional information.
   * @param tagname The name of the tag to create, delete, or describe.
   * @param gitOptions The TagOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git tag result.
   * @category Branching
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
   * Obtains an array of remote names.
   * @returns An array containing the remote names.
   * @category Remotes
   */
  getRemoteNames(): Promise<string[]>;

  /**
   * Obtains an array identifying the current repositories.
   * @returns An array describing the repositories.
   * The order of the repositories returned is indeterminate.
   * An empty array is retuned if the repository has not been initialized by git-annex.
   * @category Inspection
   */
  getRepositories(): Promise<RepositoryInfo[]>;

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
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
   * @returns An array describing the working tree.
   * @category Contents
   */
  getStatusAnx(relativePaths?: string | string[]): Promise<StatusAnx[]>;

  /**
   * Obtains an array describing the working tree status.
   * @param relativePaths The files of interest.
   * If specified, helper function [[gitPath]] or [[gitPaths]] is called internally.
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
}
