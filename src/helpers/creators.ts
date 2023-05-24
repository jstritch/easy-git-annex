import { Parser } from '../interfaces/parser.js';

export function createFromColumns<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], row: string[]): T | undefined {
  const o: Record<string, unknown> = {};
  const limit = Math.min(columns.length, row.length);
  for (let i = 0; i < limit; i++) {
    const valueParser = columns[i];
    const value = valueParser[1] !== undefined ? valueParser[1](row[i]) : row[i];
    if (value !== undefined) {
      o[valueParser[0]] = value;
    }
  }
  return guard(o) ? o : undefined;
}

export function createFromTextLines<T>(guard: (o: unknown) => o is T, columns: [string, Parser?][], table: string, columnDelimiter?: string): T[] {
  const a: T[] = [];
  table.split('\n').forEach((row) => {
    const o = createFromColumns(guard, columns, row.split(columnDelimiter ?? '\t'));
    if (o) {
      a.push(o);
    }
  });
  return a;
}
