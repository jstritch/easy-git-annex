export class ProcessHelper {
  // exists to allow mocking process methods in tests
  public static getPlatformName(): string {
    return process.platform;
  }
}
