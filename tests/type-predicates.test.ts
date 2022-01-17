import { isAction, isActionResult, isBoolean, isByteProgress, isKeyValue, isKeyValueArray, isNumber, isRecord, isStatusAnx, isString, isStringArray } from '../src/helpers/type-predicates';

describe('isBoolean', () => {

  test('correctly identifies an Error', () => {
    expect(isBoolean(new Error('boo'))).toBe(false);
  });

  test('correctly identifies an empty array', () => {
    expect(isBoolean([])).toBe(false);
  });

  test('correctly identifies a heterogeneous array', () => {
    expect(isBoolean(['Fred', 'Barney', 2.2])).toBe(false);
  });

  test('correctly identifies a string array', () => {
    expect(isBoolean(['Fred', 'Barney'])).toBe(false);
  });

  test('correctly identifies a KeyValue array', () => {
    expect(isBoolean([['Fred', 'Barney'], ['Wilma', 'Betty']])).toBe(false);
  });

  test('correctly identifies a boolean', () => {
    expect(isBoolean(true)).toBe(true);
  });

  test('correctly identifies null', () => {
    expect(isBoolean(null)).toBe(false);
  });

  test('correctly identifies a number', () => {
    expect(isBoolean(5)).toBe(false);
  });

  test('correctly identifies an object', () => {
    expect(isBoolean({})).toBe(false);
  });

  test('correctly identifies a string', () => {
    expect(isBoolean('foo')).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isBoolean(undefined)).toBe(false);
  });

});

describe('isKeyValue', () => {

  test('correctly identifies an Error', () => {
    expect(isKeyValue(new Error('boo'))).toBe(false);
  });

  test('correctly identifies an empty array', () => {
    expect(isKeyValue([])).toBe(false);
  });

  test('correctly identifies a heterogeneous array', () => {
    expect(isKeyValue(['Fred', 'Barney', 2.2])).toBe(false);
  });

  test('correctly identifies a string array', () => {
    expect(isKeyValue(['Fred', 'Barney'])).toBe(true);
  });

  test('correctly identifies a KeyValue array', () => {
    expect(isKeyValue([['Fred', 'Barney'], ['Wilma', 'Betty']])).toBe(false);
  });

  test('correctly identifies a boolean', () => {
    expect(isKeyValue(true)).toBe(false);
  });

  test('correctly identifies null', () => {
    expect(isKeyValue(null)).toBe(false);
  });

  test('correctly identifies a number', () => {
    expect(isKeyValue(5)).toBe(false);
  });

  test('correctly identifies an object', () => {
    expect(isKeyValue({})).toBe(false);
  });

  test('correctly identifies a string', () => {
    expect(isKeyValue('foo')).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isKeyValue(undefined)).toBe(false);
  });

});

describe('isKeyValueArray', () => {

  test('correctly identifies an Error', () => {
    expect(isKeyValueArray(new Error('boo'))).toBe(false);
  });

  test('correctly identifies an empty array', () => {
    expect(isKeyValueArray([])).toBe(true);
  });

  test('correctly identifies a heterogeneous array', () => {
    expect(isKeyValueArray(['Fred', 'Barney', 2.2])).toBe(false);
  });

  test('correctly identifies a string array', () => {
    expect(isKeyValueArray(['Fred', 'Barney'])).toBe(false);
  });

  test('correctly identifies a KeyValue array', () => {
    expect(isKeyValueArray([['Fred', 'Barney'], ['Wilma', 'Betty']])).toBe(true);
  });

  test('correctly identifies a boolean', () => {
    expect(isKeyValueArray(true)).toBe(false);
  });

  test('correctly identifies null', () => {
    expect(isKeyValueArray(null)).toBe(false);
  });

  test('correctly identifies a number', () => {
    expect(isKeyValueArray(5)).toBe(false);
  });

  test('correctly identifies an object', () => {
    expect(isKeyValueArray({})).toBe(false);
  });

  test('correctly identifies a string', () => {
    expect(isKeyValueArray('foo')).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isKeyValueArray(undefined)).toBe(false);
  });

});

describe('isNumber', () => {

  test('correctly identifies an Error', () => {
    expect(isNumber(new Error('boo'))).toBe(false);
  });

  test('correctly identifies an empty array', () => {
    expect(isNumber([])).toBe(false);
  });

  test('correctly identifies a heterogeneous array', () => {
    expect(isNumber(['Fred', 'Barney', 2.2])).toBe(false);
  });

  test('correctly identifies a string array', () => {
    expect(isNumber(['Fred', 'Barney'])).toBe(false);
  });

  test('correctly identifies a KeyValue array', () => {
    expect(isNumber([['Fred', 'Barney'], ['Wilma', 'Betty']])).toBe(false);
  });

  test('correctly identifies a boolean', () => {
    expect(isNumber(true)).toBe(false);
  });

  test('correctly identifies null', () => {
    expect(isNumber(null)).toBe(false);
  });

  test('correctly identifies a number', () => {
    expect(isNumber(5)).toBe(true);
  });

  test('correctly identifies an object', () => {
    expect(isNumber({})).toBe(false);
  });

  test('correctly identifies a string', () => {
    expect(isNumber('foo')).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isNumber(undefined)).toBe(false);
  });

});

