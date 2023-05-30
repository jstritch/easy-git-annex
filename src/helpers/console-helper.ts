export class ConsoleHelper {  // exists to allow mocking console methods in tests

  private static writer: ((...parameters: unknown[]) => void) | null = null;

  public static setWriter(writer: ((...parameters: unknown[]) => void) | null): void {
    ConsoleHelper.writer = writer;
  }

  public static writeError(...parameters: unknown[]): void {
    ConsoleHelper.writer === null ? console.error(...parameters) : ConsoleHelper.writer(...parameters);  // eslint-disable-line no-console
  }
}
