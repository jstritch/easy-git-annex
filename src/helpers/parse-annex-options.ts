import { isKeyValue, isKeyValueArray, isNumber, isRecord, isString, isStringArray } from './type-predicates';
import { getCommandOptions } from './command-options';

/**
 * Converts the anxOptions supplied by tha application to a string array.
 * @param commandName Identifies the possible set of options to be evaluated.
 * @param anxOptions The options to be converted.
 * @returns The string array containing the converted options.
 */
export function parseAnnexOptions(commandName: string, anxOptions: unknown): string[] {
  if (anxOptions === undefined) {
    return [];
  } else if (isStringArray(anxOptions)) {
    return anxOptions;
  } else if (isRecord(anxOptions)) {
    const opts: string[] = [];
    const cmdOptions = getCommandOptions(commandName);
    cmdOptions.forEach((cmdOpt) => {
      if (cmdOpt.name in anxOptions) {
        const cmdOptValue = anxOptions[cmdOpt.name];
        let expectedType: string | null = null;

        switch (cmdOpt.kind) {
          case 'flag':
            if (cmdOptValue === null) {
              opts.push(cmdOpt.name);
            } else {
              expectedType = 'null';
            }
            break;

          case 'keyValue':
            if (isKeyValue(cmdOptValue)) {
              opts.push(cmdOpt.name, cmdOptValue[0], cmdOptValue[1]);
            } else {
              expectedType = '[string, string]';
            }
            break;

          case 'numeric':
            if (isNumber(cmdOptValue) || isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else {
              expectedType = 'number | string';
            }
            break;

          case 'string':
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else {
              expectedType = 'string';
            }
            break;

          case 'commaDelimitedStrings':
            if (isString(cmdOptValue)) {
              opts.push(`${cmdOpt.name}=${cmdOptValue}`);
            } else if (isStringArray(cmdOptValue) && cmdOptValue.length > 0) {
              opts.push(`${cmdOpt.name}=${cmdOptValue.join(',')}`);
            } else {
              expectedType = 'string | string[]';
            }
            break;

          case 'repeatableKeyValue':
            if (isKeyValue(cmdOptValue)) {
              opts.push(cmdOpt.name, `${cmdOptValue[0]}=${cmdOptValue[1]}`);
            } else if (isKeyValueArray(cmdOptValue) && cmdOptValue.length > 0) {
              cmdOptValue.forEach((element) => { opts.push(cmdOpt.name, `${element[0]}=${element[1]}`); });
            } else {
              expectedType = '[string, string] | [string, string][]';
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

  throw new Error(`The type ${typeof anxOptions} is not supported for anxOptions, use object | string[] instead`);
}
