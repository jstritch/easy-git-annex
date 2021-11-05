import { isNumber, isRecord, isString, isStringArray } from '../src/helpers/type-predicates';

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
