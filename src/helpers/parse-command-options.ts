import { CommandGroup, getCommandOptions, OptionKind } from './command-options';
import { isKeyValue, isKeyValueArray, isNumber, isRecord, isString, isStringArray } from './type-predicates';
import { gitPath } from './git-path';
/**
 * Converts the commandOptions supplied by the application to a string array.
 * @param commandGroup With commandName, identifies the possible set of options.
 * @param commandName With commandGroup, identifies the possible set of options.
 * @param commandOptions The command options requested by the application.
 * @returns A string array containing the command options.
 */
export function parseCommandOptions(commandGroup: CommandGroup, commandName: string, commandOptions: unknown): string[] {
  if (commandOptions === undefined) {
    return [];
  } else if (isStringArray(commandOptions)) {
    return [...commandOptions];
  } else if (isRecord(commandOptions)) {
    const opts: string[] = [];
    const cmdOptions = getCommandOptions(commandGroup, commandName);
    cmdOptions.forEach((cmdOpt) => {
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

          case OptionKind.KeyValue:
            if (isKeyValue(cmdOptValue)) {
              opts.push(cmdOpt.name, cmdOptValue[0], cmdOptValue[1]);
            } else {
              expectedType = '[string, string]';
            }
            break;

          case OptionKind.RepeatableKeyValue:
            if (isKeyValue(cmdOptValue)) {
              opts.push(cmdOpt.name, `${cmdOptValue[0]}=${cmdOptValue[1]}`);
            } else if (isKeyValueArray(cmdOptValue) && cmdOptValue.length > 0) {
              cmdOptValue.forEach((element) => { opts.push(cmdOpt.name, `${element[0]}=${element[1]}`); });
            } else {
              expectedType = '[string, string] | [string, string][]';
            }
            break;

          case OptionKind.QuasiKeyValue:
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

          case OptionKind.String:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else {
              expectedType = 'string';
            }
            break;

          case OptionKind.StringParam:
            if (isString(cmdOptValue)) {
              opts.push(cmdOpt.name, cmdOptValue);
            } else {
              expectedType = 'string';
            }
            break;

          case OptionKind.CommaDelimitedStrings:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else if (isStringArray(cmdOptValue) && cmdOptValue.length > 0) {
              opts.push(`${cmdOpt.name}=${cmdOptValue.join(',')}`);
            } else {
              expectedType = 'string | string[]';
            }
            break;

          case OptionKind.RepeatablePath:
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${gitPath(cmdOptValue)}`);
            } else if (isStringArray(cmdOptValue) && cmdOptValue.length > 0) {
              cmdOptValue.forEach((element) => { opts.push(`${cmdOpt.name}=${gitPath(element)}`); });
            } else {
              expectedType = 'string | string[]';
            }
            break;
        }

        if (isString(expectedType)) {
          throw new Error(`Value type ${typeof cmdOptValue} is not supported for option ${cmdOpt.name}, use ${expectedType} instead`);
        }
      }
    });
    return opts;
  }

  throw new Error(`The type ${typeof commandOptions} is not supported for commandOptions, use object | string[] instead`);
}
