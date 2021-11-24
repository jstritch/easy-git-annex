import { AnnexOptions } from './annex-options';
import { ApiOptions } from './api-options';
import { CommandResult } from './command-result';
import { InitOptions } from './init-options';
import { RepositoryInfo } from './repository-info';
import { VersionOptions } from './version-options';

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
   * Changes the description of the repository.
   * Consult the
   * [git-annex describe documentation](https://git-annex.branchable.com/git-annex-describe/)
   * for additional information.
   * @param description A description of the annex.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex describe result.
   * @category Initialization
   */
  describe(description: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Initializes a repository for use with git-annex.
   * Consult the
   * [git-annex init documentation](https://git-annex.branchable.com/git-annex-init/)
   * for additional information.
   * @param description The description or uuid of the annex.
   * If omitted, a description is generated using the username, hostname and the path.
   * @param anxOptions The InitOptions for the command.
   * @param apiOptions The Options for the command.
   * @returns The git-annex init result.
   * @category Initialization
   */
  init(description?: string, anxOptions?: InitOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Changes the uuid of a repository.
   * Consult the
   * [git-annex reinit documentation](https://git-annex.branchable.com/git-annex-reinit/)
   * for additional information.
   * @param uuid The new uuid of the repository.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The Options for the command.
   * @returns The git-annex reinit result.
   * @category Initialization
   */
  reinit(uuid: string, anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Stops the use of git-annex in a repository.
   * Consult the
   * [git-annex uninit documentation](https://git-annex.branchable.com/git-annex-uninit/)
   * for additional information.
   * @param anxOptions The AnnexOptions for the command.
   * @param apiOptions The Options for the command.
   * @returns The git-annex uninit result.
   * @category Initialization
   */
  uninit(anxOptions?: AnnexOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Obtains build information about the local git-annex installation.
   * Consult the
   * [git-annex version documentation](https://git-annex.branchable.com/git-annex-version)
   * for additional information.
   * @param anxOptions The VersionOptions for the command.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git-annex version information.
   * @category Version
   */
  version(anxOptions?: VersionOptions | string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Provides the ability to run any git command.
   * @param args The arguments to pass to the git program.
   * @param apiOptions The ApiOptions for the command.
   * @returns The git command result.
   * @category Low-level
   */
  runGit(args: string[], apiOptions?: ApiOptions): Promise<CommandResult>;

  /**
   * Obtains an array identifying the current repositories.
   * @returns An array describing the repositories.
   * An empty array is retuned if the repository has not been initialized by git-annex.
   * @category Helper
   */
  getRepositories(): Promise<RepositoryInfo[]>;

}
