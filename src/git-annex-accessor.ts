import { CommandParameters, runCommand } from './helpers/run-command';
import { gitPath, gitPaths } from './helpers/git-path';
import { isKeyValue, isKeyValueArray, isStatusAnx, isString, isStringArray } from './helpers/type-predicates';
import { RemoteCommand, RemoteOptions } from './interfaces/remote-options';
import { RepositoryInfo, TrustLevel } from './interfaces/repository-info';
import { AddAnxOptions } from './interfaces/add-anx-options';
import { AnnexOptions } from './interfaces/annex-options';
import { ApiOptions } from './interfaces/api-options';
import { CloneOptions } from './interfaces/clone-options';
import { CommandGroup } from './helpers/command-options';
import { CommandResult } from './interfaces/command-result';
import { CommitOptions } from './interfaces/commit-options';
import { ConfigAnxOptions } from './interfaces/config-anx-options';
import { ConfigGitOptions } from './interfaces/config-git-options';
import { FsckAnxOptions } from './interfaces/fsck-anx-options';
import { FsckGitOptions } from './interfaces/fsck-git-options';
import { getLineStartingAsArray } from './helpers/get-line-starting';
import { GitAnnexAPI } from './interfaces/git-annex-api';
import { InfoOptions } from './interfaces/info-options';
import { InitGitOptions } from './interfaces/init-git-options';
import { InitremoteOptions } from './interfaces/initremote-options';
import { ListOptions } from './interfaces/list-options';
import { LockOptions } from './interfaces/lock-options';
import { MvOptions } from './interfaces/mv-options';
import { parseCommandOptions } from './helpers/parse-command-options';
import { RmOptions } from './interfaces/rm-options';
import { safeParseToArray } from './helpers/safe-parse';
import { StatusAnx } from './interfaces/status-anx';
import { StatusAnxOptions } from './interfaces/status-anx-options';
import { StatusGit } from './interfaces/status-git';
import { StatusGitOptions } from './interfaces/status-git-options';
import { SyncOptions } from './interfaces/sync-options';
import { TagOptions } from './interfaces/tag-options';
import { UnlockOptions } from './interfaces/unlock-options';
import { VersionAnxOptions } from './interfaces/version-anx-options';
import { VersionGitOptions } from './interfaces/version-git-options';

export class GitAnnexAccessor implements GitAnnexAPI {

  private readonly repositoryPath: string;

  public constructor(repositoryPath: string) {
    this.repositoryPath = repositoryPath;
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
    if (this.pushIfString(args, value, prependMarker)) {
      return;
    }
    if (isStringArray(value)) {
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
    if (paths) {
      this.pushIfStringOrStringArray(args, paths, prependMarker);
    }
  }

  private pushIfKeyValuePairs(args: string[], value?: [string, string] | [string, string][]): void {
    if (isKeyValue(value)) {
      args.push(`${value[0]}=${value[1]}`);
    } else if (isKeyValueArray(value)) {
      value.forEach((element) => { args.push(`${element[0]}=${element[1]}`); });
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

  public async configAnx(anxOptions: ConfigAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'config', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async describe(repository: string, description: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'describe', anxOptions, repository, description);
    return this.runAnx(args, apiOptions);
  }

  public async enableremote(name?: string, parameters?: [string, string] | [string, string][], anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'enableremote', anxOptions);
    this.pushIfString(args, name);
    this.pushIfKeyValuePairs(args, parameters);
    return this.runAnx(args, apiOptions);
  }

  public async fsckAnx(relativePaths?: string | string[], anxOptions?: FsckAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'fsck', anxOptions);
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

  public async info(items?: string | string[], anxOptions?: InfoOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'info', anxOptions);
    this.pushIfStringOrStringArray(args, items);
    return this.runAnx(args, apiOptions);
  }

  public async initAnx(description?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
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

  public async reinit(uuid: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'reinit', anxOptions, uuid);
    return this.runAnx(args, apiOptions);
  }

  public async renameremote(name: string, newName: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'renameremote', anxOptions, name, newName);
    return this.runAnx(args, apiOptions);
  }

  public async repair(anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'repair', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async statusAnx(relativePaths?: string | string[], anxOptions?: StatusAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'status', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
    return this.runAnx(args, apiOptions);
  }

  public async sync(remotes: string | string[], anxOptions?: SyncOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'sync', anxOptions);
    this.pushIfStringOrStringArray(args, remotes);
    return this.runAnx(args, apiOptions);
  }

  public async ungroup(repository: string, groupname: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'ungroup', anxOptions, repository, groupname);
    return this.runAnx(args, apiOptions);
  }

  public async uninit(anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'uninit', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async unlock(relativePaths?: string | string[], anxOptions?: UnlockOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'unlock', anxOptions);
    this.pushIfRelativePaths(args, relativePaths);
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

  //
  // git methods
  //

  public async runGit(args: string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    return this.runCommand('git', args, apiOptions);
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

  public async fsckGit(object?: string, gitOptions?: FsckGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'fsck', gitOptions);
    this.pushIfString(args, object);
    return this.runGit(args, apiOptions);
  }

  public async initGit(gitOptions?: InitGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'init', gitOptions);
    return this.runGit(args, apiOptions);
  }

  public async mv(relativePaths: string | string[], destination: string, gitOptions?: MvOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'mv', gitOptions);
    this.pushIfRelativePaths(args, relativePaths);
    args.push(gitPath(destination));
    return this.runGit(args, apiOptions);
  }

  public async remote(subCommand?: RemoteCommand, commandParameters?: string | string[], gitOptions?: RemoteOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'remote', gitOptions);
    this.pushIfString(args, subCommand);
    this.pushIfStringOrStringArray(args, commandParameters);
    return this.runGit(args, apiOptions);
  }

  public async rm(relativePaths: string | string[], gitOptions?: RmOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'rm', gitOptions);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async statusGit(relativePaths?: string | string[], gitOptions?: StatusGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'status', gitOptions);
    this.pushIfRelativePaths(args, relativePaths, true);
    return this.runGit(args, apiOptions);
  }

  public async tag(tagname?: string, gitOptions?: TagOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.ListTag, 'tag', gitOptions);
    this.pushIfString(args, tagname);
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

  public async getRemoteNames(): Promise<string[]> {
    const remoteResult = await this.remote();
    return remoteResult.out.split('\n').filter((name) => { return name; });
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
      repositoryArrays.forEach((trustLevel, property) => {
        const a = infos[property] as RepositoryInfo[];
        a.forEach((info) => {
          repositories.push({ uuid: info.uuid, description: info.description, here: info.here, trustLevel: trustLevel });
        });
      });
    }
    return repositories;
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
      strs.forEach((s) => {
        if (s.length > 0) {
          if (needsOrig) {
            needsOrig.origPath = s;
            needsOrig = null;
          } else {
            const statusGit = { x: s[0], y: s[1], path: s.substring(3) };
            if (statusGit.x === 'R' || statusGit.x === 'C') {
              needsOrig = statusGit;
            }
            status.push(statusGit);
          }
        }
      });
    }
    return status;
  }
}
