import { parseBigInt, parseNumber, parseUnixDate } from '../src/helpers/parsers';

describe('parseBigInt', () => {

  const tests: [string, unknown][] = [
    ['0', BigInt(0)],
    ['42', BigInt(42)],
    ['-42', BigInt(-42)],
    ['+42', BigInt(42)],
    ['  42', BigInt(42)],
    [' +42', BigInt(42)],
    [' -42', BigInt(-42)],
    ['-4 2', undefined],
    ['-42 ', BigInt(-42)],
    ['5 42', undefined],
    ['42 5', undefined],
    ['', BigInt(0)],
    ['abcd', undefined],
    ['0xabcd', undefined],
    ['0o377', undefined],
    ['0b1010', undefined],
  ];

  test.each(tests)('parse "%s"', (s, want) => {
    expect(parseBigInt(s)).toEqual(want);
  });

});

describe('parseNumber', () => {

  const tests: [string, unknown][] = [
    ['0', 0],
    ['42', 42],
    ['-42', -42],
    ['+42', 42],
    ['  42', 42],
    [' +42', 42],
    [' -42', -42],
    ['-4 2', undefined],
    ['-42 ', -42],
    ['42.', 42],
    ['42.0', 42],
    ['4.2e1', 42],
    ['4.2e-1', 0.42],
    ['-4.2e-1', -0.42],
    ['-4.2e1', -42],
    ['2e1', 20],
    ['2e-1', 0.2],
    ['.42', .42],
    ['0.42', .42],
    ['4.2e', undefined],
    ['e2', undefined],
    ['+e2', undefined],
    ['NaN', Number.NaN],
    ['Infinity', Number.POSITIVE_INFINITY],
    ['-Infinity', Number.NEGATIVE_INFINITY],
    ['+Infinity', Number.POSITIVE_INFINITY],
    [' NaN', Number.NaN],
    [' Infinity', Number.POSITIVE_INFINITY],
    [' -Infinity', Number.NEGATIVE_INFINITY],
    [' +Infinity', Number.POSITIVE_INFINITY],
    ['NaN ', Number.NaN],
    ['Infinity ', Number.POSITIVE_INFINITY],
    ['-Infinity ', Number.NEGATIVE_INFINITY],
    ['+Infinity ', Number.POSITIVE_INFINITY],
    ['5 42', undefined],
    ['42 5', undefined],
    ['', 0],
    [' ', 0],
    ['.', undefined],
    ['e', undefined],
    ['+', undefined],
    ['-', undefined],
    ['abcd', undefined],
    ['0xabcd', 43981],
    ['0o377', 255],
    ['0b1010', 10],
  ];

  test.each(tests)('parse "%s"', (s, want) => {
    expect(parseNumber(s)).toEqual(want);
  });

});

describe('parseUnixDate', () => {

  const tests: [string, unknown][] = [
    ['1643998240', new Date('2022-02-04T18:10:40Z')],
    ['1644327988', new Date('2022-02-08T13:46:28Z')],
    [' 1644327988', new Date('2022-02-08T13:46:28Z')],
    ['1644327988 ', new Date('2022-02-08T13:46:28Z')],
    ['+1644327988', undefined],
    ['-1644327988', undefined],
    ['', undefined],
    [' ', undefined],
    ['5 1644327988', undefined],
    ['1644327988 5', undefined],
    ['abcd', undefined],
    ['0xabcd', undefined],
    ['0o377', undefined],
    ['0b1010', undefined],
  ];

  test.each(tests)('parse "%s"', (s, want) => {
    expect(parseUnixDate(s)).toEqual(want);
  });

});
