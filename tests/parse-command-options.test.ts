import { CommandGroup } from '../src/helpers/command-options';
import { parseCommandOptions } from '../src/helpers/parse-command-options';

describe('parseCommandOptions', () => {

  test('parses an empty argument', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', {});

    expect(opts).toHaveLength(0);
  });

  test('parses a string[4]', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', ['foo', 'bar', 'baz', 'quux']);

    expect(opts).toEqual(['foo', 'bar', 'baz', 'quux']);
  });

  test('identifies an undefined argument', () => {
    const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', undefined);

    expect(opts).toHaveLength(0);
  });

  test('identifies a number argument', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'version', 3);
    }).toThrow('The type number is not supported for commandOptions, use object | string[] instead');
  });

  test('identifies an unsupported command', () => {
    expect(() => {
      parseCommandOptions(CommandGroup.AnxCommon, 'foo', {});
    }).toThrow('The Anx command foo is not recognized');
  });

  describe('OptionKind.Flag', () => {

    test('parses a null', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--raw': null });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--raw');
    });

    test('identifies a non-null value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--raw': true });
      }).toThrow('Value type boolean is not supported for version option --raw, use null instead');
    });

  });

  describe('OptionKind.Stuck', () => {

    test('parses a number', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '-n': 2 });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('-n2');
    });

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '-n': 'Arg' });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('-nArg');
    });

    test('parses a null', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '-n': null });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('-n');
    });

    test('identifies an unexpected Stuck value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.Git, '_listTag', { '-n': true });
      }).toThrow('Value type boolean is not supported for _listTag option -n, use number | string | null instead');
    });

  });

  describe('OptionKind.KeyValue', () => {

    test('parses a [string, string]', () => {
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

  });

  describe('OptionKind.RepeatableKeyValue', () => {

    test('parses a [string, string]', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': ['name', 'value'] });

      expect(opts).toEqual(['--c', 'name=value']);
    });

    test('parses a [string, string][2]', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': [['name0', 'value0'], ['name1', 'value1']] });

      expect(opts).toEqual(['--c', 'name0=value0', '--c', 'name1=value1']);
    });

    test('identifies an empty array', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': [] });
      }).toThrow('Value type object is not supported for version option --c, use [string, string] | [string, string][] instead');
    });

    test('identifies an unexpected RepeatableKeyValue value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--c': {} });
      }).toThrow('Value type object is not supported for version option --c, use [string, string] | [string, string][] instead');
    });

  });

  describe('OptionKind.AnonymousKeyValue', () => {

    test('parses a [string, string]', () => {
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

  });

  describe('OptionKind.Numeric', () => {

    test('parses a number', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--numcopies': 2 });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--numcopies=2');
    });

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--numcopies': '3' });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--numcopies=3');
    });

    test('identifies an unexpected Numeric value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--numcopies': null });
      }).toThrow('Value type object is not supported for version option --numcopies, use number | string instead');
    });

  });

  describe('OptionKind.String', () => {

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--time-limit': '30m' });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--time-limit=30m');
    });

    test('identifies an unexpected string value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--time-limit': 30 });
      }).toThrow('Value type number is not supported for version option --time-limit, use string instead');
    });

  });

  describe('OptionKind.OptionalString', () => {

    test('parses a string value', () => {
      const opts = parseCommandOptions(CommandGroup.Git, 'status', { '--porcelain': 'v1' });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--porcelain=v1');
    });

    test('parses a null value', () => {
      const opts = parseCommandOptions(CommandGroup.Git, 'status', { '--porcelain': null });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--porcelain');
    });

    test('identifies an unexpected OptionalString value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.Git, 'status', { '--porcelain': 1 });
      }).toThrow('Value type number is not supported for status option --porcelain, use string | null instead');
    });

  });

  describe('OptionKind.StringParam', () => {

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.Git, 'clone', { '--origin': 'nodeName' });

      expect(opts).toEqual(['--origin', 'nodeName']);
    });

    test('identifies an unexpected StringParam value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.Git, 'clone', { '--origin': 30 });
      }).toThrow('Value type number is not supported for clone option --origin, use string instead');
    });

  });

  describe('OptionKind.OptionalStringParam', () => {

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '--merged': 'merged' });

      expect(opts).toEqual(['--merged', 'merged']);
    });

    test('parses a null', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '--merged': null });

      expect(opts).toEqual(['--merged']);
    });

    test('identifies an unexpected OptionalStringParam value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.Git, '_listTag', { '--merged': 30 });
      }).toThrow('Value type number is not supported for _listTag option --merged, use string | null instead');
    });

  });

  describe('OptionKind.CommaDelimitedStrings', () => {

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': 'Process' });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--debugfilter=Process');
    });

    test('parses a string[1]', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': ['Process'] });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--debugfilter=Process');
    });

    test('parses a string[2]', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': ['Process', 'External'] });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--debugfilter=Process,External');
    });

    test('identifies an empty array', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': [] });
      }).toThrow('Value type object is not supported for version option --debugfilter, use string | string[] instead');
    });

    test('identifies an unexpected CommaDelimitedStrings value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.AnxCommon, 'version', { '--debugfilter': true });
      }).toThrow('Value type boolean is not supported for version option --debugfilter, use string | string[] instead');
    });

  });

  describe('OptionKind.OptionalCommaDelimitedStrings', () => {

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '--column': 'Process' });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--column=Process');
    });

    test('parses a string[1]', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '--column': ['Process'] });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--column=Process');
    });

    test('parses a string[2]', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '--column': ['Process', 'External'] });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--column=Process,External');
    });

    test('parses a null', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '--column': null });

      expect(opts).toHaveLength(1);
      expect(opts).toContain('--column');
    });

    test('identifies an empty array', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.Git, '_listTag', { '--column': [] });
      }).toThrow('Value type object is not supported for _listTag option --column, use string | string[] | null instead');
    });

    test('identifies an unexpected CommaDelimitedStrings value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.Git, '_listTag', { '--column': true });
      }).toThrow('Value type boolean is not supported for _listTag option --column, use string | string[] | null instead');
    });

  });

  describe('OptionKind.RepeatableString', () => {

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '--sort': 'col' });

      expect(opts).toEqual(['--sort=col']);
    });

    test('parses a string[2]', () => {
      const opts = parseCommandOptions(CommandGroup.Git, '_listTag', { '--sort': ['col0', 'col1'] });

      expect(opts).toEqual(['--sort=col0', '--sort=col1']);
    });

    test('identifies an empty array', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.Git, '_listTag', { '--sort': [] });
      }).toThrow('Value type object is not supported for _listTag option --sort, use string | string[] instead');
    });

    test('identifies an unexpected RepeatableString value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.Git, '_listTag', { '--sort': {} });
      }).toThrow('Value type object is not supported for _listTag option --sort, use string | string[] instead');
    });

  });

  describe('OptionKind.AnonymousStrings', () => {

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: '--exclude=\'*.mp3\'' });

      expect(opts).toEqual(['--exclude=\'*.mp3\'']);
    });

    test('parses astring[3]', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: ['--exclude=\'*.mp3\'', '--or', '--include=\'*.ogg\''] });

      expect(opts).toEqual(['--exclude=\'*.mp3\'', '--or', '--include=\'*.ogg\'']);
    });

    test('identifies an empty array', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: [] });
      }).toThrow('Value type object is not supported for list option matching, use string | string[] instead');
    });

    test('identifies an unexpected AnonymousStrings value', () => {
      expect(() => {
        parseCommandOptions(CommandGroup.AnxCommon, 'list', { matching: 3 });
      }).toThrow('Value type number is not supported for list option matching, use string | string[] instead');
    });

  });

  describe('OptionKind.RepeatablePath', () => {

    test('parses a string', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'sync', { '--content-of': 'aaa/bbb/ccc' });

      expect(opts).toEqual(['--content-of=aaa/bbb/ccc']);
    });

    test('parses a string[2]', () => {
      const opts = parseCommandOptions(CommandGroup.AnxCommon, 'sync', { '--content-of': ['aaa/bbb/ccc', 'xxx/yyy/zzz'] });

      expect(opts).toEqual(['--content-of=aaa/bbb/ccc', '--content-of=xxx/yyy/zzz']);
    });

    test('identifies an empty array', () => {
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

});
