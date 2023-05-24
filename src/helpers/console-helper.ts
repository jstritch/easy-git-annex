export class ConsoleHelper {
  // exists to allow mocking console methods in tests
  public static writeError(...parameters: unknown[]): void {
    console.error(...parameters);  // eslint-disable-line no-console
  }
}
