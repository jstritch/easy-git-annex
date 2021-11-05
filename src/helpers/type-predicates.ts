/**
 * Type predicates encapsulate the type guards used throughout the package.
 */

export function isNumber(o: unknown): o is number {
  return typeof o === 'number';
}

export function isRecord(o: unknown): o is Record<string, unknown> {
  return Object.prototype.toString.call(o) === '[object Object]';
}

export function isString(o: unknown): o is string {
  return typeof o === 'string';
}

export function isStringArray(o: unknown): o is string[] {
  return Array.isArray(o) && o.every((element) => { return typeof element === 'string'; });
}
