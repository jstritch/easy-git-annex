import { CommandParameters, runCommand } from './helpers/run-command.js';
import { getLineStartingAsArray, getLineStartingAsString } from './helpers/get-line-starting.js';
import { gitPath, gitPaths } from './helpers/git-path.js';
import { isKeyValue, isKeyValueArray, isNumber, isStatusAnx, isString, isStringArray } from './helpers/type-predicates.js';
import { RemoteCommand, RemoteOptions } from './interfaces/remote-options.js';
import { RepositoryInfo, TrustLevel } from './interfaces/repository-info.js';
import { StashCommand, StashOptions } from './interfaces/stash-options.js';
import { SubmoduleCommand, SubmoduleOptions } from './interfaces/submodule-options.js';
import { AddAnxOptions } from './interfaces/add-anx-options.js';
import { AddGitOptions } from './interfaces/add-git-options.js';
import { AddunusedOptions } from './interfaces/addunused-options.js';
import { AdjustOptions } from './interfaces/adjust-options.js';
import { AnnexOptions } from './interfaces/annex-options.js';
import { ApiOptions } from './interfaces/api-options.js';
import { AssistOptions } from './interfaces/assist-options.js';
import { BranchOptions } from './interfaces/branch-options.js';
import { CheckoutOptions } from './interfaces/checkout-options.js';
import { CherryPickOptions } from './interfaces/cherry-pick-options.js';
import { CleanOptions } from './interfaces/clean-options.js';
import { CloneOptions } from './interfaces/clone-options.js';
import { CommandGroup } from './helpers/command-options.js';
import { CommandResult } from './interfaces/command-result.js';
import { CommitOptions } from './interfaces/commit-options.js';
import { ConfigAnxOptions } from './interfaces/config-anx-options.js';
import { ConfigGitOptions } from './interfaces/config-git-options.js';
import { ConfigremoteOptions } from './interfaces/configremote-options.js';
import { CopyOptions } from './interfaces/copy-options.js';
import { DeadOptions } from './interfaces/dead-options.js';
import { DescribeAnxOptions } from './interfaces/describe-anx-options.js';
import { DiffOptions } from './interfaces/diff-options.js';
import { DropOptions } from './interfaces/drop-options.js';
import { DropunusedOptions } from './interfaces/dropunused-options.js';
import { EnableremoteOptions } from './interfaces/enableremote-options.js';
import { ExpireOptions } from './interfaces/expire-options.js';
import { ExportOptions } from './interfaces/export-options.js';
import { FetchOptions } from './interfaces/fetch-options.js';
import { FindOptions } from './interfaces/find-options.js';
import { ForEachRefOptions } from './interfaces/for-each-ref-options.js';
import { ForgetOptions } from './interfaces/forget-options.js';
import { FsckAnxOptions } from './interfaces/fsck-anx-options.js';
import { FsckGitOptions } from './interfaces/fsck-git-options.js';
import { GetOptions } from './interfaces/get-options.js';
import { GitAnnexAPI } from './interfaces/git-annex-api.js';
import { GrepOptions } from './interfaces/grep-options.js';
import { ImportOptions } from './interfaces/import-options.js';
import { InfoOptions } from './interfaces/info-options.js';
import { InitAnxOptions } from './interfaces/init-anx-options.js';
import { InitGitOptions } from './interfaces/init-git-options.js';
import { InitremoteOptions } from './interfaces/initremote-options.js';
import { ListOptions } from './interfaces/list-options.js';
import { LockOptions } from './interfaces/lock-options.js';
import { LogOptions } from './interfaces/log-options.js';
import { LsFilesOptions } from './interfaces/ls-files-options.js';
import { MergeAnxOptions } from './interfaces/merge-anx-options.js';
import { MergeGitOptions } from './interfaces/merge-git-options.js';
import { MoveOptions } from './interfaces/move-options.js';
import { MvOptions } from './interfaces/mv-options.js';
import { parseCommandOptions } from './helpers/parse-command-options.js';
import { PullAnxOptions } from './interfaces/pull-anx-options.js';
import { PullOptions } from './interfaces/pull-options.js';
import { PushAnxOptions } from './interfaces/push-anx-options.js';
import { PushOptions } from './interfaces/push-options.js';
import { RebaseOptions } from './interfaces/rebase-options.js';
import { ReinitOptions } from './interfaces/reinit-options.js';
import { RenameremoteOptions } from './interfaces/renameremote-options.js';
import { ResetOptions } from './interfaces/reset-options.js';
import { RestoreOptions } from './interfaces/restore-options.js';
import { RevertOptions } from './interfaces/revert-options.js';
import { RevParseOptions } from './interfaces/rev-parse-options.js';
import { RmOptions } from './interfaces/rm-options.js';
import { safeParseToArray } from './helpers/safe-parse.js';
import { SatisfyOptions } from './interfaces/satisfy-options.js';
import { SemitrustOptions } from './interfaces/semitrust-options.js';
import { ShowOptions } from './interfaces/show-options.js';
import { StatusAnx } from './interfaces/status-anx.js';
import { StatusAnxOptions } from './interfaces/status-anx-options.js';
import { StatusGit } from './interfaces/status-git.js';
import { StatusGitOptions } from './interfaces/status-git-options.js';
import { SwitchOptions } from './interfaces/switch-options.js';
import { SyncOptions } from './interfaces/sync-options.js';
import { TagOptions } from './interfaces/tag-options.js';
import { UnannexOptions } from './interfaces/unannex-options.js';
import { UninitOptions } from './interfaces/uninit-options.js';
import { UnlockOptions } from './interfaces/unlock-options.js';
import { UntrustOptions } from './interfaces/untrust-options.js';
import { UnusedOptions } from './interfaces/unused-options.js';
import { VersionAnx } from './interfaces/version-anx.js';
import { VersionAnxOptions } from './interfaces/version-anx-options.js';
import { VersionGit } from './interfaces/version-git.js';
import { VersionGitOptions } from './interfaces/version-git-options.js';
import { WhereisOptions } from './interfaces/whereis-options.js';
import { WhereusedOptions } from './interfaces/whereused-options.js';

