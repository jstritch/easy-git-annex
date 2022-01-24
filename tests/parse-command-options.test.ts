import { CommandGroup } from '../src/helpers/command-options';
import { parseCommandOptions } from '../src/helpers/parse-command-options';

describe('parseCommandOptions', () => {

  test('identifies an undefined argument', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', undefined);

    expect(opts).toHaveLength(0);
  });

  test('identifies a number argument', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', 3);
    }).toThrow('The type number is not supported for commandOptions, use object | string[] instead');
  });

  test('parses an empty argument', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', {});

    expect(opts).toHaveLength(0);
  });

  test('identifies an unsupported command', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'foo', {});
    }).toThrow('The Anx command foo is not recognized');
  });

  test('returns a string array', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', ['foo', 'bar', 'baz', 'quux']);

    expect(opts).toEqual(['foo', 'bar', 'baz', 'quux']);
  });

  // Flag

  test('parses a Flag', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--raw': null });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--raw');
  });

  test('identifies a non-null Flag value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--raw': true });
    }).toThrow('Value type boolean is not supported for version option --raw, use null instead');
  });

  // KeyValue

  test('parses a KeyValue', () => {
    const key = 'annex.largefiles';
    const value = 'include=*.m4a or include=*.jpg or include=*.itl or include=*.db';
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'config', { '--set': [key, value] });

    expect(opts).toEqual(['--set', key, value]);
  });

  test('identifies an unexpected KeyValue value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'config', { '--set': 'key=value' });
    }).toThrow('Value type string is not supported for config option --set, use [string, string] instead');
  });

  // RepeatableKeyValue

  test('parses a RepeatableKeyValue scalar', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': ['name', 'value'] });

    expect(opts).toEqual(['--c', 'name=value']);
  });

  test('parses a RepeatableKeyValue array[2]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': [['name0', 'value0'], ['name1', 'value1']] });

    expect(opts).toEqual(['--c', 'name0=value0', '--c', 'name1=value1']);
  });

  test('identifies an empty RepeatableKeyValue array', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': [] });
    }).toThrow('Value type object is not supported for version option --c, use [string, string] | [string, string][] instead');
  });

  test('identifies an unexpected RepeatableKeyValue value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': {} });
    }).toThrow('Value type object is not supported for version option --c, use [string, string] | [string, string][] instead');
  });

  // AnonymousKeyValue

  test('parses a AnonymousKeyValue', () => {
    const key = 'easy-git-annex.test';
    const value = 'true';
    const opts = parseCommandOptions(CommandGroup.Git, 'config', { set: [key, value] });

    expect(opts).toEqual([key, value]);
  });

  test('identifies an unexpected AnonymousKeyValue value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.Git, 'config', { set: 'key=value' });
    }).toThrow('Value type string is not supported for config option set, use [string, string] instead');
  });

  // Numeric

  test('parses a Numeric number', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--numcopies': 2 });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--numcopies=2');
  });

  test('parses a Numeric string', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--numcopies': '3' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--numcopies=3');
  });

  test('identifies an unexpected Numeric value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--numcopies': null });
    }).toThrow('Value type object is not supported for version option --numcopies, use number | string instead');
  });

  // String

  test('parses a String', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--time-limit': '30m' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--time-limit=30m');
  });

  test('identifies an unexpected String value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--time-limit': 30 });
    }).toThrow('Value type number is not supported for version option --time-limit, use string instead');
  });

  // OptionalString

  test('parses an OptionalString with string value', () => {
    const opts = parseCommandOptions(CommandGroup.Git, 'status', { '--porcelain': 'v1' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--porcelain=v1');
  });

  test('parses an OptionalString with null value', () => {
    const opts = parseCommandOptions(CommandGroup.Git, 'status', { '--porcelain': null });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--porcelain');
  });

  test('identifies an unexpected OptionalString value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.Git, 'status', { '--porcelain': 1 });
    }).toThrow('Value type number is not supported for status option --porcelain, use string | null instead');
  });

  // StringParam

  test('parses a StringParam', () => {
    const opts = parseCommandOptions(CommandGroup.Git, 'clone', { '--origin': 'nodeName' });

    expect(opts).toEqual(['--origin', 'nodeName']);
  });

  test('identifies an unexpected StringParam value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.Git, 'clone', { '--origin': 30 });
    }).toThrow('Value type number is not supported for clone option --origin, use string instead');
  });

  // CommaDelimitedStrings

  test('parses a CommaDelimitedStrings scalar', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': 'Process' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--debugfilter=Process');
  });

  test('parses a CommaDelimitedStrings array[1]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': ['Process'] });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--debugfilter=Process');
  });

  test('parses a CommaDelimitedStrings array[2]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': ['Process', 'External'] });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--debugfilter=Process,External');
  });

  test('identifies an empty CommaDelimitedStrings value array', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': [] });
    }).toThrow('Value type object is not supported for version option --debugfilter, use string | string[] instead');
  });

  test('identifies an unexpected CommaDelimitedStrings value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': true });
    }).toThrow('Value type boolean is not supported for version option --debugfilter, use string | string[] instead');
  });

  // AnonymousStrings

  test('parses an AnonymousStrings scalar', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: '--exclude=\'*.mp3\'' });

    expect(opts).toEqual(['--exclude=\'*.mp3\'']);
  });

  test('parses an AnonymousStrings array[3]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: ['--exclude=\'*.mp3\'', '--or', '--include=\'*.ogg\''] });

    expect(opts).toEqual(['--exclude=\'*.mp3\'', '--or', '--include=\'*.ogg\'']);
  });

  test('identifies an empty AnonymousStrings value array', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: [] });
    }).toThrow('Value type object is not supported for list option matching, use string | string[] instead');
  });

  test('identifies an unexpected AnonymousStrings value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: 3 });
    }).toThrow('Value type number is not supported for list option matching, use string | string[] instead');
  });

  // RepeatablePath

  test('parses a RepeatablePath scalar', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'sync', { '--content-of': 'aaa/bbb/ccc' });

    expect(opts).toEqual(['--content-of=aaa/bbb/ccc']);
  });

  test('parses a RepeatablePath array[2]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'sync', { '--content-of': ['aaa/bbb/ccc', 'xxx/yyy/zzz'] });

    expect(opts).toEqual(['--content-of=aaa/bbb/ccc', '--content-of=xxx/yyy/zzz']);
  });

  test('identifies an empty RepeatablePath value array', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'sync', { '--content-of': [] });
    }).toThrow('Value type object is not supported for sync option --content-of, use string | string[] instead');
  });

  test('identifies an unexpected RepeatablePath value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'sync', { '--content-of': {} });
    }).toThrow('Value type object is not supported for sync option --content-of, use string | string[] instead');
  });

});
