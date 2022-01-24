export enum CommandGroup {
  Anx,
  AnxCommon,
  Git,
}

export enum OptionKind {
  Flag,
  KeyValue,
  RepeatableKeyValue,
  AnonymousKeyValue,
  Numeric,
  String,
  OptionalString,
  StringParam,
  CommaDelimitedStrings,
  AnonymousStrings,
  RepeatablePath,
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
    { name: 'matching', kind: OptionKind.AnonymousStrings },
  ]],
  ['config', [
    { name: '--get', kind: OptionKind.String },
    { name: '--set', kind: OptionKind.KeyValue },
    { name: '--unset', kind: OptionKind.String },
  ]],
  ['describe', []],
  ['enableremote', []],
  ['fsck', [
    { name: '--all', kind: OptionKind.Flag },
    { name: '--branch', kind: OptionKind.String },
    { name: '--from', kind: OptionKind.String },
    { name: '--incremental', kind: OptionKind.Flag },
    { name: '--incremental-schedule', kind: OptionKind.String },
    { name: '--jobs', kind: OptionKind.Numeric },
    { name: '--json', kind: OptionKind.Flag },
    { name: '--key', kind: OptionKind.String },
    { name: '--more', kind: OptionKind.Flag },
    { name: '--unused', kind: OptionKind.Flag },
    { name: 'matching', kind: OptionKind.AnonymousStrings },
  ]],
  ['group', []],
  ['groupwanted', []],
  ['info', [
    { name: '--bytes', kind: OptionKind.Flag },
    { name: '--json', kind: OptionKind.Flag },
    { name: 'matching', kind: OptionKind.AnonymousStrings },
  ]],
  ['init', []],
  ['initremote', [
    { name: '--private', kind: OptionKind.Flag },
    { name: '--sameas', kind: OptionKind.String },
    { name: '--whatelse', kind: OptionKind.Flag },
  ]],
  ['list', [
    { name: '--allrepos', kind: OptionKind.Flag },
    { name: 'matching', kind: OptionKind.AnonymousStrings },
  ]],
  ['lock', [
    { name: '--json', kind: OptionKind.Flag },
    { name: 'matching', kind: OptionKind.AnonymousStrings },
  ]],
  ['reinit', []],
  ['renameremote', []],
  ['status', [
    { name: '--json', kind: OptionKind.Flag },
  ]],
  ['sync', [
    { name: '--all', kind: OptionKind.Flag },
    { name: '--allow-unrelated-histories', kind: OptionKind.Flag },
    { name: '--cleanup', kind: OptionKind.Flag },
    { name: '--commit', kind: OptionKind.Flag },
    { name: '--content', kind: OptionKind.Flag },
    { name: '--content-of', kind: OptionKind.RepeatablePath },
    { name: '--jobs', kind: OptionKind.Numeric },
    { name: '--message', kind: OptionKind.String },
    { name: '--no-allow-unrelated-histories', kind: OptionKind.Flag },
    { name: '--no-commit', kind: OptionKind.Flag },
    { name: '--no-content', kind: OptionKind.Flag },
    { name: '--no-pull', kind: OptionKind.Flag },
    { name: '--no-push', kind: OptionKind.Flag },
    { name: '--no-resolvemerge', kind: OptionKind.Flag },
    { name: '--not-only-annex', kind: OptionKind.Flag },
    { name: '--only-annex', kind: OptionKind.Flag },
    { name: '--pull', kind: OptionKind.Flag },
    { name: '--push', kind: OptionKind.Flag },
    { name: '--resolvemerge', kind: OptionKind.Flag },
  ]],
  ['ungroup', []],
  ['uninit', []],
  ['unlock', [
    { name: '--json', kind: OptionKind.Flag },
    { name: 'matching', kind: OptionKind.AnonymousStrings },
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
  ['config', [  // option order is important to Git
    { name: '--local', kind: OptionKind.Flag },
    { name: '--global', kind: OptionKind.Flag },
    { name: '--system', kind: OptionKind.Flag },
    { name: '--show-scope', kind: OptionKind.Flag },
    { name: '--list', kind: OptionKind.Flag },
    { name: '--get', kind: OptionKind.StringParam },
    { name: 'set', kind: OptionKind.AnonymousKeyValue },
    { name: '--unset', kind: OptionKind.StringParam },
  ]],
  ['fsck', [
    { name: '--cache', kind: OptionKind.Flag },
    { name: '--connectivity-only', kind: OptionKind.Flag },
    { name: '--dangling', kind: OptionKind.Flag },
    { name: '--full', kind: OptionKind.Flag },
    { name: '--lost-found', kind: OptionKind.Flag },
    { name: '--name-objects', kind: OptionKind.Flag },
    { name: '--no-dangling', kind: OptionKind.Flag },
    { name: '--no-full', kind: OptionKind.Flag },
    { name: '--no-progress', kind: OptionKind.Flag },
    { name: '--no-reflogs', kind: OptionKind.Flag },
    { name: '--progress', kind: OptionKind.Flag },
    { name: '--root', kind: OptionKind.Flag },
    { name: '--strict', kind: OptionKind.Flag },
    { name: '--tags', kind: OptionKind.Flag },
    { name: '--unreachable', kind: OptionKind.Flag },
    { name: '--verbose', kind: OptionKind.Flag },
  ]],
  ['init', [
    { name: '--bare', kind: OptionKind.Flag },
  ]],
  ['mv', [
    { name: '--force', kind: OptionKind.Flag },
    { name: '--verbose', kind: OptionKind.Flag },
    { name: '-k', kind: OptionKind.Flag },
  ]],
  ['remote', [
    { name: '--verbose', kind: OptionKind.Flag },
  ]],
  ['rm', [
    { name: '--force', kind: OptionKind.Flag },
    { name: '--ignore-unmatch', kind: OptionKind.Flag },
    { name: '--quiet', kind: OptionKind.Flag },
    { name: '-r', kind: OptionKind.Flag },
  ]],
  ['status', [
    { name: '--ahead-behind', kind: OptionKind.Flag },
    { name: '--branch', kind: OptionKind.Flag },
    { name: '--column', kind: OptionKind.OptionalString },
    { name: '--find-renames', kind: OptionKind.OptionalString },
    { name: '--ignore-submodules', kind: OptionKind.OptionalString },
    { name: '--ignored', kind: OptionKind.OptionalString },
    { name: '--long', kind: OptionKind.Flag },
    { name: '--no-ahead-behind', kind: OptionKind.Flag },
    { name: '--no-column', kind: OptionKind.Flag },
    { name: '--no-renames', kind: OptionKind.Flag },
    { name: '--porcelain', kind: OptionKind.OptionalString },
    { name: '--renames', kind: OptionKind.Flag },
    { name: '--short', kind: OptionKind.Flag },
    { name: '--show-stash', kind: OptionKind.Flag },
    { name: '--untracked-files', kind: OptionKind.OptionalString },
    { name: '--verbose', kind: OptionKind.Flag },
    { name: '-z', kind: OptionKind.Flag },
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
    throw new Error(`The ${CommandGroup[commandGroup]} command ${commandName} is not recognized`);
  }
  return cmdOptions;
}

export function getCommandOptions(commandGroup: CommandGroup, commandName: string): CommandOption[] {
  if (commandGroup === CommandGroup.AnxCommon) {
    return [...getMapEntry(CommandGroup.Anx, '_common'), ...getMapEntry(CommandGroup.Anx, commandName)];
  }
  return getMapEntry(commandGroup, commandName);
}
