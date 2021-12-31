export enum CommandGroup {
  Anx = 'anx',
  AnxCommon = 'anx-common',
  Git = 'git',
}

export enum OptionKind {
  CommaDelimitedStrings,
  Flag,
  KeyValue,
  Numeric,
  QuasiKeyValue,
  RepeatableKeyValue,
  String,
  StringParam,
}

export interface CommandOption {
  name: string;
  kind: OptionKind;
}

const anxCommandOptions: Map<string, CommandOption[]> = new Map([
  ['_common', [
    { name: '--backend', kind: OptionKind.String },
    { name: '--c', kind: OptionKind.RepeatableKeyValue },
    { name: '--debug', kind: OptionKind.Flag },
    { name: '--debugfilter', kind: OptionKind.CommaDelimitedStrings },
    { name: '--fast', kind: OptionKind.Flag },
    { name: '--force', kind: OptionKind.Flag },
    { name: '--mincopies', kind: OptionKind.Numeric },
    { name: '--no-debug', kind: OptionKind.Flag },
    { name: '--numcopies', kind: OptionKind.Numeric },
    { name: '--quiet', kind: OptionKind.Flag },
    { name: '--size-limit', kind: OptionKind.String },
    { name: '--time-limit', kind: OptionKind.String },
    { name: '--verbose', kind: OptionKind.Flag },
  ]],
  ['add', [
    { name: '--force-large', kind: OptionKind.Flag },
    { name: '--force-small', kind: OptionKind.Flag },
    { name: '--jobs', kind: OptionKind.Numeric },
    { name: '--json', kind: OptionKind.Flag },
    { name: '--json-progress', kind: OptionKind.Flag },
  ]],
  ['config', [
    { name: '--get', kind: OptionKind.String },
    { name: '--set', kind: OptionKind.KeyValue },
    { name: '--unset', kind: OptionKind.String },
  ]],
  ['describe', []],
  ['group', []],
  ['groupwanted', []],
  ['init', []],
  ['lock', [
    { name: '--json', kind: OptionKind.Flag },
  ]],
  ['reinit', []],
  ['status', [
    { name: '--json', kind: OptionKind.Flag },
  ]],
  ['ungroup', []],
  ['uninit', []],
  ['unlock', [
    { name: '--json', kind: OptionKind.Flag },
  ]],
  ['version', [
    { name: '--raw', kind: OptionKind.Flag },
  ]],
  ['wanted', []],
]);

const gitCommandOptions: Map<string, CommandOption[]> = new Map([
  ['clone', [
    { name: '--origin', kind: OptionKind.StringParam },
    { name: '--progress', kind: OptionKind.Flag },
    { name: '--quiet', kind: OptionKind.Flag },
    { name: '--verbose', kind: OptionKind.Flag },
  ]],
  ['commit', [
    { name: '--message', kind: OptionKind.String },
    { name: '--quiet', kind: OptionKind.Flag },
  ]],
  ['config', [
    { name: '--local', kind: OptionKind.Flag },
    { name: '--global', kind: OptionKind.Flag },
    { name: '--system', kind: OptionKind.Flag },
    { name: '--show-scope', kind: OptionKind.Flag },
    { name: '--list', kind: OptionKind.Flag },
    { name: '--get', kind: OptionKind.StringParam },
    { name: '--set', kind: OptionKind.QuasiKeyValue },
    { name: '--unset', kind: OptionKind.StringParam },
  ]],
  ['init', [
    { name: '--bare', kind: OptionKind.Flag },
  ]],
  ['rm', [
    { name: '--force', kind: OptionKind.Flag },
    { name: '--ignore-unmatch', kind: OptionKind.Flag },
    { name: '--quiet', kind: OptionKind.Flag },
    { name: '-r', kind: OptionKind.Flag },
  ]],
  ['tag', [
    { name: '--annotate', kind: OptionKind.Flag },
    { name: '--delete', kind: OptionKind.Flag },
    { name: '--force', kind: OptionKind.Flag },
    { name: '--message', kind: OptionKind.String },
  ]],
  ['version', [
    { name: '--build-options', kind: OptionKind.Flag },
  ]],
]);

function getMapEntry(commandGroup: CommandGroup, commandName: string): CommandOption[] {
  const cmdMap = commandGroup === CommandGroup.Anx ? anxCommandOptions : gitCommandOptions;
  const cmdOptions = cmdMap.get(commandName);
  if (cmdOptions === undefined) {
    throw new Error(`The ${commandGroup} command ${commandName} is not recognized`);
  }
  return cmdOptions;
}

export function getCommandOptions(commandGroup: CommandGroup, commandName: string): CommandOption[] {
  if (commandGroup === CommandGroup.AnxCommon) {
    return getMapEntry(CommandGroup.Anx, '_common').concat(getMapEntry(CommandGroup.Anx, commandName));
  }
  return getMapEntry(commandGroup, commandName);
}
