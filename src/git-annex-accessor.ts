import { CommandParameters, runCommand } from './helpers/run-command';
import { gitPath, gitPaths } from './helpers/git-path';
import { isKeyValue, isKeyValueArray, isString, isStringArray } from './helpers/type-predicates';
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
import { getLineStartingAsArray } from './helpers/get-line-starting';
import { GitAnnexAPI } from './interfaces/git-annex-api';
import { InitGitOptions } from './interfaces/init-git-options';
import { InitremoteOptions } from './interfaces/initremote-options';
import { LockOptions } from './interfaces/lock-options';
import { parseCommandOptions } from './helpers/parse-command-options';
import { RmOptions } from './interfaces/rm-options';
import { StatusAnxOptions } from './interfaces/status-anx-options';
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

  private pushIfString(args: string[], value: unknown, prependMarker = false): boolean {
    if (isString(value)) {
      if (prependMarker) {  // end-of-options marker wanted?
        args.push('--');
      }
      args.push(value);
      return true;
    }
    return false;
  }

  private pushIfStringOrStringArray(args: string[], value: unknown, prependMarker = false): boolean {
    if (this.pushIfString(args, value, prependMarker)) {
      return true;
    }
    if (isStringArray(value)) {
      if (prependMarker) {  // end-of-options marker wanted?
        args.push('--');
      }
      args.push(...value);
      return true;
    }
    return false;
  }

  private pushIfRelativePaths(args: string[], value: unknown, prependMarker = false): boolean {
    let paths: unknown;
    if (isString(value)) {
      paths = gitPath(value);
    } else if (isStringArray(value)) {
      paths = gitPaths(value);
    }
    return this.pushIfStringOrStringArray(args, paths, prependMarker);
  }

  private pushIfKeyValuePairs(args: string[], value: unknown): boolean {
    if (isKeyValue(value)) {
      args.push(`${value[0]}=${value[1]}`);
      return true;
    }
    if (isKeyValueArray(value)) {
      value.forEach((element) => { args.push(`${element[0]}=${element[1]}`); });
      return true;
    }
    return false;
  }

  //
  // git-annex methods
  //

  public async runAnx(args: string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    return this.runCommand('git-annex', args, apiOptions);
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
    const args = this.makeArgs(CommandGroup.Git, 'clone', gitOptions);
    this.pushIfString(args, repository, true);
    this.pushIfString(args, repositoryPath);
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

  public async initGit(gitOptions?: InitGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'init', gitOptions);
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

  public async tag(tagname?: string, gitOptions?: TagOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'tag', gitOptions);
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
    const list = getLineStartingAsArray(versionResult.out, 'key/value backends: ');
    return list ?? [];
  }

  public async getRemoteTypes(): Promise<string[]> {
    const versionResult = await this.versionAnx();
    const list = getLineStartingAsArray(versionResult.out, 'remote types: ');
    return list ?? [];
  }

  public async getRepositories(): Promise<RepositoryInfo[]> {
    const repositories: RepositoryInfo[] = [];
    const repositoryArrays = new Map<string, TrustLevel>([
      ['semitrusted repositories', TrustLevel.Semitrusted],
      ['trusted repositories', TrustLevel.Trusted],
      ['untrusted repositories', TrustLevel.Untrusted],
    ]);

    const result = await this.runAnx(['info', '--json']);
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
}
