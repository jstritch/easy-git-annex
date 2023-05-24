import * as anx from '../../src/index.ts';

export interface FooTag {
  name: string;
  objectName: string;
  taggerDate?: Date;
  contents?: string;
}

export function isFooTag(o: unknown): o is FooTag {
  if (!anx.isRecord(o)) { return false; }
  if (!anx.isString(o['name'])) { return false; }
  if (!anx.isString(o['objectName'])) { return false; }
  if ('taggerDate' in o && !anx.isDate(o['taggerDate'])) { return false; }
  if ('contents' in o && !anx.isString(o['contents'])) { return false; }
  return true;
}

export async function getFooTags(repositoryPath: string, tagName?: string, ignoreCase?: boolean): Promise<FooTag[]> {

  const columns: [string, anx.Parser?][] = [
    ['name'],
    ['objectName'],
    ['taggerDate', anx.parseUnixDate],
    ['contents', anx.parseOptionalString],
  ];

  const options: anx.ForEachRefOptions = {
    '--format': '%(refname:lstrip=2)%09%(objectname)%09%(taggerdate:unix)%09%(contents:lines=1)',
    '--sort': ['*refname'],
    ...ignoreCase === true && { '--ignore-case': null }
  };

  return anx.getTags(isFooTag, columns, repositoryPath, options, tagName);
}
