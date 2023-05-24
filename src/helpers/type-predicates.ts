import { RepositoryInfo, TrustLevel } from '../interfaces/repository-info.js';
import { Action } from '../interfaces/action.js';
import { ActionProgress } from '../interfaces/action-progress.js';
import { ActionResult } from '../interfaces/action-result.js';
import { StatusAnx } from '../interfaces/status-anx.js';
import { StatusGit } from '../interfaces/status-git.js';

/**
 * Determines if an object is a bigint.
 * @param o The object to examine.
 * @returns True if o is a bigint; otherwise, false.
 * @category Type Predicate
 */
export function isBigInt(o: unknown): o is bigint {
  return typeof o === 'bigint';
}

/**
 * Determines if an object is a boolean.
 * @param o The object to examine.
 * @returns True if o is a boolean; otherwise, false.
 * @category Type Predicate
 */
export function isBoolean(o: unknown): o is boolean {
  return typeof o === 'boolean';
}

/**
 * Determines if an object is a Date.
 * @param o The object to examine.
 * @returns True if o is a Date; otherwise, false.
 * @category Type Predicate
 */
export function isDate(o: unknown): o is Date {
  return o instanceof Date;
}

/**
 * Determines if an object is a number.
 * @param o The object to examine.
 * @returns True if o is a number; otherwise, false.
 * @category Type Predicate
 */
export function isNumber(o: unknown): o is number {
  return typeof o === 'number';
}

/**
 * Determines if an object is a Record<string, unknown>.
 * @param o The object to examine.
 * @returns True if o is a Record<string, unknown>; otherwise, false.
 * @category Type Predicate
 */
export function isRecord(o: unknown): o is Record<string, unknown> {
  return Object.prototype.toString.call(o) === '[object Object]';
}

/**
 * Determines if an object is a string.
 * @param o The object to examine.
 * @returns True if o is a string; otherwise, false.
 * @category Type Predicate
 */
export function isString(o: unknown): o is string {
  return typeof o === 'string';
}

/**
 * Determines if an object is an array of string.
 * @param o The object to examine.
 * @returns True if o is an array of string; otherwise, false.
 * @category Type Predicate
 */
export function isStringArray(o: unknown): o is string[] {
  return Array.isArray(o) && o.every((element) => { return typeof element === 'string'; });
}

/**
 * Determines if an object is a tuple of [string, string].
 * @param o The object to examine.
 * @returns True if o is a tuple of [string, string]; otherwise, false.
 * @category Type Predicate
 */
export function isKeyValue(o: unknown): o is [string, string] {
  return isStringArray(o) && o.length === 2;
}

/**
 * Determines if an object is an array of tuple of [string, string].
 * @param o The object to examine.
 * @returns True if o is an array of tuple of [string, string]; otherwise, false.
 * @category Type Predicate
 */
export function isKeyValueArray(o: unknown): o is [string, string][] {
  return Array.isArray(o) && o.every((element) => { return isKeyValue(element); });
}

/**
 * Determines if an object is an {@link Action}.
 * @param o The object to examine.
 * @returns True if o is an Action; otherwise, false.
 * @category Type Predicate
 */
export function isAction(o: unknown): o is Action {
  if (!isRecord(o)) { return false; }
  if (!isString(o['command'])) { return false; }
  if (!isString(o['file'])) { return false; }
  if (!isStringArray(o['input'])) { return false; }
  return true;
}

/**
 * Determines if an object is an {@link ActionProgress}.
 * @param o The object to examine.
 * @returns True if o is an ActionProgress; otherwise, false.
 * @category Type Predicate
 */
export function isActionProgress(o: unknown): o is ActionProgress {
  if (!isRecord(o)) { return false; }
  if (!isAction(o['action'])) { return false; }
  if (!isNumber(o['byte-progress'])) { return false; }
  if (!isNumber(o['total-size'])) { return false; }
  if (!isString(o['percent-progress'])) { return false; }
  return true;
}

/**
 * Determines if an object is an {@link ActionResult}.
 * @param o The object to examine.
 * @returns True if o is an ActionResult; otherwise, false.
 * @category Type Predicate
 */
export function isActionResult(o: unknown): o is ActionResult {
  if (!isRecord(o)) { return false; }
  if (!isAction(o)) { return false; }
  if (!isBoolean(o['success'])) { return false; }
  if (!isStringArray(o['error-messages'])) { return false; }
  if ('key' in o && !isString(o['key'])) { return false; }
  if ('note' in o && !isString(o['note'])) { return false; }
  return true;
}

/**
 * Determines if an object is a {@link RepositoryInfo}.
 * @param o The object to examine.
 * @returns True if o is a RepositoryInfo; otherwise, false.
 * @category Type Predicate
 */
export function isRepositoryInfo(o: unknown): o is RepositoryInfo {
  if (!isRecord(o)) { return false; }
  if (!isString(o['uuid'])) { return false; }
  if (!isString(o['description'])) { return false; }
  if (!isBoolean(o['here'])) { return false; }
  if ('trustLevel' in o && !Object.values(TrustLevel).includes(o['trustLevel'] as TrustLevel)) { return false; }
  return true;
}

/**
 * Determines if an object is a {@link StatusAnx}.
 * @param o The object to examine.
 * @deprecated The git-annex status command was deprecated in version 10.20230321, use {@link isStatusGit} instead.
 * @returns True if o is a StatusAnx; otherwise, false.
 * @category Type Predicate
 */
export function isStatusAnx(o: unknown): o is StatusAnx {
  if (!isRecord(o)) { return false; }
  if (!isString(o['file'])) { return false; }
  if (!isString(o['status'])) { return false; }
  if (!isStringArray(o['error-messages'])) { return false; }
  return true;
}

/**
 * Determines if an object is a {@link StatusGit}.
 * @param o The object to examine.
 * @returns True if o is a StatusGit; otherwise, false.
 * @category Type Predicate
 */
export function isStatusGit(o: unknown): o is StatusGit {
  if (!isRecord(o)) { return false; }
  if (!isString(o['x'])) { return false; }
  if (!isString(o['y'])) { return false; }
  if (!isString(o['path'])) { return false; }
  if ('origPath' in o && !isString(o['origPath'])) { return false; }
  return true;
}
