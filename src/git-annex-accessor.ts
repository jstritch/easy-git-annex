import { CommandParameters, runCommand } from './helpers/run-command';
import { RepositoryInfo, TrustLevel } from './interfaces/repository-info';
import { AnnexOptions } from './interfaces/annex-options';
import { ApiOptions } from './interfaces/api-options';
import { CommandResult } from './interfaces/command-result';
import { ConfigOptions } from './interfaces/config-options';
import { GitAnnexAPI } from './interfaces/git-annex-api';
import { InitOptions } from './interfaces/init-options';
import { isString } from './helpers/type-predicates';
import { parseAnnexOptions } from './helpers/parse-annex-options';
import { VersionOptions } from './interfaces/version-options';

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

  private makeArgs(commandName: string, anxOptions: unknown, ...parameters: string[]): string[] {
    return [commandName, ...parseAnnexOptions(commandName, anxOptions), ...parameters];
  }

  private pushIfString(args: string[], value?: string): void {
    if (isString(value)) {
      args.push(value);
    }
  }

  //
  // git-annex methods
  //

  public async runAnx(args: string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    return this.runCommand('git-annex', args, apiOptions);
  }

  public async config(anxOptions: ConfigOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('config', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async describe(repository: string, description: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('describe', anxOptions, repository, description);
    return this.runAnx(args, apiOptions);
  }

  public async group(repository: string, groupname?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('group', anxOptions, repository);
    this.pushIfString(args, groupname);
    return this.runAnx(args, apiOptions);
  }

  public async groupwanted(groupname: string, expression?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('groupwanted', anxOptions, groupname);
    this.pushIfString(args, expression);
    return this.runAnx(args, apiOptions);
  }

  public async init(description?: string, anxOptions?: InitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('init', anxOptions);
    this.pushIfString(args, description);
    return this.runAnx(args, apiOptions);
  }

  public async reinit(uuid: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('reinit', anxOptions, uuid);
    return this.runAnx(args, apiOptions);
  }

  public async ungroup(repository: string, groupname: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('ungroup', anxOptions, repository, groupname);
    return this.runAnx(args, apiOptions);
  }

  public async uninit(anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('uninit', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async version(anxOptions?: VersionOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('version', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async wanted(repository: string, expression?: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs('wanted', anxOptions, repository);
    this.pushIfString(args, expression);
    return this.runAnx(args, apiOptions);
  }

  //
  // git methods
  //

  public async runGit(args: string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    return this.runCommand('git', args, apiOptions);
  }

  //
  // public helper methods
  //

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