describe('isRecord', () => {

  test('correctly identifies an Error', () => {
    expect(isRecord(new Error('boo'))).toBe(false);
  });

  test('correctly identifies an empty array', () => {
    expect(isRecord([])).toBe(false);
  });

  test('correctly identifies a heterogeneous array', () => {
    expect(isRecord(['Fred', 'Barney', 2.2])).toBe(false);
  });

  test('correctly identifies a string array', () => {
    expect(isRecord(['Fred', 'Barney'])).toBe(false);
  });

  test('correctly identifies a KeyValue array', () => {
    expect(isRecord([['Fred', 'Barney'], ['Wilma', 'Betty']])).toBe(false);
  });

  test('correctly identifies a boolean', () => {
    expect(isRecord(true)).toBe(false);
  });

  test('correctly identifies null', () => {
    expect(isRecord(null)).toBe(false);
  });

  test('correctly identifies a number', () => {
    expect(isRecord(5)).toBe(false);
  });

  test('correctly identifies an object', () => {
    expect(isRecord({})).toBe(true);
  });

  test('correctly identifies a string', () => {
    expect(isRecord('foo')).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isRecord(undefined)).toBe(false);
  });

});

describe('isString', () => {

  test('correctly identifies an Error', () => {
    expect(isString(new Error('boo'))).toBe(false);
  });

  test('correctly identifies an empty array', () => {
    expect(isString([])).toBe(false);
  });

  test('correctly identifies a heterogeneous array', () => {
    expect(isString(['Fred', 'Barney', 2.2])).toBe(false);
  });

  test('correctly identifies a string array', () => {
    expect(isString(['Fred', 'Barney'])).toBe(false);
  });

  test('correctly identifies a KeyValue array', () => {
    expect(isString([['Fred', 'Barney'], ['Wilma', 'Betty']])).toBe(false);
  });

  test('correctly identifies a boolean', () => {
    expect(isString(true)).toBe(false);
  });

  test('correctly identifies null', () => {
    expect(isString(null)).toBe(false);
  });

  test('correctly identifies a number', () => {
    expect(isString(5)).toBe(false);
  });

  test('correctly identifies an object', () => {
    expect(isString({})).toBe(false);
  });

  test('correctly identifies a string', () => {
    expect(isString('foo')).toBe(true);
  });

  test('correctly identifies undefined', () => {
    expect(isString(undefined)).toBe(false);
  });

});

describe('isStringArray', () => {

  test('correctly identifies an Error', () => {
    expect(isStringArray(new Error('boo'))).toBe(false);
  });

  test('correctly identifies an empty array', () => {
    expect(isStringArray([])).toBe(true);
  });

  test('correctly identifies a heterogeneous array', () => {
    expect(isStringArray(['Fred', 'Barney', 2.2])).toBe(false);
  });

  test('correctly identifies a string array', () => {
    expect(isStringArray(['Fred', 'Barney'])).toBe(true);
  });

  test('correctly identifies a KeyValue array', () => {
    expect(isStringArray([['Fred', 'Barney'], ['Wilma', 'Betty']])).toBe(false);
  });

  test('correctly identifies a boolean', () => {
    expect(isStringArray(true)).toBe(false);
  });

  test('correctly identifies null', () => {
    expect(isStringArray(null)).toBe(false);
  });

  test('correctly identifies a number', () => {
    expect(isStringArray(5)).toBe(false);
  });

  test('correctly identifies an object', () => {
    expect(isStringArray({})).toBe(false);
  });

  test('correctly identifies a string', () => {
    expect(isStringArray('foo')).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isStringArray(undefined)).toBe(false);
  });

});

describe('isAction', () => {

  test('correctly identifies an Action', () => {
    const a = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'] };

    expect(isAction(a)).toBe(true);
  });

  test('correctly identifies null', () => {
    expect(isAction(null)).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isAction(undefined)).toBe(false);
  });

  test('correctly identifies an Action with bad command', () => {
    const a = { command: ['add'], file: 'file one.jpg', input: ['file one.jpg'] };

    expect(isAction(a)).toBe(false);
  });

  test('correctly identifies an Action with bad file', () => {
    const a = { command: 'add', file: ['file one.jpg'], input: ['file one.jpg'] };

    expect(isAction(a)).toBe(false);
  });

  test('correctly identifies an Action with bad input', () => {
    const a = { command: 'add', file: 'file one.jpg', input: 'file one.jpg' };

    expect(isAction(a)).toBe(false);
  });
});

