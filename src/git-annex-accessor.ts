import { CommandParameters, runCommand } from './helpers/run-command';
import { RepositoryInfo, TrustLevel } from './interfaces/repository-info';
import { AnnexOptions } from './interfaces/annex-options';
import { ApiOptions } from './interfaces/api-options';
import { CloneOptions } from './interfaces/clone-options';
import { CommandGroup } from './helpers/command-options';
import { CommandResult } from './interfaces/command-result';
import { ConfigAnxOptions } from './interfaces/config-anx-options';
import { ConfigGitOptions } from './interfaces/config-git-options';
import { GitAnnexAPI } from './interfaces/git-annex-api';
import { InitAnxOptions } from './interfaces/init-anx-options';
import { InitGitOptions } from './interfaces/init-git-options';
import { isString } from './helpers/type-predicates';
import { parseCommandOptions } from './helpers/parse-command-options';
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

  private makeArgs(commandGroup: CommandGroup, commandName: string, anxOptions: unknown, ...parameters: string[]): string[] {
    return [commandName, ...parseCommandOptions(commandGroup, commandName, anxOptions), ...parameters];
  }

  private pushIfString(args: string[], value: unknown, prependMarker = false): void {
    if (isString(value)) {
      if (prependMarker) {  // end-of-options marker wanted?
        args.push('--');
      }
      args.push(value);
    }
  }

  //
  // git-annex methods
  //

  public async runAnx(args: string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    return this.runCommand('git-annex', args, apiOptions);
  }

  public async configAnx(anxOptions: ConfigAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'config', anxOptions);
    return this.runAnx(args, apiOptions);
  }

  public async describe(repository: string, description: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'describe', anxOptions, repository, description);
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

  public async initAnx(description?: string, anxOptions?: InitAnxOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'init', anxOptions);
    this.pushIfString(args, description);
    return this.runAnx(args, apiOptions);
  }

  public async reinit(uuid: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.AnxCommon, 'reinit', anxOptions, uuid);
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

  public async clone(repository: string, gitOptions?: CloneOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'clone', gitOptions);
    this.pushIfString(args, repository, true);
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

  public async versionGit(gitOptions?: VersionGitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult> {
    const args = this.makeArgs(CommandGroup.Git, 'version', gitOptions);
    return this.runGit(args, apiOptions);
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

  public gitPath(relativePath: string): string {
    return relativePath.replace(/\\/g, '/');
  }

  public gitPaths(relativePaths: string[]): string[] {
    return relativePaths.map((relativePath) => { return this.gitPath(relativePath); });
  }
}