export class GitAnnexAccessor implements GitAnnexAPI {

  private readonly repositoryPath: string;

  private constructor(repositoryPath: string) {
    this.repositoryPath = repositoryPath;
  }

  public static create(repositoryPath: string): GitAnnexAccessor {
    return new GitAnnexAccessor(repositoryPath);
  }

  //
  // private helper methods
  //

  private async runCommand(exeName: string, args: string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const cmd = new CommandParameters(this.repositoryPath, exeName, args, apiOptions);
    return runCommand(cmd);
  }

  private makeArgs(commandGroup: CommandGroup, commandName: string, commandOptions: unknown, ...parameters: string[]): string[] {
    return [commandName, ...parseCommandOptions(commandGroup, commandName, commandOptions), ...parameters];
  }

  private pushIfNumeric(args: string[], value?: number | string): void {
    if (isNumber(value)) {
      args.push(value.toString());
    } else if (isString(value)) {
      args.push(value);
    }
  }

  private insertAtIfString(args: string[], index: number, value?: string): void {
    if (isString(value)) {
      args.splice(index, 0, value);
    }
  }

  private pushIfString(args: string[], value?: string | string[], prependMarker = false): boolean {
    if (isString(value)) {
      if (prependMarker) {  // end-of-options marker wanted?
        args.push('--');
      }
      args.push(value);
      return true;
    }
    return false;
  }

  private pushIfStringOrStringArray(args: string[], value?: string | string[], prependMarker = false): void {
    if (!this.pushIfString(args, value, prependMarker) && isStringArray(value)) {
      if (prependMarker) {  // end-of-options marker wanted?
        args.push('--');
      }
      args.push(...value);
    }
  }

  private pushIfRelativePaths(args: string[], value?: string | string[], prependMarker = false): void {
    let paths: string | string[] | undefined;
    if (isString(value)) {
      paths = gitPath(value);
    } else if (isStringArray(value)) {
      paths = gitPaths(value);
    }
    this.pushIfStringOrStringArray(args, paths, prependMarker);
  }

  private pushIfKeyValuePairs(args: string[], value?: [string, string] | [string, string][]): void {
    if (isKeyValue(value)) {
      args.push(`${value[0]}=${value[1]}`);
    } else if (isKeyValueArray(value)) {
      for (const element of value) { args.push(`${element[0]}=${element[1]}`); }
    }
  }

  //
  // git-annex methods
  //

  public async runAnx(args: string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    return this.runCommand('git', ['annex', ...args], apiOptions);
  }

  public async addAnx(relativePaths?: string | string[], anxOptions?: AddAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'add', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async addunused(indices: string | string[], anxOptions?: AddunusedOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'addunused', anxOptions);
    this.pushIfStringOrStringArray(args, indices);
    return this.runAnx(args, apiOptions);
  }