describe('isActionResult', () => {

  test('correctly identifies an ActionResult with required properties', () => {
    const o = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'], success: true, 'error-messages': [] };

    expect(isActionResult(o)).toBe(true);
  });

  test('correctly identifies an ActionResult with optional key', () => {
    const o = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'], success: true, 'error-messages': [], key: 'SHA256E-s6405--88ae7e65f53feb9f06e334d7c1f5e8ec9ae30e66f7075fa97b22b14280dc338a.jpg' };

    expect(isActionResult(o)).toBe(true);
  });

  test('correctly identifies an ActionResult with bad key', () => {
    const o = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'], success: true, 'error-messages': [], key: ['SHA256E-s6405--88ae7e65f53feb9f06e334d7c1f5e8ec9ae30e66f7075fa97b22b14280dc338a.jpg'] };

    expect(isActionResult(o)).toBe(false);
  });

  test('correctly identifies an ActionResult with optional note', () => {
    const o = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'], success: true, 'error-messages': [], note: 'non-large file; adding content to git repository' };

    expect(isActionResult(o)).toBe(true);
  });

  test('correctly identifies an ActionResult with bad note', () => {
    const o = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'], success: true, 'error-messages': [], note: ['non-large file; adding content to git repository'] };

    expect(isActionResult(o)).toBe(false);
  });

  test('correctly identifies null', () => {
    expect(isActionResult(null)).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isActionResult(undefined)).toBe(false);
  });

  test('correctly identifies an ActionResult with bad Action', () => {
    const o = { command: ['add'], file: 'file one.jpg', input: ['file one.jpg'], success: true, 'error-messages': [] };

    expect(isActionResult(o)).toBe(false);
  });

  test('correctly identifies an Action with bad success', () => {
    const o = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'], success: 'true', 'error-messages': [] };

    expect(isActionResult(o)).toBe(false);
  });

  test('correctly identifies an Action with bad error-messages', () => {
    const o = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'], success: true, 'error-messages': '' };

    expect(isActionResult(o)).toBe(false);
  });
});

describe('isByteProgress', () => {

  test('correctly identifies a ByteProgress', () => {
    const a = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'] };
    const o = { action: a, 'byte-progress': 6405, 'total-size': 6405, 'percent-progress': '100%' };

    expect(isByteProgress(o)).toBe(true);
  });

  test('correctly identifies null', () => {
    expect(isByteProgress(null)).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isByteProgress(undefined)).toBe(false);
  });

  test('correctly identifies a ByteProgress with bad Action', () => {
    const a = { command: 'add', file: 'file one.jpg', input: 'file one.jpg' };
    const o = { action: a, 'byte-progress': 6405, 'total-size': 6405, 'percent-progress': '100%' };

    expect(isByteProgress(o)).toBe(false);
  });

  test('correctly identifies a ByteProgress with bad byte-progress', () => {
    const a = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'] };
    const o = { action: a, 'byte-progress': '6405', 'total-size': 6405, 'percent-progress': '100%' };

    expect(isByteProgress(o)).toBe(false);
  });

  test('correctly identifies a ByteProgress with bad total-size', () => {
    const a = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'] };
    const o = { action: a, 'byte-progress': 6405, 'total-size': '6405', 'percent-progress': '100%' };

    expect(isByteProgress(o)).toBe(false);
  });

  test('correctly identifies a ByteProgress with bad percent-progress', () => {
    const a = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'] };
    const o = { action: a, 'byte-progress': 6405, 'total-size': 6405, 'percent-progress': 100 };

    expect(isByteProgress(o)).toBe(false);
  });

});

describe('isStatusAnx', () => {

  test('correctly identifies a StatusAnx', () => {
    const o = { status: 'add', file: 'file one.jpg', 'error-messages': ['file one.jpg'] };

    expect(isStatusAnx(o)).toBe(true);
  });

  test('correctly identifies null', () => {
    expect(isStatusAnx(null)).toBe(false);
  });

  test('correctly identifies undefined', () => {
    expect(isStatusAnx(undefined)).toBe(false);
  });

  test('correctly identifies a StatusAnx with bad status', () => {
    const o = { status: ['add'], file: 'file one.jpg', 'error-messages': ['file one.jpg'] };

    expect(isStatusAnx(o)).toBe(false);
  });

  test('correctly identifies a StatusAnx with bad file', () => {
    const o = { status: 'add', file: ['file one.jpg'], 'error-messages': ['file one.jpg'] };

    expect(isStatusAnx(o)).toBe(false);
  });

  test('correctly identifies a StatusAnx with bad error-messages', () => {
    const o = { status: 'add', file: 'file one.jpg', 'error-messages': 'file one.jpg' };

    expect(isStatusAnx(o)).toBe(false);
  });
});
