export interface CommandOption {
  name: string;
  kind: string;
}

const commandOptions: Map<string, CommandOption[]> = new Map([
  ['_common', [
    { name: '--backend', kind: 'string' },
    { name: '--c', kind: 'repeatableKeyValue' },
    { name: '--debug', kind: 'flag' },
    { name: '--debugfilter', kind: 'commaDelimitedStrings' },
    { name: '--fast', kind: 'flag' },
    { name: '--force', kind: 'flag' },
    { name: '--mincopies', kind: 'numeric' },
    { name: '--no-debug', kind: 'flag' },
    { name: '--numcopies', kind: 'numeric' },
    { name: '--quiet', kind: 'flag' },
    { name: '--size-limit', kind: 'string' },
    { name: '--time-limit', kind: 'string' },
    { name: '--user-agent', kind: 'string' },
    { name: '--verbose', kind: 'flag' },
  ]],
  ['describe', []],
  ['init', [
    { name: '--autoenable', kind: 'flag' },
    { name: '--version', kind: 'numeric' },
  ]],
  ['reinit', []],
  ['uninit', []],
  ['version', [
    { name: '--raw', kind: 'flag' },
  ]]
]);

function getMapEntry(commandName: string): CommandOption[] {
  const cmdOptions = commandOptions.get(commandName);
  if (cmdOptions === undefined) {
    throw new Error(`The command ${commandName} is not recognized`);
  }
  return cmdOptions;
}

export function getCommandOptions(commandName: string): CommandOption[] {
  const commonOptions = getMapEntry('_common');
  const cmdOptions = getMapEntry(commandName);
  return commonOptions.concat(cmdOptions);
}
