[![Renovate Status](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![CI Status](https://github.com/jstritch/easy-git-annex/workflows/CI/badge.svg)](https://github.com/jstritch/easy-git-annex/actions)
![Test Coverage](https://github.com/jstritch/easy-git-annex/blob/master/coverage/badge.svg?raw=true)

# easy-git-annex

The easy-git-annex package is a JavaScript/TypeScript API for git-annex and Git commands.
[git-annex](https://git-annex.branchable.com/) is an integrated alternative
to storing large files in [Git](https://git-scm.com/).

The easy-git-annex API is a wrapper over git-annex and Git commands.
Applications pass JavaScript objects with command options and parameters
to easy-git-annex which generates the appropriate syntax and runs the command.

Each command is run asynchronously without blocking the Node.js event loop.
The Promise returned from every command has the same structure and
includes the command and its arguments, repository path, exit code, stdout, and stderr.

Helper functions assist the application with parsing command responses.

Callbacks for stdout and stderr are available to show progress of time-consuming commands.
Environment variables may also be specified.

## Installation

Both Git and git-annex must be installed and verified to run from the command line.
Current versions of git-annex are available from the [developer](https://downloads.kitenet.net/).

Installation of easy-git-annex may be performed with the command

`npm install easy-git-annex`

## Usage

Reference the library from your code.

```javascript
import * as anx from 'easy-git-annex';
```

Obtain an accessor to use the GitAnnexAPI interface with the desired repository.
The directory passed to createAccessor must exist.
The GitAnnexAPI interface is described in the documentation.

```javascript
const myAnx = anx.createAccessor(repositoryPath);
```

An application may hold multiple accessors simultaneously.

### Commands

Git and git-annex commands are exposed by methods on the GitAnnexAPI interface.
Frequently used commands, such as commit, have a specific method to invoke the command.
Low-level methods runGit and runAnx are capable of invoking any Git or git-annex command.

A process is spawned to run each command asynchronously.
The ApiOptions, described below, may be used to influence process creation.

Additional methods return JavaScript objects for tasks common to many applications,
for example getStatusAnx and getStatusGit.

### Command options

Most git-annex and Git commands accept one or more options.
Options may be passed in an object or a string array.
When an object is passed, easy-git-annex handles the mechanics of generating the correct command syntax.
The string array approach is intended for features not yet implemented by easy-git-annex.

To pass options, construct an object with the desired keys and values.
Any keys in the object not for the command are ignored.
Command option names containing hyphens must be enclosed
in single or double quotation marks to be valid JavaScript identifiers.

Several types of option values are used.
Arrays of the appropriate type are used for options accepting more than one value and options which may be repeated.

#### Scalar

Some options accept a single value.
The following JavaScript adds files using at most two CPU cores.

```javascript
const addResult = await myAnx.addAnx(relativePaths, { '--jobs': 2 });
```

#### Flag

Some options do not accept a value. Supply a `null` value for these options.
The line below obtains a list of Git remotes and the associated URLs.

```javascript
const remoteResult = await myAnx.remote(anx.RemoteCommand.Show, undefined, { '--verbose': null });
```

#### Key-value pair

Options that require a key-value pair accept a tuple of [string, string]
containing the key name and value.
An example git-annex configuration setting appears below.

```javascript
const configResult = await myAnx.configAnx({ '--set': ['annex.largefiles', 'include=*.mp3 or include=*.jpg'] });
```

#### String array

An application may choose to construct the options as a string array.
The following line is functionally equivalent to the scalar example above.

```javascript
const addResult = await myAnx.addAnx(relativePaths, ['--jobs=2']);
```

### Command parameters

Some commands accept parameters such as relative paths of file names.
Git and git-annex commands use forward slash path separators regardless of platform.
The gitPath and gitPaths functions perform the conversions when necessary.

The gitPath and gitPaths functions are called internally by easy-git-annex for implemented relative path parameters.
When building a low-level command, calling gitPath and gitPaths is the application's responsibility.
The following JavaScript illustrates a low-level call of the Git add command.

```javascript
const addResult = await myAnx.runGit(['add', anx.gitPath(relativePath)]);
```

### API options

An application may control the environment variables passed to the command and
register callbacks for stdout and stderr using ApiOptions.

The fragment below clones the current environment,
adds variable GIT_TRACE to the copy, and establishes callback handlers for the output.
The apiOptions parameter is accepted by easy-git-annex command methods.

```javascript
function onConsoleOut(data) { console.log(data); }
function onConsoleErr(data) { console.error(data); }
const anxEnv = Object.assign({}, process.env);
anxEnv['GIT_TRACE'] = '2';
const apiOptions = { env: anxEnv, outHandler: onConsoleOut, errHandler: onConsoleErr };
```

The JavaScript bind function may be used to pass `this` and other parameters
to a callback as shown in the fragment below.

```javascript
function onAnnexOut(data) { console.log(`gitAnnexOut: ${this.something} ${data}`); }
const rslt = await myAnx.versionAnx({}, { outHandler: this.onAnnexOut.bind(this) }));
```

### Command result

The Promise returned by every command contains uninterpreted information about the process.
The CommandResult interface is described in the documentation.

Any method is capable of throwing an Error.
Any command that doesn't throw may return an exitCode indicating failure.
Application design must account for these eventualities.

Type predicates and helper functions may be used to parse command responses.
Some git-annex commands offer the ability to generate progress messages in JSON.
Other information may be present in the stdout stream.
The example below illustrates extracting progress objects using
helper function safeParseToArray filtering objects with type predicate isActionProgress.
The returned objects may be used to notify the user.

```javascript
const progress = anx.safeParseToArray(anx.isActionProgress, data);
```

## Documentation

The commands are explained in the
[API documentation](https://jstritch.github.io/easy-git-annex/).

## Contributions

Adding support for additional commands is usually straightforward.
If you would like to improve easy-git-annex, please read CONTRIBUTING.md.

I am an independent developer.
If you find easy-git-annex helpful, please consider becoming a
[sponsor](https://github.com/sponsors/jstritch).

## Example

The example may be copied and run on your machine.
It creates a temporary directory,
prepares the directory for Git and git-annex,
and adds one large and one small file to a subdirectory,
and reports success or failure.
The repository remains on your system for study.

```typescript
import * as anx from 'easy-git-annex';
import * as os from 'os';
import * as path from 'path';
import { promises as fs } from 'fs';

async function setupAnnexClient(repositoryPath: string, description: string, largefiles: string): Promise<void> {
  const myAnx = anx.createAccessor(repositoryPath);

  let rslt = await myAnx.initGit();
  if (rslt.exitCode !== 0) { throw new Error(rslt.toCommandResultString()); }

  rslt = await myAnx.configGit({ set: ['push.followTags', 'true'] });
  if (rslt.exitCode !== 0) { throw new Error(rslt.toCommandResultString()); }

  rslt = await myAnx.configGit({ set: ['receive.denyCurrentBranch', 'updateInstead'] });
  if (rslt.exitCode !== 0) { throw new Error(rslt.toCommandResultString()); }

  rslt = await myAnx.initAnx(description);
  if (rslt.exitCode !== 0) { throw new Error(rslt.toCommandResultString()); }

  rslt = await myAnx.wanted('here', 'standard');
  if (rslt.exitCode !== 0) { throw new Error(rslt.toCommandResultString()); }

  rslt = await myAnx.group('here', 'manual');
  if (rslt.exitCode !== 0) { throw new Error(rslt.toCommandResultString()); }

  rslt = await myAnx.configAnx({ '--set': ['annex.largefiles', largefiles] });
  if (rslt.exitCode !== 0) { throw new Error(rslt.toCommandResultString()); }
}

async function addFiles(repositoryPath: string, relativePaths: string | string[], commitMessage: string): Promise<void> {
  const myAnx = anx.createAccessor(repositoryPath);

  let rslt = await myAnx.addAnx(relativePaths);
  if (rslt.exitCode !== 0) { throw new Error(rslt.toCommandResultString()); }

  rslt = await myAnx.commit(relativePaths, { '--message': commitMessage });
  if (rslt.exitCode !== 0) { throw new Error(rslt.toCommandResultString()); }
}

export async function runExampleClick(): Promise<void> {
  try {
    // create a directory
    const repositoryPath = await fs.mkdtemp(path.join(os.tmpdir(), 'anx-client-'));

    // setup a git-annex client
    const largefiles = 'include=*.xtx or include=*.jpg';
    await setupAnnexClient(repositoryPath, 'images', largefiles);

    // add a subdirectory
    const exampleDir = 'january';
    await fs.mkdir(path.join(repositoryPath, exampleDir));

    // add a small and large file
    const smallFile = path.join(exampleDir, 'small file.txt');
    const largeFile = path.join(exampleDir, 'large file.xtx');
    await fs.writeFile(path.join(repositoryPath, smallFile), 'small file stored in Git\n');
    await fs.writeFile(path.join(repositoryPath, largeFile), 'large file stored in git-annex\n');
    await addFiles(repositoryPath, [smallFile, largeFile], 'add two files');

    console.log(`Created ${repositoryPath}`);
  } catch (e: unknown) {
    console.error(e);
  }
}
```

## Node.js support

This version of easy-git-annex runs on Node.js versions 12, 14, and 16.

Node.js 12 end-of-life is 2022-04-30.
Support for Node.js 12 will be dropped when version 18 support is added.
