import { parseAnnexOptions } from '../src/helpers/parse-annex-options';

describe('parseAnnexOptions', () => {

  test('correctly identifies an undefined argument', () => {
    const opts = parseAnnexOptions('version', undefined);

    expect(opts).toHaveLength(0);
  });

  test('correctly parses an empty argument', () => {
    const opts = parseAnnexOptions('version', {});

    expect(opts).toHaveLength(0);
  });

  test('correctly returns a string array', () => {
    const opts = parseAnnexOptions('version', ['foo', 'bar', 'baz', 'quux']);

    expect(opts).toEqual(['foo', 'bar', 'baz', 'quux']);
  });

  test('correctly parses a flag', () => {
    const opts = parseAnnexOptions('version', { '--raw': null });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--raw');
  });

  test('correctly identifies a non-null flag value', () => {
    expect(() => {
      parseAnnexOptions('version', { '--raw': true });
    }).toThrow('Value type boolean is not supported for option --raw, use null instead');
  });

  test('correctly parses a string', () => {
    const opts = parseAnnexOptions('version', { '--time-limit': '30m' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--time-limit=30m');
  });

  test('correctly identifies an unexpected string value', () => {
    expect(() => {
      parseAnnexOptions('version', { '--time-limit': 30 });
    }).toThrow('Value type number is not supported for option --time-limit, use string instead');
  });

  test('correctly parses a numeric number', () => {
    const opts = parseAnnexOptions('version', { '--numcopies': 2 });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--numcopies=2');
  });

  test('correctly parses a numeric string', () => {
    const opts = parseAnnexOptions('version', { '--numcopies': '3' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--numcopies=3');
  });

  test('correctly identifies an unexpected numeric value', () => {
    expect(() => {
      parseAnnexOptions('version', { '--numcopies': null });
    }).toThrow('Value type object is not supported for option --numcopies, use number | string instead');
  });

  test('correctly parses a commaDelimitedStrings scalar', () => {
    const opts = parseAnnexOptions('version', { '--debugfilter': 'Process' });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--debugfilter=Process');
  });

  test('correctly parses a commaDelimitedStrings array[1]', () => {
    const opts = parseAnnexOptions('version', { '--debugfilter': ['Process'] });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--debugfilter=Process');
  });

  test('correctly parses a commaDelimitedStrings array[2]', () => {
    const opts = parseAnnexOptions('version', { '--debugfilter': ['Process', 'External'] });

    expect(opts).toHaveLength(1);
    expect(opts).toContain('--debugfilter=Process,External');
  });

  test('correctly identifies an unexpected commaDelimitedStrings value', () => {
    expect(() => {
      parseAnnexOptions('version', { '--debugfilter': true });
    }).toThrow('Value type boolean is not supported for option --debugfilter, use string | string[] instead');
  });

  test('correctly parses a keyValue', () => {
    const key = 'annex.largefiles';
    const value = 'include=*.m4a or include=*.jpg or include=*.itl or include=*.db';
    const opts = parseAnnexOptions('config', { '--set': [key, value] });

    expect(opts).toEqual(['--set', key, value]);
  });

  test('correctly identifies an unexpected keyValue value', () => {
    expect(() => {
      parseAnnexOptions('config', { '--set': 'key=value' });
    }).toThrow('Value type string is not supported for option --set, use [string, string] instead');
  });

  test('correctly parses a repeatableKeyValue scalar', () => {
    const opts = parseAnnexOptions('version', { '--c': ['name', 'value'] });

    expect(opts).toEqual(['--c', 'name=value']);
  });

  test('correctly parses a repeatableKeyValue array[2]', () => {
    const opts = parseAnnexOptions('version', { '--c': [['name0', 'value0'], ['name1', 'value1']] });

    expect(opts).toEqual(['--c', 'name0=value0', '--c', 'name1=value1']);
  });

  test('correctly identifies an unexpected repeatableKeyValue value', () => {
    expect(() => {
      parseAnnexOptions('version', { '--c': {} });
    }).toThrow('Value type object is not supported for option --c, use [string, string] | [string, string][] instead');
  });

  test('correctly identifies a number argument', () => {
    expect(() => {
      parseAnnexOptions('version', 3);
    }).toThrow('The type number is not supported for anxOptions, use object | string[] instead');
  });

  test('correctly identifies an unsupported command', () => {
    expect(() => {
      parseAnnexOptions('foo', {});
    }).toThrow('The command foo is not recognized');
  });

});
