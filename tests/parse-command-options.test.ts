import { CommandGroup } from '../src/helpers/command-options';
import { parseCommandOptions } from '../src/helpers/parse-command-options';

describe('parseCommandOptions', () => {

  const tests: [[CommandGroup, string, unknown], string[]][] = [
    [[CommandGroup.AnxCommon, 'version', undefined], []],
    [[CommandGroup.AnxCommon, 'version', {}], []],
    [[CommandGroup.AnxCommon, 'version', ['foo', 'bar', 'baz', 'quux']], ['foo', 'bar', 'baz', 'quux']],
    [['' as unknown as CommandGroup, 'version', {}], []],
    [[CommandGroup.AnxCommon, '', {}], []],
    [[CommandGroup.AnxCommon, '9ab5dece-8dcc-11ec-b9c3-976782f8999a', {}], []],
    [[CommandGroup.Git, 'version', ['foo', 'bar', 'baz', 'quux']], ['foo', 'bar', 'baz', 'quux']],
    [[CommandGroup.Git, '9ab5dece-8dcc-11ec-b9c3-976782f8999a', {}], []],
    // OptionKind.Flag
    [[CommandGroup.AnxCommon, 'version', { '--raw': null }], ['--raw']],
    // OptionKind.Stuck
    [[CommandGroup.Git, 'tag', { '-n': 2 }], ['-n2']],
    [[CommandGroup.Git, 'tag', { '-n': 'Arg' }], ['-nArg']],
    [[CommandGroup.Git, 'tag', { '-n': null }], ['-n']],
    // OptionKind.KeyValue
    [[CommandGroup.AnxCommon, 'config', { '--set': ['annex.largefiles', 'include=*.m4a'] }], ['--set', 'annex.largefiles', 'include=*.m4a']],
    // OptionKind.CommaDelimitedKeyValue
    [[CommandGroup.Git, 'clone', { '--config': ['name', 'value'] }], ['--config', 'name=value']],
    [[CommandGroup.Git, 'clone', { '--config': [['name0', 'value0'], ['name1', 'value1']] }], ['--config', 'name0=value0,name1=value1']],
    // OptionKind.RepeatableKeyValue
    [[CommandGroup.AnxCommon, 'version', { '--c': ['name', 'value'] }], ['--c', 'name=value']],
    [[CommandGroup.AnxCommon, 'version', { '--c': [['name0', 'value0'], ['name1', 'value1']] }], ['--c', 'name0=value0', '--c', 'name1=value1']],
    // OptionKind.AnonymousKeyValue
    [[CommandGroup.Git, 'config', { set: ['easy-git-annex.test', 'true'] }], ['easy-git-annex.test', 'true']],
    // OptionKind.Numeric
    [[CommandGroup.AnxCommon, 'version', { '--numcopies': 2 }], ['--numcopies=2']],
    [[CommandGroup.AnxCommon, 'version', { '--numcopies': '3' }], ['--numcopies=3']],
    // OptionKind.NumericParam
    [[CommandGroup.Git, 'clone', { '--jobs': 2 }], ['--jobs', '2']],
    [[CommandGroup.Git, 'clone', { '--jobs': '3' }], ['--jobs', '3']],
    // OptionKind.String
    [[CommandGroup.AnxCommon, 'version', { '--time-limit': '30m' }], ['--time-limit=30m']],
    // OptionKind.OptionalString
    [[CommandGroup.Git, 'status', { '--porcelain': 'v1' }], ['--porcelain=v1']],
    [[CommandGroup.Git, 'status', { '--porcelain': null }], ['--porcelain']],
    // OptionKind.StringParam
    [[CommandGroup.Git, 'clone', { '--origin': 'nodeName' }], ['--origin', 'nodeName']],
    // OptionKind.OptionalStringParam
    [[CommandGroup.Git, 'tag', { '--merged': 'merged' }], ['--merged', 'merged']],
    [[CommandGroup.Git, 'tag', { '--merged': null }], ['--merged']],
    // OptionKind.CommaDelimitedStrings
    [[CommandGroup.AnxCommon, 'version', { '--debugfilter': 'Process' }], ['--debugfilter=Process']],
    [[CommandGroup.AnxCommon, 'version', { '--debugfilter': ['Process'] }], ['--debugfilter=Process']],
    [[CommandGroup.AnxCommon, 'version', { '--debugfilter': ['Process', 'External'] }], ['--debugfilter=Process,External']],
    // OptionKind.OptionalCommaDelimitedStrings
    [[CommandGroup.Git, 'tag', { '--column': 'never' }], ['--column=never']],
    [[CommandGroup.Git, 'tag', { '--column': ['always'] }], ['--column=always']],
    [[CommandGroup.Git, 'tag', { '--column': ['column', 'dense'] }], ['--column=column,dense']],
    [[CommandGroup.Git, 'tag', { '--column': null }], ['--column']],
    // OptionKind.RepeatableString
    [[CommandGroup.Git, 'tag', { '--sort': 'col' }], ['--sort=col']],
    [[CommandGroup.Git, 'tag', { '--sort': ['col0', 'col1'] }], ['--sort=col0', '--sort=col1']],
    // OptionKind.AnonymousStrings
    [[CommandGroup.AnxCommon, 'list', { matching: '--include=*.mp3' }], ['--include=*.mp3']],
    [[CommandGroup.AnxCommon, 'list', { matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }], ['--include=*.mp3', '--or', '--include=*.ogg']],
    // OptionKind.RepeatablePath
    [[CommandGroup.AnxCommon, 'sync', { '--content-of': 'aaa/bbb/ccc' }], ['--content-of=aaa/bbb/ccc']],
    [[CommandGroup.AnxCommon, 'sync', { '--content-of': ['aaa/bbb/ccc', 'xxx/yyy/zzz'] }], ['--content-of=aaa/bbb/ccc', '--content-of=xxx/yyy/zzz']],
  ];

  test.each(tests)('parseCommandOptions(%o)', ([grp, cmd, opts], expected) => {
    expect(parseCommandOptions(grp, cmd, opts)).toEqual(expected);
  });

  const throws: [[CommandGroup, string, unknown], string][] = [
    [[CommandGroup.AnxCommon, 'version', 3], 'The type number is not supported for commandOptions, use object | string[] instead'],
    // OptionKind.Flag
    [[CommandGroup.AnxCommon, 'version', { '--raw': true }], 'Value type boolean is not supported for version option --raw, use null instead'],
    // OptionKind.Stuck
    [[CommandGroup.Git, 'tag', { '-n': true }], 'Value type boolean is not supported for tag option -n, use number | string | null instead'],
    // OptionKind.KeyValue
    [[CommandGroup.AnxCommon, 'config', { '--set': 'key=value' }], 'Value type string is not supported for config option --set, use [string, string] instead'],
    // OptionKind.CommaDelimitedKeyValue
    [[CommandGroup.Git, 'clone', { '--config': ['name'] }], 'Value type object is not supported for clone option --config, use [string, string] | [string, string][] instead'],
    // OptionKind.RepeatableKeyValue
    [[CommandGroup.AnxCommon, 'version', { '--c': [] }], 'Value type object is not supported for version option --c, use [string, string] | [string, string][] instead'],
    [[CommandGroup.AnxCommon, 'version', { '--c': {} }], 'Value type object is not supported for version option --c, use [string, string] | [string, string][] instead'],
    // OptionKind.AnonymousKeyValue
    [[CommandGroup.Git, 'config', { set: 'key=value' }], 'Value type string is not supported for config option set, use [string, string] instead'],
    // OptionKind.Numeric
    [[CommandGroup.AnxCommon, 'version', { '--numcopies': null }], 'Value type object is not supported for version option --numcopies, use number | string instead'],
    // OptionKind.NumericParam
    [[CommandGroup.Git, 'clone', { '--jobs': ['A', 'B'] }], 'Value type object is not supported for clone option --jobs, use number | string instead'],
    // OptionKind.String
    [[CommandGroup.AnxCommon, 'version', { '--time-limit': 30 }], 'Value type number is not supported for version option --time-limit, use string instead'],
    // OptionKind.OptionalString
    [[CommandGroup.Git, 'status', { '--porcelain': 1 }], 'Value type number is not supported for status option --porcelain, use string | null instead'],
    // OptionKind.StringParam
    [[CommandGroup.Git, 'clone', { '--origin': 30 }], 'Value type number is not supported for clone option --origin, use string instead'],
    // OptionKind.OptionalStringParam
    [[CommandGroup.Git, 'tag', { '--merged': 30 }], 'Value type number is not supported for tag option --merged, use string | null instead'],
    // OptionKind.CommaDelimitedStrings
    [[CommandGroup.AnxCommon, 'version', { '--debugfilter': [] }], 'Value type object is not supported for version option --debugfilter, use string | string[] instead'],
    [[CommandGroup.AnxCommon, 'version', { '--debugfilter': true }], 'Value type boolean is not supported for version option --debugfilter, use string | string[] instead'],
    // OptionKind.OptionalCommaDelimitedStrings
    [[CommandGroup.Git, 'tag', { '--column': [] }], 'Value type object is not supported for tag option --column, use string | string[] | null instead'],
    [[CommandGroup.Git, 'tag', { '--column': true }], 'Value type boolean is not supported for tag option --column, use string | string[] | null instead'],
    // OptionKind.RepeatableString
    [[CommandGroup.Git, 'tag', { '--sort': [] }], 'Value type object is not supported for tag option --sort, use string | string[] instead'],
    // OptionKind.AnonymousStrings
    [[CommandGroup.AnxCommon, 'list', { matching: [] }], 'Value type object is not supported for list option matching, use string | string[] instead'],
    [[CommandGroup.AnxCommon, 'list', { matching: 3 }], 'Value type number is not supported for list option matching, use string | string[] instead'],
    // OptionKind.RepeatablePath
    [[CommandGroup.AnxCommon, 'sync', { '--content-of': [] }], 'Value type object is not supported for sync option --content-of, use string | string[] instead'],
  ];

  test.each(throws)('parseCommandOptions(%o)', ([grp, cmd, opts], expected) => {
    expect(() => {
      parseCommandOptions(grp, cmd, opts);
    }).toThrow(expected);

  });

});
