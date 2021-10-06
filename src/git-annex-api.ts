export class GitAnnexAPI {
  public static async createAccessor(repoPath: string): Promise<GitAnnexAPI> {
    return new GitAnnexAPI(repoPath);
  }

  private readonly repoPath: string;

  private constructor(repoPath: string) {
    this.repoPath = repoPath;
  }

  public async version(): Promise<string> {
    return `hello again from Anx ${this.repoPath}`;
  }
}