  public async adjust(anxOptions: AdjustOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'adjust', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async assist(remotes?: string | string[], anxOptions?: AssistOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'assist', anxOptions);
    this.pushIfStringOrStringArray(args, remotes);
    return this.runAnx(args, apiOptions);
  }

  public async configAnx(anxOptions: ConfigAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'config', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async configremote(name?: string, parameters?: [string, string] | [string, string][], anxOptions?: ConfigremoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'configremote', anxOptions);
    this.pushIfString(args, name);
    this.pushIfKeyValuePairs(args, parameters);
    return this.runAnx(args, apiOptions);
  }

  public async copy(relativePaths?: string | string[], anxOptions?: CopyOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'copy', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async dead(repository: string | string[], anxOptions?: DeadOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'dead', anxOptions);
    this.pushIfStringOrStringArray(args, repository);
    return this.runAnx(args, apiOptions);
  }

  public async describeAnx(repository: string, description: string, anxOptions?: DescribeAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'describe', anxOptions, repository, description);
    return this.runAnx(args, apiOptions);
  }

  public async drop(relativePaths?: string | string[], anxOptions?: DropOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'drop', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async dropunused(indices: string | string[], anxOptions?: DropunusedOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'dropunused', anxOptions);
    this.pushIfStringOrStringArray(args, indices);
    return this.runAnx(args, apiOptions);
  }

  public async enableremote(name?: string, parameters?: [string, string] | [string, string][], anxOptions?: EnableremoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'enableremote', anxOptions);
    this.pushIfString(args, name);
    this.pushIfKeyValuePairs(args, parameters);
    return this.runAnx(args, apiOptions);
  }

  public async expire(expirations: string | string[], anxOptions?: ExpireOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'expire', anxOptions);
    this.pushIfStringOrStringArray(args, expirations);
    return this.runAnx(args, apiOptions);
  }

  public async export(treeish: string, anxOptions?: ExportOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'export', anxOptions, treeish);
    return this.runAnx(args, apiOptions);
  }

  public async find(relativePaths?: string | string[], anxOptions?: FindOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'find', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async forget(anxOptions?: ForgetOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'forget', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async fsckAnx(relativePaths?: string | string[], anxOptions?: FsckAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'fsck', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async get(relativePaths?: string | string[], anxOptions?: GetOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'get', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async group(repository: string, groupname?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'group', anxOptions, repository);
    this.pushIfString(args, groupname);
    return this.runAnx(args, apiOptions);
  }

  public async groupwanted(groupname: string, expression?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'groupwanted', anxOptions, groupname);
    this.pushIfString(args, expression);
    return this.runAnx(args, apiOptions);
  }

  public async import(treeish: string, anxOptions?: ImportOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'import', anxOptions, treeish);
    return this.runAnx(args, apiOptions);
  }

  public async info(items?: string | string[], anxOptions?: InfoOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'info', anxOptions);
    this.pushIfStringOrStringArray(args, items);
    return this.runAnx(args, apiOptions);
  }

  public async initAnx(description?: string, anxOptions?: InitAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'init', anxOptions);
    this.pushIfString(args, description);
    return this.runAnx(args, apiOptions);
  }

  public async initremote(name: string, type: string, parameters?: [string, string] | [string, string][], anxOptions?: InitremoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'initremote', anxOptions, name, `type=${type}`);
    this.pushIfKeyValuePairs(args, parameters);
    return this.runAnx(args, apiOptions);
  }

  public async list(relativePaths?: string | string[], anxOptions?: ListOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'list', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async lock(relativePaths?: string | string[], anxOptions?: LockOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'lock', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async mergeAnx(branchName?: string, anxOptions?: MergeAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'merge', anxOptions);
    this.pushIfString(args, branchName);
    return this.runAnx(args, apiOptions);
  }

  public async mincopies(n?: number | string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'mincopies', anxOptions);
    this.pushIfNumeric(args, n);
    return this.runAnx(args, apiOptions);
  }

  public async move(relativePaths?: string | string[], anxOptions?: MoveOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'move', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async numcopies(n?: number | string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'numcopies', anxOptions);
    this.pushIfNumeric(args, n);
    return this.runAnx(args, apiOptions);
  }

  public async pullAnx(remotes?: string | string[], anxOptions?: PullAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'pull', anxOptions);
    this.pushIfStringOrStringArray(args, remotes);
    return this.runAnx(args, apiOptions);
  }

  public async pushAnx(remotes?: string | string[], anxOptions?: PushAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'push', anxOptions);
    this.pushIfStringOrStringArray(args, remotes);
    return this.runAnx(args, apiOptions);
  }

  public async reinit(uuid: string, anxOptions?: ReinitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'reinit', anxOptions, uuid);
    return this.runAnx(args, apiOptions);
  }

  public async renameremote(name: string, newName: string, anxOptions?: RenameremoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'renameremote', anxOptions, name, newName);
    return this.runAnx(args, apiOptions);
  }

  public async repair(anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'repair', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async required(repository: string, expression?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'required', anxOptions, repository);
    this.pushIfString(args, expression);
    return this.runAnx(args, apiOptions);
  }

  public async satisfy(remotes?: string | string[], anxOptions?: SatisfyOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'satisfy', anxOptions);
    this.pushIfStringOrStringArray(args, remotes);
    return this.runAnx(args, apiOptions);
  }

  public async semitrust(repository: string | string[], anxOptions?: SemitrustOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'semitrust', anxOptions);
    this.pushIfStringOrStringArray(args, repository);
    return this.runAnx(args, apiOptions);
  }

  public async statusAnx(relativePaths?: string | string[], anxOptions?: StatusAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'status', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async sync(remotes?: string | string[], anxOptions?: SyncOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'sync', anxOptions);
    this.pushIfStringOrStringArray(args, remotes);
    return this.runAnx(args, apiOptions);
  }

  public async unannex(relativePaths?: string | string[], anxOptions?: UnannexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'unannex', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async ungroup(repository: string, groupname: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'ungroup', anxOptions, repository, groupname);
    return this.runAnx(args, apiOptions);
  }

  public async uninit(anxOptions?: UninitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'uninit', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async unlock(relativePaths?: string | string[], anxOptions?: UnlockOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'unlock', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async untrust(repository: string | string[], anxOptions?: UntrustOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'untrust', anxOptions);
    this.pushIfStringOrStringArray(args, repository);
    return this.runAnx(args, apiOptions);
  }

  public async unused(anxOptions?: UnusedOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'unused', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async versionAnx(anxOptions?: VersionAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'version', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async wanted(repository: string, expression?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'wanted', anxOptions, repository);
    this.pushIfString(args, expression);
    return this.runAnx(args, apiOptions);
  }

  public async whereis(relativePaths?: string | string[], anxOptions?: WhereisOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'whereis', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async whereused(anxOptions?: WhereusedOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'whereused', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  //
  // Git methods
  //

  public async runGit(args: string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    return this.runCommand('git', args, apiOptions);
  }

  public async addGit(relativePaths?: string | string[], gitOptions?: AddGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'add', gitOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runGit(args, apiOptions);
  }

  public async branch(commandParameters?: string | string[], gitOptions?: BranchOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'branch', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async checkout(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: CheckoutOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'checkout', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async cherryPick(commandParameters?: string | string[], gitOptions?: CherryPickOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'cherry-pick', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async clean(relativePaths?: string | string[], gitOptions?: CleanOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'clean', gitOptions);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async clone(repository: string, repositoryPath?: string, gitOptions?: CloneOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'clone', gitOptions, '--', repository);
    args.push(isString(repositoryPath) ? repositoryPath : this.repositoryPath);
    return this.runGit(args, apiOptions);
  }

  public async commit(relativePaths?: string | string[], gitOptions?: CommitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'commit', gitOptions);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async configGit(gitOptions: ConfigGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'config', gitOptions);
    return this.runGit(args, apiOptions);
  }

  public async diff(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: DiffOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.GitDiff, 'diff', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async fetch(commandParameters?: string | string[], gitOptions?: FetchOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.GitFetch, 'fetch', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async forEachRef(gitOptions?: ForEachRefOptions | string[], pattern?: string | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'for-each-ref', gitOptions);
    this.pushIfStringOrStringArray(args, pattern);
    return this.runGit(args, apiOptions);
  }

  public async fsckGit(object?: string, gitOptions?: FsckGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'fsck', gitOptions);
    this.pushIfString(args, object);
    return this.runGit(args, apiOptions);
  }

  public async grep(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: GrepOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.GitDiff, 'grep', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async initGit(gitOptions?: InitGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'init', gitOptions);
    return this.runGit(args, apiOptions);
  }

  public async log(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: LogOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.GitDiff, 'log', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async lsFiles(relativePaths?: string | string[], gitOptions?: LsFilesOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'ls-files', gitOptions);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async mergeGit(commandParameters?: string | string[], gitOptions?: MergeGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'merge', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async mv(relativePaths: string | string[], destination: string, gitOptions?: MvOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'mv', gitOptions);
    this.pushIfRelativePaths(args, relativePaths);
    args.push(gitPath(destination));
    return this.runGit(args, apiOptions);
  }

  public async pull(commandParameters?: string | string[], gitOptions?: PullOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.GitFetch, 'pull', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async push(commandParameters?: string | string[], gitOptions?: PushOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'push', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async rebase(commandParameters?: string | string[], gitOptions?: RebaseOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'rebase', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async remote(subCommand?: RemoteCommand, commandParameters?: string | string[], gitOptions?: RemoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'remote', gitOptions);
    this.pushIfString(args, subCommand);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async reset(commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: ResetOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'reset', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async restore(relativePaths?: string | string[], gitOptions?: RestoreOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'restore', gitOptions);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async revert(commandParameters?: string | string[], gitOptions?: RevertOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'revert', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async revParse(commandParameters?: string | string[], gitOptions?: RevParseOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'rev-parse', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async rm(relativePaths: string | string[], gitOptions?: RmOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'rm', gitOptions);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async show(commandParameters?: string | string[], gitOptions?: ShowOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.GitDiff, 'show', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async stash(subCommand?: StashCommand, commandParameters?: string | string[], relativePaths?: string | string[], gitOptions?: StashOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'stash', gitOptions);
    this.insertAtIfString(args, 1, subCommand);
    this.pushIfStringOrStringArray(args, commandParameters);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async statusGit(relativePaths?: string | string[], gitOptions?: StatusGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'status', gitOptions);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async submodule(subCommand?: SubmoduleCommand, relativePaths?: string | string[], commandParameter?: string, gitOptions?: SubmoduleOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'submodule', gitOptions);
    const quietIndex = args.indexOf('--quiet');
    this.insertAtIfString(args, quietIndex > 0 ? quietIndex + 1 : 1, subCommand);
    this.pushIfRelativePaths(args, relativePaths, true);
    const markerIndex = args.indexOf('--');
    switch (subCommand) {
      case SubmoduleCommand.Add:
        this.insertAtIfString(args, markerIndex > 0 ? markerIndex + 1 : args.length, commandParameter);
        break;
      case SubmoduleCommand.ForEach:
      case SubmoduleCommand.SetUrl:
        this.pushIfString(args, commandParameter);
        break;
      case SubmoduleCommand.Summary:
        this.insertAtIfString(args, markerIndex > 0 ? markerIndex : args.length, commandParameter);
        break;
      default:
        break;
    }
    return this.runGit(args, apiOptions);
  }

  public async switch(commandParameters?: string | string[], gitOptions?: SwitchOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'switch', gitOptions);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async tag(tagName?: string, gitOptions?: TagOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'tag', gitOptions);
    this.pushIfString(args, tagName);
    return this.runGit(args, apiOptions);
  }

  public async versionGit(gitOptions?: VersionGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'version', gitOptions);
    return this.runGit(args, apiOptions);
  }

  //
  // public helper methods
  //

  public async getBackends(): Promise<string[]> {
    const versionResult = await this.versionAnx();
    return getLineStartingAsArray(versionResult.out, 'key/value backends: ');
  }

  public async getBranchName(): Promise<string> {
    const branchResult = await this.branch(undefined, { '--show-current': null });
    return branchResult.out.trim();
  }

  public async getBranchNames(pattern?: string, ignoreCase?: boolean): Promise<string[]> {
    const options: BranchOptions = {
      '--format': '%(refname:lstrip=2)',
      '--sort': ['*refname'],
      '--list': null,
      ...ignoreCase === true && { '--ignore-case': null }
    };

    const result = await this.branch(pattern && pattern.length > 0 ? pattern : undefined, options);
    return result.out.split('\n').filter((name) => { return !!name; });
  }

  public async getBuildFlags(): Promise<string[]> {
    const versionResult = await this.versionAnx();
    return getLineStartingAsArray(versionResult.out, 'build flags: ');
  }

  public async getFileNames(relativePaths?: string | string[], showCached?: boolean, showDeleted?: boolean, showModified?: boolean, showOthers?: boolean): Promise<string[]> {
    const options: LsFilesOptions = {
      '-z': null,
      '--deduplicate': null,
      ...showCached === true && { '--cached': null },
      ...showDeleted === true && { '--deleted': null },
      ...showModified === true && { '--modified': null },
      ...showOthers === true && { '--others': null }
    };

    const result = await this.lsFiles(relativePaths, options);
    return result.out.split('\0').filter((file) => { return !!file; });
  }

  public async getRemoteNames(): Promise<string[]> {
    const remoteResult = await this.remote();
    return remoteResult.out.split('\n').filter((name) => { return !!name; });
  }

  public async getRepositories(): Promise<RepositoryInfo[]> {
    const repositories: RepositoryInfo[] = [];
    const repositoryArrays = new Map<string, TrustLevel>([
      ['semitrusted repositories', TrustLevel.Semitrusted],
      ['trusted repositories', TrustLevel.Trusted],
      ['untrusted repositories', TrustLevel.Untrusted],
    ]);

    const result = await this.info(undefined, { '--json': null });
    if (result.exitCode === 0 && result.out.length > 0) {
      const infos = JSON.parse(result.out) as Record<string, unknown>;
      for (const [property, trustLevel] of repositoryArrays.entries()) {
        const a = infos[property] as RepositoryInfo[];
        for (const info of a) {
          repositories.push({ uuid: info.uuid, description: info.description, here: info.here, trustLevel: trustLevel });
        }
      }
    }
    return repositories;
  }

  public async getRepositoryInfo(): Promise<RepositoryInfo | undefined> {
    const infos = await this.getRepositories();
    return infos.find((info: RepositoryInfo) => { return info.here; });
  }

  public async getSpecialRemoteTypes(): Promise<string[]> {
    const versionResult = await this.versionAnx();
    return getLineStartingAsArray(versionResult.out, 'remote types: ');
  }

  public async getStatusAnx(relativePaths?: string | string[]): Promise<StatusAnx[]> {
    const result = await this.statusAnx(relativePaths, { '--json': null });
    return safeParseToArray(isStatusAnx, result.out);
  }

  public async getStatusGit(relativePaths?: string | string[]): Promise<StatusGit[]> {
    const status: StatusGit[] = [];
    const result = await this.statusGit(relativePaths, { '--porcelain': 'v1', '-z': null });
    if (result.exitCode === 0 && result.out.length > 0) {
      const strs = result.out.split('\0');
      let needsOrig: StatusGit | null = null;
      for (const s of strs) {
        if (s.length > 0) {
          if (needsOrig) {
            needsOrig.origPath = s;
            needsOrig = null;
          } else {
            const statusGit = { x: s[0], y: s[1], path: s.slice(3) };
            if (statusGit.x === 'R' || statusGit.x === 'C') {
              needsOrig = statusGit;
            }
            status.push(statusGit);
          }
        }
      }
    }
    return status;
  }

  public async getTagNames(pattern?: string, ignoreCase?: boolean): Promise<string[]> {
    const options: ForEachRefOptions = {
      '--format': '%(refname:lstrip=2)',
      '--sort': ['*refname'],
      ...ignoreCase === true && { '--ignore-case': null }
    };

    const result = await this.forEachRef(options, pattern ? `refs/tags/${pattern}` : 'refs/tags');
    return result.out.split('\n').filter((name) => { return !!name; });
  }

  public async getVersionAnx(): Promise<VersionAnx> {
    const result = await this.versionAnx();
    const versionAnx: VersionAnx = {
      version: getLineStartingAsString(result.out, 'git-annex version: ', false),
      buildFlags: getLineStartingAsArray(result.out, 'build flags: '),
      dependencyVersions: getLineStartingAsArray(result.out, 'dependency versions: '),
      keyValueBackends: getLineStartingAsArray(result.out, 'key/value backends: '),
      remoteTypes: getLineStartingAsArray(result.out, 'remote types: '),
      operatingSystem: getLineStartingAsString(result.out, 'operating system: ', false),
      supportsRepositories: getLineStartingAsArray(result.out, 'supported repository versions: '),
      upgradesRepositories: getLineStartingAsArray(result.out, 'upgrade supported from repository versions: ')
    };
    return versionAnx;
  }

  public async getVersionGit(): Promise<VersionGit> {
    const result = await this.versionGit({ '--build-options': null });
    const versionGit: VersionGit = {
      version: getLineStartingAsString(result.out, 'git version ', false),
      cpu: getLineStartingAsString(result.out, 'cpu: ', false),
      longSize: getLineStartingAsString(result.out, 'sizeof-long: ', false),
      sizeTSize: getLineStartingAsString(result.out, 'sizeof-size_t: ', false),
      shellPath: getLineStartingAsString(result.out, 'shell-path: ', false)
    };
    return versionGit;
  }
}
