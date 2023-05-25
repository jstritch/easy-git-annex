/**
 * Parses a JSON string to the specified type.
 * @param guard The type predicate to validate the deserialized object.
 * @param json The JSON string to parse.
 * @typeParam T - The type of the returned objects.
 * @returns The desrialized object, if the type guard function returns true; otherwise, undefined.
 * @category Helper
 */
export function safeParse<T>(guard: (o: unknown) => o is T, json: string): T | undefined {
  try {
    const o = JSON.parse(json) as unknown;
    return guard(o) ? o : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Parses a multi-line string with one JSON object per line to an array of the specified type.
 * Objects not passing the type guard are silently filtered out of the result set.
 * @param guard The type predicate to validate each deserialized object.
 * @param text The JSON strings to parse.
 * @typeParam T - The type of the returned objects.
 * @returns An array containing the desrialized objects passing the type guard function.
 * @category Helper
 */
export function safeParseToArray<T>(guard: (o: unknown) => o is T, text: string): T[] {
  const a = [] as T[];
  const lines = text.length > 0 ? text.split('\n') : [];
  for (const json of lines) {
    const o = safeParse(guard, json);
    if (o) {
      a.push(o);
    }
  }
  return a;
}
