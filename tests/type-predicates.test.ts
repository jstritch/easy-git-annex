import { isAction, isActionProgress, isActionResult, isBigInt, isBoolean, isDate, isKeyValue, isKeyValueArray, isNumber, isRecord, isStatusAnx, isString, isStringArray } from '../src/helpers/type-predicates';

describe('isBigInt', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{}, false],
    [true, false],
    [7, false],
    [BigInt(0), true],
    [new Date(0), false],
    ['A', false],
    [[], false],
    [['A'], false],
    [['A', 'B'], false],
    [['A', 'B', 'C'], false],
    [[['A', 'B'], ['C', 'D']], false],
    [['A', 'B', 3.3], false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isBigInt(o)).toBe(expected);
  });

});

describe('isBoolean', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{}, false],
    [true, true],
    [7, false],
    [BigInt(0), false],
    [new Date(0), false],
    ['A', false],
    [[], false],
    [['A'], false],
    [['A', 'B'], false],
    [['A', 'B', 'C'], false],
    [[['A', 'B'], ['C', 'D']], false],
    [['A', 'B', 3.3], false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isBoolean(o)).toBe(expected);
  });

});

describe('isDate', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{}, false],
    [true, false],
    [7, false],
    [BigInt(0), false],
    [new Date(0), true],
    ['A', false],
    [[], false],
    [['A'], false],
    [['A', 'B'], false],
    [['A', 'B', 'C'], false],
    [[['A', 'B'], ['C', 'D']], false],
    [['A', 'B', 3.3], false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isDate(o)).toBe(expected);
  });

});

describe('isKeyValue', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{}, false],
    [true, false],
    [7, false],
    [BigInt(0), false],
    [new Date(0), false],
    ['A', false],
    [[], false],
    [['A'], false],
    [['A', 'B'], true],
    [['A', 'B', 'C'], false],
    [[['A', 'B'], ['C', 'D']], false],
    [['A', 'B', 3.3], false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isKeyValue(o)).toBe(expected);
  });

});

describe('isKeyValueArray', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{}, false],
    [true, false],
    [7, false],
    [BigInt(0), false],
    [new Date(0), false],
    ['A', false],
    [[], true],
    [['A'], false],
    [['A', 'B'], false],
    [['A', 'B', 'C'], false],
    [[['A', 'B'], ['C', 'D']], true],
    [['A', 'B', 3.3], false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isKeyValueArray(o)).toBe(expected);
  });

});

describe('isNumber', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{}, false],
    [true, false],
    [7, true],
    [BigInt(0), false],
    [new Date(0), false],
    ['A', false],
    [[], false],
    [['A'], false],
    [['A', 'B'], false],
    [['A', 'B', 'C'], false],
    [[['A', 'B'], ['C', 'D']], false],
    [['A', 'B', 3.3], false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isNumber(o)).toBe(expected);
  });

});

describe('isRecord', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{}, true],
    [true, false],
    [7, false],
    [BigInt(0), false],
    [new Date(0), false],
    ['A', false],
    [[], false],
    [['A'], false],
    [['A', 'B'], false],
    [['A', 'B', 'C'], false],
    [[['A', 'B'], ['C', 'D']], false],
    [['A', 'B', 3.3], false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isRecord(o)).toBe(expected);
  });

});

describe('isString', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{}, false],
    [true, false],
    [7, false],
    [BigInt(0), false],
    [new Date(0), false],
    ['A', true],
    [[], false],
    [['A'], false],
    [['A', 'B'], false],
    [['A', 'B', 'C'], false],
    [[['A', 'B'], ['C', 'D']], false],
    [['A', 'B', 3.3], false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isString(o)).toBe(expected);
  });

});

describe('isStringArray', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{}, false],
    [true, false],
    [7, false],
    [BigInt(0), false],
    [new Date(0), false],
    ['A', false],
    [[], true],
    [['A'], true],
    [['A', 'B'], true],
    [['A', 'B', 'C'], true],
    [[['A', 'B'], ['C', 'D']], false],
    [['A', 'B', 3.3], false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isStringArray(o)).toBe(expected);
  });

});

