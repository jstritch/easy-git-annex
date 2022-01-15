import { CommandGroup } from '../src/helpers/command-options';
import { parseCommandOptions } from '../src/helpers/parse-command-options';

describe('parseCommandOptions', () => {

  test('correctly identifies an undefined argument', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', undefined);

    expect(opts).toHaveLength(0);
  });

  test('correctly identifies a number argument', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', 3);
    }).toThrow('The type number is not supported for commandOptions, use object | string[] instead');
  });

  test('correctly parses an empty argument', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', {});

    expect(opts).toHaveLength(0);
  });

  test('correctly identifies an unsupported command', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'foo', {});
    }).toThrow('The anx command foo is not recognized');
  });

  test('correctly returns a string array', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', ['foo', 'bar', 'baz', 'quux']);

    expect(opts).toEqual(['foo', 'bar', 'baz', 'quux']);
  });

  // Flag

  test('correctly parses a Flag', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--raw': null });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--raw');
  });

  test('correctly identifies a non-null Flag value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--raw': true });
    }).toThrow('Value type boolean is not supported for option --raw, use null instead');
  });

  // KeyValue

  test('correctly parses a KeyValue', () => {
    const key = 'annex.largefiles';
    const value = 'include=*.m4a or include=*.jpg or include=*.itl or include=*.db';
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'config', { '--set': [key, value] });

    expect(opts).toEqual(['--set', key, value]);
  });

  test('correctly identifies an unexpected KeyValue value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'config', { '--set': 'key=value' });
    }).toThrow('Value type string is not supported for option --set, use [string, string] instead');
  });

  // RepeatableKeyValue

  test('correctly parses a RepeatableKeyValue scalar', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': ['name', 'value'] });

    expect(opts).toEqual(['--c', 'name=value']);
  });

  test('correctly parses a RepeatableKeyValue array[2]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': [['name0', 'value0'], ['name1', 'value1']] });

    expect(opts).toEqual(['--c', 'name0=value0', '--c', 'name1=value1']);
  });

  test('correctly identifies an unexpected RepeatableKeyValue value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': {} });
    }).toThrow('Value type object is not supported for option --c, use [string, string] | [string, string][] instead');
  });

  // AnonymousKeyValue

  test('correctly parses a AnonymousKeyValue', () => {
    const key = 'git-annex-js.test';
    const value = 'true';
    const opts = parseCommandOptions(CommandGroup.Git, 'config', { set: [key, value] });

    expect(opts).toEqual([key, value]);
  });

  test('correctly identifies an unexpected AnonymousKeyValue value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.Git, 'config', { set: 'key=value' });
    }).toThrow('Value type string is not supported for option set, use [string, string] instead');
  });

  // Numeric

  test('correctly parses a Numeric number', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--numcopies': 2 });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--numcopies=2');
  });

  test('correctly parses a Numeric string', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--numcopies': '3' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--numcopies=3');
  });

  test('correctly identifies an unexpected Numeric value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--numcopies': null });
    }).toThrow('Value type object is not supported for option --numcopies, use number | string instead');
  });

  // String

  test('correctly parses a String', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--time-limit': '30m' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--time-limit=30m');
  });

  test('correctly identifies an unexpected String value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--time-limit': 30 });
    }).toThrow('Value type number is not supported for option --time-limit, use string instead');
  });

  // StringParam

  test('correctly parses a StringParam', () => {
    const opts = parseCommandOptions(CommandGroup.Git, 'clone', { '--origin': 'nodeName' });

    expect(opts).toEqual(['--origin', 'nodeName']);
  });

  test('correctly identifies an unexpected StringParam value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.Git, 'clone', { '--origin': 30 });
    }).toThrow('Value type number is not supported for option --origin, use string instead');
  });

  // CommaDelimitedStrings

  test('correctly parses a CommaDelimitedStrings scalar', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': 'Process' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--debugfilter=Process');
  });

  test('correctly parses a CommaDelimitedStrings array[1]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': ['Process'] });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--debugfilter=Process');
  });

  test('correctly parses a CommaDelimitedStrings array[2]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': ['Process', 'External'] });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--debugfilter=Process,External');
  });

  test('correctly identifies an unexpected CommaDelimitedStrings value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': true });
    }).toThrow('Value type boolean is not supported for option --debugfilter, use string | string[] instead');
  });

  // AnonymousStrings

  test('correctly parses an AnonymousStrings scalar', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: '--exclude=\'*.mp3\'' });

    expect(opts).toEqual(['--exclude=\'*.mp3\'']);
  });

  test('correctly parses an AnonymousStrings array[3]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: ['--exclude=\'*.mp3\'', '--or', '--include=\'*.ogg\''] });

    expect(opts).toEqual(['--exclude=\'*.mp3\'', '--or', '--include=\'*.ogg\'']);
  });

  test('correctly identifies an unexpected AnonymousStrings value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: 3 });
    }).toThrow('Value type number is not supported for option matching, use string | string[] instead');
  });

  // RepeatablePath

  test('correctly parses a RepeatablePath scalar', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'sync', { '--content-of': 'aaa/bbb/ccc' });

    expect(opts).toEqual(['--content-of=aaa/bbb/ccc']);
  });

  test('correctly parses a RepeatablePath array[2]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'sync', { '--content-of': ['aaa/bbb/ccc', 'xxx/yyy/zzz'] });

    expect(opts).toEqual(['--content-of=aaa/bbb/ccc', '--content-of=xxx/yyy/zzz']);
  });

  test('correctly identifies an unexpected RepeatablePath value', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'sync', { '--content-of': {} });
    }).toThrow('Value type object is not supported for option --content-of, use string | string[] instead');
  });

});
