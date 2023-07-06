import { CommandGroup, getCommandOptions, OptionKind } from './command-options.js';
import { isDate, isKeyValue, isKeyValueArray, isNumber, isRecord, isString, isStringArray } from './type-predicates.js';
import { gitPath } from './git-path.js';

/**
 * Converts the commandOptions supplied by the application to a string array.
 * @param commandGroup With commandName, identifies the possible set of options.
 * @param commandName With commandGroup, identifies the possible set of options.
 * @param commandOptions The command options requested by the application.
 * @returns A string array containing the command options.
 * @internal
 */
export function parseCommandOptions(commandGroup: CommandGroup, commandName: string, commandOptions: unknown): string[] {
  if (commandOptions === undefined) {
    return [];
  } else if (isStringArray(commandOptions)) {
    return [...commandOptions];
  } else if (isRecord(commandOptions)) {
    const opts: string[] = [];
    const cmdOptions = getCommandOptions(commandGroup, commandName);
    for (const cmdOpt of cmdOptions) {
      if (cmdOpt.name in commandOptions) {
        const cmdOptValue = commandOptions[cmdOpt.name];
        let expectedType: string | null = null;

        switch (cmdOpt.kind) {

          case OptionKind.Flag:
            if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else {
              expectedType = 'null';
            }
            break;

          case OptionKind.RepeatableFlag:
            if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else if (Array.isArray(cmdOptValue) && cmdOptValue.every((e) => { return e === null; })) {
              cmdOptValue.forEach(() => { opts.push(cmdOpt.name); }); // eslint-disable-line unicorn/no-array-for-each
            } else {
              expectedType = 'null | [null, null?]';
            }
            break;

          case OptionKind.Stuck:
            if (isNumber(cmdOptValue) || isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}${cmdOptValue}`);
            } else {
              expectedType = 'number | string';
            }
            break;

          case OptionKind.OptionalStuck:
            if (isNumber(cmdOptValue) || isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}${cmdOptValue}`);
            } else if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else {
              expectedType = 'number | string | null';
            }
            break;

          case OptionKind.KeyValue:
            if (isKeyValue(cmdOptValue)) {
              opts.push(cmdOpt.name, cmdOptValue[0], cmdOptValue[1]);
            } else {
              expectedType = '[string, string]';
            }
            break;

          case OptionKind.CommaDelimitedKeyValue:
            if (isKeyValue(cmdOptValue)) {
              opts.push(cmdOpt.name, `${cmdOptValue[0]}=${cmdOptValue[1]}`);
            } else if (isKeyValueArray(cmdOptValue)) {
              if (cmdOptValue.length > 0) {
                opts.push(cmdOpt.name, cmdOptValue.map((e) => { return `${e[0]}=${e[1]}`; }).join(','));
              }
            } else {
              expectedType = '[string, string] | [string, string][]';
            }
            break;

          case OptionKind.RepeatableKeyValue:
            if (isKeyValue(cmdOptValue)) {
              opts.push(cmdOpt.name, `${cmdOptValue[0]}=${cmdOptValue[1]}`);
            } else if (isKeyValueArray(cmdOptValue) && cmdOptValue.length > 0) {
              for (const element of cmdOptValue) { opts.push(cmdOpt.name, `${element[0]}=${element[1]}`); }
            } else if (!(Array.isArray(cmdOptValue) && cmdOptValue.length === 0)) {
              expectedType = '[string, string] | [string, string][]';
            }
            break;

          case OptionKind.AnonymousKeyValue:
            if (isKeyValue(cmdOptValue)) {
              opts.push(cmdOptValue[0], cmdOptValue[1]);
            } else {
              expectedType = '[string, string]';
            }
            break;

          case OptionKind.Numeric:
            if (isNumber(cmdOptValue) || isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else {
              expectedType = 'number | string';
            }
            break;

          case OptionKind.OptionalNumeric:
            if (isNumber(cmdOptValue) || isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else {
              expectedType = 'number | string | null';
            }
            break;

          case OptionKind.NumericParam:
            if (isNumber(cmdOptValue) || isString(cmdOptValue)) {
              opts.push(cmdOpt.name, cmdOptValue.toString());
            } else {
              expectedType = 'number | string';
            }
            break;

          case OptionKind.Date:
            if (isDate(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue.toISOString().slice(0, 19)}Z`);
            } else if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else {
              expectedType = 'Date | string';
            }
            break;

          case OptionKind.String:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else {
              expectedType = 'string';
            }
            break;

          case OptionKind.OptionalString:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else {
              expectedType = 'string | null';
            }
            break;

          case OptionKind.StringParam:
            if (isString(cmdOptValue)) {
              opts.push(cmdOpt.name, cmdOptValue);
            } else {
              expectedType = 'string';
            }
            break;

          case OptionKind.OptionalStringParam:
            if (isString(cmdOptValue)) {
              opts.push(cmdOpt.name, cmdOptValue);
            } else if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else {
              expectedType = 'string | null';
            }
            break;

          case OptionKind.CommaDelimitedStrings:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else if (isStringArray(cmdOptValue)) {
              if (cmdOptValue.length > 0) {
                opts.push(`${cmdOpt.name}=${cmdOptValue.join(',')}`);
              }
            } else {
              expectedType = 'string | string[]';
            }
            break;

          case OptionKind.OptionalCommaDelimitedStrings:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else if (isStringArray(cmdOptValue)) {
              if (cmdOptValue.length > 0) {
                opts.push(`${cmdOpt.name}=${cmdOptValue.join(',')}`);
              }
            } else if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else {
              expectedType = 'string | string[] | null';
            }
            break;

          case OptionKind.RepeatableString:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else if (isStringArray(cmdOptValue)) {
              if (cmdOptValue.length > 0) {
                for (const element of cmdOptValue) { opts.push(`${cmdOpt.name}=${element}`); }
              }
            } else {
              expectedType = 'string | string[]';
            }
            break;

          case OptionKind.RepeatableOptionalString:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else if (isStringArray(cmdOptValue)) {
              for (const element of cmdOptValue) { opts.push(`${cmdOpt.name}=${element}`); }
            } else if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else {
              expectedType = 'string | string[] | null';
            }
            break;

          case OptionKind.RepeatableOptionalStringParam:
            if (isString(cmdOptValue)) {
              opts.push(cmdOpt.name, cmdOptValue);
            } else if (isStringArray(cmdOptValue)) {
              for (const element of cmdOptValue) { opts.push(cmdOpt.name, element); }
            } else if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else {
              expectedType = 'string | string[] | null';
            }
            break;

          case OptionKind.AnonymousStrings:
            if (isString(cmdOptValue)) {
              opts.push(cmdOptValue);
            } else if (isStringArray(cmdOptValue)) {
              opts.push(...cmdOptValue);
            } else {
              expectedType = 'string | string[]';
            }
            break;

          case OptionKind.NamedStrings:
            if (isString(cmdOptValue)) {
              opts.push(cmdOpt.name, cmdOptValue);
            } else if (isStringArray(cmdOptValue)) {
              if (cmdOptValue.length > 0) {
                opts.push(cmdOpt.name, ...cmdOptValue);
              }
            } else {
              expectedType = 'string | string[]';
            }
            break;

          case OptionKind.PathParam:
            if (isString(cmdOptValue)) {
              opts.push(cmdOpt.name, gitPath(cmdOptValue));
            } else {
              expectedType = 'string';
            }
            break;

          case OptionKind.RepeatablePath:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${gitPath(cmdOptValue)}`);
            } else if (isStringArray(cmdOptValue)) {
              for (const element of cmdOptValue) { opts.push(`${cmdOpt.name}=${gitPath(element)}`); }
            } else {
              expectedType = 'string | string[]';
            }
            break;
        }

        if (isString(expectedType)) {
          throw new Error(`Value type ${typeof cmdOptValue} is not supported for ${commandName} option ${cmdOpt.name}, use ${expectedType} instead`);
        }
      }
    }
    return opts;
  }

  throw new Error(`The type ${typeof commandOptions} is not supported for commandOptions, use object | string[] instead`);
}
