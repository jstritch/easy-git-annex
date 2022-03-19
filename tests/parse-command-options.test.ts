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
    // OptionKind.RepeatableFlag
    [[CommandGroup.Git, 'branch', { '--verbose': null }], ['--verbose']],
    [[CommandGroup.Git, 'branch', { '--verbose': [null] }], ['--verbose']],
    [[CommandGroup.Git, 'branch', { '--verbose': [null, null] }], ['--verbose', '--verbose']],
    [[CommandGroup.Git, 'branch', { '--verbose': [] }], []],
    // OptionKind.Stuck
    [[CommandGroup.Git, 'log', { '-L': 2 }], ['-L2']],
    [[CommandGroup.Git, 'log', { '-L': '3,10:foo.js' }], ['-L3,10:foo.js']],
    // OptionKind.OptionalStuck
    [[CommandGroup.Git, 'tag', { '-n': 2 }], ['-n2']],
    [[CommandGroup.Git, 'tag', { '-n': 'Arg' }], ['-nArg']],
    [[CommandGroup.Git, 'tag', { '-n': null }], ['-n']],
    // OptionKind.KeyValue
    [[CommandGroup.AnxCommon, 'config', { '--set': ['annex.largefiles', 'include=*.m4a'] }], ['--set', 'annex.largefiles', 'include=*.m4a']],
    // OptionKind.CommaDelimitedKeyValue
    [[CommandGroup.Git, 'clone', { '--config': ['name', 'value'] }], ['--config', 'name=value']],
    [[CommandGroup.Git, 'clone', { '--config': [['name', 'value']] }], ['--config', 'name=value']],
    [[CommandGroup.Git, 'clone', { '--config': [['name0', 'value0'], ['name1', 'value1']] }], ['--config', 'name0=value0,name1=value1']],
    [[CommandGroup.Git, 'clone', { '--config': [] }], []],
    // OptionKind.RepeatableKeyValue
    [[CommandGroup.AnxCommon, 'version', { '--c': ['name', 'value'] }], ['--c', 'name=value']],
    [[CommandGroup.AnxCommon, 'version', { '--c': [['name', 'value']] }], ['--c', 'name=value']],
    [[CommandGroup.AnxCommon, 'version', { '--c': [['name0', 'value0'], ['name1', 'value1']] }], ['--c', 'name0=value0', '--c', 'name1=value1']],
    [[CommandGroup.AnxCommon, 'version', { '--c': [] }], []],
    // OptionKind.AnonymousKeyValue
    [[CommandGroup.Git, 'config', { set: ['easy-git-annex.test', 'true'] }], ['easy-git-annex.test', 'true']],
    // OptionKind.Numeric
    [[CommandGroup.AnxCommon, 'version', { '--numcopies': 2 }], ['--numcopies=2']],
    [[CommandGroup.AnxCommon, 'version', { '--numcopies': '3' }], ['--numcopies=3']],
    // OptionKind.OptionalNumeric
    [[CommandGroup.Git, 'log', { '--expand-tabs': 2 }], ['--expand-tabs=2']],
    [[CommandGroup.Git, 'log', { '--expand-tabs': '3' }], ['--expand-tabs=3']],
    [[CommandGroup.Git, 'log', { '--expand-tabs': null }], ['--expand-tabs']],
    // OptionKind.NumericParam
    [[CommandGroup.Git, 'clone', { '--jobs': 2 }], ['--jobs', '2']],
    [[CommandGroup.Git, 'clone', { '--jobs': '3' }], ['--jobs', '3']],
    // OptionKind.Date
    [[CommandGroup.Git, 'log', { '--since': new Date('2022-03-10T00:00:00.000Z') }], ['--since=2022-03-10T00:00:00Z']],
    [[CommandGroup.Git, 'log', { '--since': 'yesterday' }], ['--since=yesterday']],
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
    [[CommandGroup.AnxCommon, 'version', { '--debugfilter': [] }], []],
    // OptionKind.OptionalCommaDelimitedStrings
    [[CommandGroup.Git, 'tag', { '--column': 'never' }], ['--column=never']],
    [[CommandGroup.Git, 'tag', { '--column': ['always'] }], ['--column=always']],
    [[CommandGroup.Git, 'tag', { '--column': ['column', 'dense'] }], ['--column=column,dense']],
    [[CommandGroup.Git, 'tag', { '--column': null }], ['--column']],
    [[CommandGroup.Git, 'tag', { '--column': [] }], []],
    // OptionKind.RepeatableString
    [[CommandGroup.Git, 'tag', { '--sort': 'col' }], ['--sort=col']],
    [[CommandGroup.Git, 'tag', { '--sort': ['col'] }], ['--sort=col']],
    [[CommandGroup.Git, 'tag', { '--sort': ['col0', 'col1'] }], ['--sort=col0', '--sort=col1']],
    [[CommandGroup.Git, 'tag', { '--sort': [] }], []],
    // OptionKind.RepeatableOptionalString
    [[CommandGroup.Git, 'for-each-ref', { '--contains': 'c233c7a' }], ['--contains=c233c7a']],
    [[CommandGroup.Git, 'for-each-ref', { '--contains': ['c233c7a'] }], ['--contains=c233c7a']],
    [[CommandGroup.Git, 'for-each-ref', { '--contains': ['c233c7a', 'ab2c420'] }], ['--contains=c233c7a', '--contains=ab2c420']],
    [[CommandGroup.Git, 'for-each-ref', { '--contains': null }], ['--contains']],
    [[CommandGroup.Git, 'for-each-ref', { '--contains': [] }], []],
    // OptionKind.RepeatableOptionalStringParam
    [[CommandGroup.Git, 'branch', { '--contains': 'c233c7a' }], ['--contains', 'c233c7a']],
    [[CommandGroup.Git, 'branch', { '--contains': ['c233c7a'] }], ['--contains', 'c233c7a']],
    [[CommandGroup.Git, 'branch', { '--contains': ['c233c7a', 'ab2c420'] }], ['--contains', 'c233c7a', '--contains', 'ab2c420']],
    [[CommandGroup.Git, 'branch', { '--contains': null }], ['--contains']],
    [[CommandGroup.Git, 'branch', { '--contains': [] }], []],
    // OptionKind.AnonymousStrings
    [[CommandGroup.AnxCommon, 'list', { matching: '--include=*.mp3' }], ['--include=*.mp3']],
    [[CommandGroup.AnxCommon, 'list', { matching: ['--include=*.mp3'] }], ['--include=*.mp3']],
    [[CommandGroup.AnxCommon, 'list', { matching: ['--include=*.mp3', '--or', '--include=*.ogg'] }], ['--include=*.mp3', '--or', '--include=*.ogg']],
    [[CommandGroup.AnxCommon, 'list', { matching: [] }], []],
    // OptionKind.NamedStrings
    [[CommandGroup.Git, 'checkout', { '-b': 'A' }], ['-b', 'A']],
    [[CommandGroup.Git, 'checkout', { '-b': ['A'] }], ['-b', 'A']],
    [[CommandGroup.Git, 'checkout', { '-b': ['A', 'B'] }], ['-b', 'A', 'B']],
    [[CommandGroup.Git, 'checkout', { '-b': [] }], []],
    // OptionKind.RepeatablePath
    [[CommandGroup.AnxCommon, 'sync', { '--content-of': 'aaa/bbb/ccc' }], ['--content-of=aaa/bbb/ccc']],
    [[CommandGroup.AnxCommon, 'sync', { '--content-of': ['aaa/bbb/ccc'] }], ['--content-of=aaa/bbb/ccc']],
    [[CommandGroup.AnxCommon, 'sync', { '--content-of': ['aaa/bbb/ccc', 'xxx/yyy/zzz'] }], ['--content-of=aaa/bbb/ccc', '--content-of=xxx/yyy/zzz']],
    [[CommandGroup.AnxCommon, 'sync', { '--content-of': [] }], []],
  ];

  test.each(tests)('parseCommandOptions(%o)', ([grp, cmd, opts], expected) => {
    expect(parseCommandOptions(grp, cmd, opts)).toEqual(expected);
  });

  const throws: [[CommandGroup, string, unknown], string][] = [
    [[CommandGroup.AnxCommon, 'version', 3], 'The type number is not supported for commandOptions, use object | string[] instead'],
    // OptionKind.Flag
    [[CommandGroup.AnxCommon, 'version', { '--raw': true }], 'Value type boolean is not supported for version option --raw, use null instead'],
    // OptionKind.RepeatableFlag
    [[CommandGroup.Git, 'branch', { '--verbose': true }], 'Value type boolean is not supported for branch option --verbose, use null | [null, null?] instead'],
    // OptionKind.Stuck
    [[CommandGroup.Git, 'log', { '-L': null }], 'Value type object is not supported for log option -L, use number | string instead'],
    // OptionKind.OptionalStuck
    [[CommandGroup.Git, 'tag', { '-n': true }], 'Value type boolean is not supported for tag option -n, use number | string | null instead'],
    // OptionKind.KeyValue
    [[CommandGroup.AnxCommon, 'config', { '--set': 'key=value' }], 'Value type string is not supported for config option --set, use [string, string] instead'],
    // OptionKind.CommaDelimitedKeyValue
    [[CommandGroup.Git, 'clone', { '--config': {} }], 'Value type object is not supported for clone option --config, use [string, string] | [string, string][] instead'],
    // OptionKind.RepeatableKeyValue
    [[CommandGroup.AnxCommon, 'version', { '--c': {} }], 'Value type object is not supported for version option --c, use [string, string] | [string, string][] instead'],
    // OptionKind.AnonymousKeyValue
    [[CommandGroup.Git, 'config', { set: 'key=value' }], 'Value type string is not supported for config option set, use [string, string] instead'],
    // OptionKind.Numeric
    [[CommandGroup.AnxCommon, 'version', { '--numcopies': null }], 'Value type object is not supported for version option --numcopies, use number | string instead'],
    // OptionKind.OptionalNumeric
    [[CommandGroup.Git, 'log', { '--expand-tabs': {} }], 'Value type object is not supported for log option --expand-tabs, use number | string | null instead'],
    // OptionKind.NumericParam
    [[CommandGroup.Git, 'clone', { '--jobs': ['A', 'B'] }], 'Value type object is not supported for clone option --jobs, use number | string instead'],
    // OptionKind.Date
    [[CommandGroup.Git, 'log', { '--since': {} }], 'Value type object is not supported for log option --since, use Date | string instead'],
    // OptionKind.String
    [[CommandGroup.AnxCommon, 'version', { '--time-limit': 30 }], 'Value type number is not supported for version option --time-limit, use string instead'],
    // OptionKind.OptionalString
    [[CommandGroup.Git, 'status', { '--porcelain': 1 }], 'Value type number is not supported for status option --porcelain, use string | null instead'],
    // OptionKind.StringParam
    [[CommandGroup.Git, 'clone', { '--origin': 30 }], 'Value type number is not supported for clone option --origin, use string instead'],
    // OptionKind.OptionalStringParam
    [[CommandGroup.Git, 'tag', { '--points-at': 30 }], 'Value type number is not supported for tag option --points-at, use string | null instead'],
    // OptionKind.CommaDelimitedStrings
    [[CommandGroup.AnxCommon, 'version', { '--debugfilter': {} }], 'Value type object is not supported for version option --debugfilter, use string | string[] instead'],
    // OptionKind.OptionalCommaDelimitedStrings
    [[CommandGroup.Git, 'tag', { '--column': {} }], 'Value type object is not supported for tag option --column, use string | string[] | null instead'],
    // OptionKind.RepeatableString
    [[CommandGroup.Git, 'tag', { '--sort': {} }], 'Value type object is not supported for tag option --sort, use string | string[] instead'],
    // OptionKind.RepeatableOptionalString
    [[CommandGroup.Git, 'for-each-ref', { '--contains': {} }], 'Value type object is not supported for for-each-ref option --contains, use string | string[] | null instead'],
    // OptionKind.RepeatableOptionalStringParam
    [[CommandGroup.Git, 'branch', { '--contains': {} }], 'Value type object is not supported for branch option --contains, use string | string[] | null instead'],
    // OptionKind.AnonymousStrings
    [[CommandGroup.AnxCommon, 'list', { matching: {} }], 'Value type object is not supported for list option matching, use string | string[] instead'],
    // OptionKind.NamedStrings
    [[CommandGroup.Git, 'checkout', { '-b': {} }], 'Value type object is not supported for checkout option -b, use string | string[] instead'],
    // OptionKind.RepeatablePath
    [[CommandGroup.AnxCommon, 'sync', { '--content-of': {} }], 'Value type object is not supported for sync option --content-of, use string | string[] instead'],
  ];

  test.each(throws)('parseCommandOptions(%o)', ([grp, cmd, opts], expected) => {
    expect(() => {
      parseCommandOptions(grp, cmd, opts);
    }).toThrow(expected);

  });

});