describe('isAction', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{ command: 'add', file: 'file one.jpg', input: ['file one.jpg'] }, true],
    [{ command: ['add'], file: 'file one.jpg', input: ['file one.jpg'] }, false],
    [{ command: 'add', file: ['file one.jpg'], input: ['file one.jpg'] }, false],
    [{ command: 'add', file: 'file one.jpg', input: 'file one.jpg' }, false],
    [{ file: 'file one.jpg', input: ['file one.jpg'] }, false],
    [{ command: 'add', input: ['file one.jpg'] }, false],
    [{ command: 'add', file: 'file one.jpg' }, false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isAction(o)).toBe(expected);
  });

});

describe('isActionProgress', () => {
  const passAction = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'] };
  const failAction = { command: 'add', file: 'file one.jpg', input: 'file one.jpg' };

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{ action: passAction, 'byte-progress': 6405, 'total-size': 6405, 'percent-progress': '100%' }, true],
    [{ action: failAction, 'byte-progress': 6405, 'total-size': 6405, 'percent-progress': '100%' }, false],
    [{ action: passAction, 'byte-progress': '6405', 'total-size': 6405, 'percent-progress': '100%' }, false],
    [{ action: passAction, 'byte-progress': 6405, 'total-size': '6405', 'percent-progress': '100%' }, false],
    [{ action: passAction, 'byte-progress': 6405, 'total-size': 6405, 'percent-progress': 100 }, false],
    [{ 'byte-progress': 6405, 'total-size': 6405, 'percent-progress': '100%' }, false],
    [{ action: passAction, 'total-size': 6405, 'percent-progress': '100%' }, false],
    [{ action: passAction, 'byte-progress': 6405, 'percent-progress': '100%' }, false],
    [{ action: passAction, 'byte-progress': 6405, 'total-size': 6405 }, false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isActionProgress(o)).toBe(expected);
  });

});

describe('isActionResult', () => {
  const passAction = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'] };
  const failAction = { command: 'add', file: 'file one.jpg', input: 'file one.jpg' };

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [Object.assign({ success: true, 'error-messages': [] }, passAction), true],
    [Object.assign({ success: true, 'error-messages': [], key: 'SHA256E-s6405--88ae7e65f53feb9f06e334d7c1f5e8ec9ae30e66f7075fa97b22b14280dc338a.jpg' }, passAction), true],
    [Object.assign({ success: true, 'error-messages': [], note: 'non-large file; adding content to git repository' }, passAction), true],
    [Object.assign({ success: 'true', 'error-messages': [] }, passAction), false],
    [Object.assign({ success: true, 'error-messages': '' }, passAction), false],
    [Object.assign({ success: true, 'error-messages': [] }, failAction), false],
    [Object.assign({ success: true, 'error-messages': [], key: [['SHA256E-s6405--88ae7e65f53feb9f06e334d7c1f5e8ec9ae30e66f7075fa97b22b14280dc338a.jpg']] }, passAction), false],
    [Object.assign({ success: true, 'error-messages': [], note: [['non-large file; adding content to git repository']] }, passAction), false],
    [Object.assign({ 'error-messages': '' }, passAction), false],
    [Object.assign({ success: true }, passAction), false],
    [Object.assign({ success: true, 'error-messages': [] }, {}), false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isActionResult(o)).toBe(expected);
  });

});

describe('isStatusAnx', () => {

  const tests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{ status: 'add', file: 'file one.jpg', 'error-messages': ['file one.jpg'] }, true],
    [{ status: ['add'], file: 'file one.jpg', 'error-messages': ['file one.jpg'] }, false],
    [{ status: 'add', file: ['file one.jpg'], 'error-messages': ['file one.jpg'] }, false],
    [{ status: 'add', file: 'file one.jpg', 'error-messages': 'file one.jpg' }, false],
    [{ file: 'file one.jpg', 'error-messages': ['file one.jpg'] }, false],
    [{ status: 'add', 'error-messages': ['file one.jpg'] }, false],
    [{ status: 'add', file: 'file one.jpg' }, false],
  ];

  test.each(tests)('examine %o', (o, expected) => {
    expect(isStatusAnx(o)).toBe(expected);
  });

});
