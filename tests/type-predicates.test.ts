import { isAction, isActionProgress, isActionResult, isBigInt, isBoolean, isDate, isKeyValue, isKeyValueArray, isNumber, isRecord, isRepositoryInfo, isStatusAnx, isStatusGit, isString, isStringArray } from '../src/helpers/type-predicates';

describe('type predicates', () => {

  const isBigIntTests: [unknown, boolean][] = [
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

  test.each(isBigIntTests)('isBigInt(%o)', (o, expected) => {
    expect(isBigInt(o)).toBe(expected);
  });

  const isBooleanTests: [unknown, boolean][] = [
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

  test.each(isBooleanTests)('isBoolean(%o)', (o, expected) => {
    expect(isBoolean(o)).toBe(expected);
  });

  const isDateTests: [unknown, boolean][] = [
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

  test.each(isDateTests)('isDate(%o)', (o, expected) => {
    expect(isDate(o)).toBe(expected);
  });

  const isKeyValueTests: [unknown, boolean][] = [
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

  test.each(isKeyValueTests)('isKeyValue(%o)', (o, expected) => {
    expect(isKeyValue(o)).toBe(expected);
  });

  const isKeyValueArrayTests: [unknown, boolean][] = [
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

  test.each(isKeyValueArrayTests)('isKeyValueArray(%o)', (o, expected) => {
    expect(isKeyValueArray(o)).toBe(expected);
  });

  const isNumberTests: [unknown, boolean][] = [
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

  test.each(isNumberTests)('isNumber(%o)', (o, expected) => {
    expect(isNumber(o)).toBe(expected);
  });

  const isRecordTests: [unknown, boolean][] = [
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

  test.each(isRecordTests)('isRecord(%o)', (o, expected) => {
    expect(isRecord(o)).toBe(expected);
  });

  const isStringTests: [unknown, boolean][] = [
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

  test.each(isStringTests)('isString(%o)', (o, expected) => {
    expect(isString(o)).toBe(expected);
  });

  const isStringArrayTests: [unknown, boolean][] = [
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

  test.each(isStringArrayTests)('isStringArray(%o)', (o, expected) => {
    expect(isStringArray(o)).toBe(expected);
  });

  const passAction = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'] };
  const failAction = { command: 'add', file: 'file one.jpg', input: 'file one.jpg' };

  const isActionTests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [passAction, true],
    [{ command: ['add'], file: 'file one.jpg', input: ['file one.jpg'] }, false],
    [{ command: 'add', file: ['file one.jpg'], input: ['file one.jpg'] }, false],
    [failAction, false],
    [{ file: 'file one.jpg', input: ['file one.jpg'] }, false],
    [{ command: 'add', input: ['file one.jpg'] }, false],
    [{ command: 'add', file: 'file one.jpg' }, false],
  ];

  test.each(isActionTests)('isAction(%o)', (o, expected) => {
    expect(isAction(o)).toBe(expected);
  });

  const isActionProgressTests: [unknown, boolean][] = [
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

  test.each(isActionProgressTests)('isActionProgress(%o)', (o, expected) => {
    expect(isActionProgress(o)).toBe(expected);
  });

  const isActionResultTests: [unknown, boolean][] = [
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

  test.each(isActionResultTests)('isActionResult(%o)', (o, expected) => {
    expect(isActionResult(o)).toBe(expected);
  });

  const isRepositoryInfoTests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{ uuid: 'A', description: 'B', here: true }, true],
    [{ uuid: 'A', description: 'B', here: false }, true],
    [{ uuid: ['A'], description: 'B', here: true }, false],
    [{ uuid: 'A', description: ['B'], here: true }, false],
    [{ uuid: 'A', description: 'B', here: 1 }, false],
    [{ uuid: 'A', description: 'B', here: true, trustLevel: 'trusted' }, true],
    [{ uuid: 'A', description: 'B', here: true, trustLevel: 'semitrusted' }, true],
    [{ uuid: 'A', description: 'B', here: true, trustLevel: 'untrusted' }, true],
    [{ uuid: 'A', description: 'B', here: true, trustLevel: 'Untrusted' }, false],
    [{ uuid: 'A', description: 'B', here: true, trustLevel: 1 }, false],
    [{ description: 'B', here: true }, false],
    [{ uuid: 'A', here: true }, false],
    [{ uuid: 'A', description: 'B' }, false],
  ];

  test.each(isRepositoryInfoTests)('isRepositoryInfo(%o)', (o, expected) => {
    expect(isRepositoryInfo(o)).toBe(expected);
  });

  const isStatusAnxTests: [unknown, boolean][] = [
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

  test.each(isStatusAnxTests)('isStatusAnx(%o)', (o, expected) => {
    expect(isStatusAnx(o)).toBe(expected);
  });

  const isStatusGitTests: [unknown, boolean][] = [
    [undefined, false],
    [null, false],
    [{ x: 'X', y: 'Y', path: 'file one.jpg' }, true],
    [{ x: ['X'], y: 'Y', path: 'file one.jpg' }, false],
    [{ x: 'X', y: ['Y'], path: 'file one.jpg' }, false],
    [{ x: 'X', y: 'Y', path: ['file one.jpg'] }, false],
    [{ x: 'X', y: 'Y', path: 'file one.jpg', origPath: 'file two.jpg' }, true],
    [{ x: 'X', y: 'Y', path: 'file one.jpg', origPath: ['file two.jpg'] }, false],
    [{ y: 'Y', path: 'file one.jpg' }, false],
    [{ x: 'X', path: 'file one.jpg' }, false],
    [{ x: 'X', y: 'Y' }, false],
  ];

  test.each(isStatusGitTests)('isStatusGit(%o)', (o, expected) => {
    expect(isStatusGit(o)).toBe(expected);
  });

});
