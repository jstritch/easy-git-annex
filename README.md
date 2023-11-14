[![Renovate Status](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![CI Status](https://github.com/jstritch/easy-git-annex/workflows/CI/badge.svg)](https://github.com/jstritch/easy-git-annex/actions)
![Test Coverage](https://github.com/jstritch/easy-git-annex/blob/master/coverage/badge.svg?raw=true)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/R6R8NY1ZK)
[![Liberapay](https://liberapay.com/assets/widgets/donate.svg)](https://liberapay.com/jstritch)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/jstritch)

# easy-git-annex

The easy-git-annex package is a JavaScript/TypeScript API for git-annex and Git commands.
[git-annex](https://git-annex.branchable.com/) is an integrated alternative
to storing large files in [Git](https://git-scm.com/).
Git commands can be used without installing git-annex.

The easy-git-annex API is a wrapper over git-annex and Git commands.
Applications pass JavaScript objects with command options and parameters
to easy-git-annex which generates the appropriate command line and runs the command.

Each command is run asynchronously without blocking the Node.js event loop.
The Promise returned from every command has the same structure and
includes the command and its arguments, repository path, exit code, stdout, and stderr.
All Promise behavior, including chaining and concurrency, can be used normally.

Helper functions assist your application with parsing command responses.
Additional methods, such as getRepositories and getStatusGit, return JavaScript objects
for tasks common to many applications.

Callbacks for stdout and stderr are available to show progress of time-consuming commands.
Environment variables can also be specified.

## Installation

Git must be installed and verified to run from the command line.

If you want to use git-annex, [download](https://downloads.kitenet.net/), install, and verify it runs from the command line.

Installation of easy-git-annex can be performed with the command

`npm install easy-git-annex`

GitHub repositories can use the
[jstritch/setup-git-annex](https://github.com/marketplace/actions/setup-git-annex)
action to install git-annex in workflows.
Workflows using jstritch/setup-git-annex can test git-annex applications on Linux, macOS, and Windows.

## Usage

The easy-git-annex package is an ECMAScript module.
Your code can reference the library statically

```typescript
import * as anx from 'easy-git-annex';
```

or by using a dynamic import.

```typescript
const anx = await import('easy-git-annex');
```

Obtain an accessor to use the
[GitAnnexAPI](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html)
interface with the desired repository.
The directory passed to createAccessor must exist but may be empty.

```typescript
const myAnx = anx.createAccessor(repositoryPath);
```

An application may hold multiple accessors simultaneously.

### Commands

Git and git-annex commands are exposed by methods on the
[GitAnnexAPI](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html) interface.
A process is spawned to run each command asynchronously.
The ApiOptions parameter, described below, can be used to influence process creation.

### Command options

Many git-annex and Git commands accept one or more options.
The command-line syntax for passing option values varies per command and option.
Applications can choose to let easy-git-annex deal with the syntax by passing options in an object.
To meet atypical requirements, an application can construct the command-line syntax options in a string array.

Applications passing options as an object have a consistent way to specify values since easy-git-annex inserts the correct delimiters.
When constructing a command option object, key names containing hyphens must be enclosed
in single or double quotation marks to be valid JavaScript identifiers.

* Scalar values are passed normally: `{ '--jobs': 2 }`.

* To pass a flag that does not accept a value, supply null as the value: `{ '--verbose': null }`.

* A tuple of [string, string] is used for options requiring a key-value pair: `{ '--set': ['annex.largefiles', 'mimeencoding=binary'] }`.

* Arrays are used for options accepting more than one value and options which can be repeated: `{ '-e': ['foo', 'bar', 'baz'] }`.

Any keys in the object not defined for the command are ignored by easy-git-annex.

### Command file name parameters

Some commands accept relative paths of file names.
Git and git-annex commands use forward slash path separators regardless of platform.
The gitPath and gitPaths functions perform the conversions when necessary.

The gitPath and gitPaths functions are called internally by easy-git-annex for implemented relative path parameters.
When building a low-level command or constructing an options string array, calling gitPath and gitPaths is the application's responsibility.
The following JavaScript illustrates a low-level call of the Git add command

```typescript
const rslt = await myAnx.runGit(['add', anx.gitPath(relativePath)]);
```

which is equivalent to

```typescript
const rslt = await myAnx.addGit(relativePath);
```

### Command API options

An application can control the environment variables passed to the command and
register callbacks for stdout and stderr using the
[ApiOptions](https://jstritch.github.io/easy-git-annex/interfaces/ApiOptions.html)
parameter.
The apiOptions parameter is accepted by easy-git-annex command methods.

The fragment below clones the current environment and adds variable GIT_TRACE to the copy.

```javascript
const anxEnv = Object.assign({}, process.env);
anxEnv['GIT_TRACE'] = '2';
const apiOptions = { env: anxEnv };
```

The JavaScript `bind` function can be used to pass `this` and other parameters
to a callback as shown in the fragment below.

```javascript
const apiOptions = { outHandler: this.onAnnexOut.bind(this) };
```

The use of callbacks is shown in the Examples section, below.

### Command result

The Promise returned by every command contains uninterpreted information about the process in the
[CommandResult](https://jstritch.github.io/easy-git-annex/interfaces/CommandResult.html) interface.

Any method is capable of throwing an Error.
Any command that doesn't throw can return an exitCode indicating failure.
Application design must account for these eventualities.

## Documentation

All features are explained in the
[API documentation](https://jstritch.github.io/easy-git-annex/).
Links to commonly used methods appear below.

### Setup methods

* [clone](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#clone) Clones a repository into an empty directory.
* [describeAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#describeAnx) Changes the description of a repository.
* [initAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#initAnx) Initializes a repository for use with git-annex.
* [initGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#initGit) Creates an empty Git repository or reinitializes an existing one.
* [reinit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#reinit) Initializes a repository for use with git-annex specifying the uuid.
* [submodule](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#submodule) Manages submodules.
* [uninit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#uninit) Stops the use of git-annex in a repository.

### Configuration Methods

* [configAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#configAnx) Gets or set git-annex configuration settings.
* [configGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#configGit) Gets or set Git configuration settings.
* [group](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#group) Gets or sets the group association of a repository.
* [groupwanted](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#groupwanted) Gets or sets the groupwanted expression of a repository group.
* [mincopies](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#mincopies) Gets or sets the minimum number of copies.
* [numcopies](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#numcopies) Gets or sets the desired number of copies.
* [required](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#required) Gets or sets the required content expression of a repository.
* [ungroup](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#ungroup) Removes a repository from a group previously set by the group command.
* [wanted](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#wanted) Gets or sets the wanted content expression of a repository.

### Contents Methods

* [addAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#addAnx) Adds files to Git and git-annex.
* [addGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#addGit) Adds file contents to the index.
* [addunused](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#addunused) Adds back unused files.
* [clean](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#clean) Removes untracked files from the working tree.
* [commit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#commit) Records changes to the repository.
* [copy](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#copy) Copies file content to or from another repository.
* [diff](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#diff) Shows changes between commits, commit and working tree, etc.
* [drop](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#drop) Removes file content from a repository.
* [dropunused](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#dropunused) Drops unused file content.
* [export](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#export) Exports a tree of files to a special remote.
* [find](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#find) Lists available files.
* [get](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#get) Makes content of annexed files available.
* [getFileNames](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getFileNames) Obtains an array of filenames in the index and the working tree.
* [getStatusAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getStatusAnx) Obtains an array describing the working tree status.
* [getStatusGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getStatusGit) Obtains an array describing the working tree status.
* [grep](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#grep) Finds lines matching a pattern.
* [import](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#import) Imports a tree of files from a special remote.
* [lock](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#lock) Locks files to prevent modification.
* [lsFiles](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#lsFiles) Shows information about files in the index and the working tree.
* [move](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#move) Moves file content to or from another repository.
* [oldkeys](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#oldkeys) Lists keys used for old versions of annexed files.
* [mv](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#mv) Moves or renames a file, a directory, or a symlink.
* [rm](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#rm) Removes file content from the repository.
* [statusAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#statusAnx) Shows the working tree status.
* [statusGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#statusGit) Shows the working tree status.
* [unannex](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#unannex) Undoes a git-annex add command.
* [unlock](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#unlock) Unlocks files for modification.
* [unused](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#unused) Looks for unused file content.
* [whereis](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#whereis) Lists repositories containing files.
* [whereused](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#whereused) Finds which files use or used a key.

### Branching methods

* [adjust](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#adjust) Enters an adjusted branch.
* [branch](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#branch) Manages branches.
* [checkout](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#checkout) Switches branches or restores working tree files.
* [cherryPick](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#cherryPick) Applies changes introduced by existing commits.
* [getBranchName](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getBranchName) Obtains the current branch name.
* [getBranchNames](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getBranchNames) Obtains an array of branch names.
* [getTagNames](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getTagNames) Obtains an array of tag names.
* [log](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#log) Shows commit log entries.
* [mergeAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#mergeAnx) Joins two or more development histories.
* [mergeGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#mergeGit) Joins two or more development histories.
* [rebase](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#rebase) Reapplies commits on top of another base tip.
* [reset](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#reset) Resets the current HEAD to the specified state.
* [restore](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#restore) Restores working tree files.
* [revert](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#revert) Reverts existing commits.
* [stash](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#stash) Saves the changes in a dirty working directory.
* [switch](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#switch) Shows changes between commits, commit and working tree, etc.
* [tag](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#tag) Creates, deletes, or lists tag objects.

### Remotes methods

* [assist](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#assist) Adds files and synchronizes changes with remotes.
* [configremote](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#configremote) Changes special remote configuration.
* [dead](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#dead) Hides a lost repository.
* [enableremote](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#enableremote) Enables use of an existing remote in the current repository.
* [expire](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#expire) Expires inactive repositories.
* [fetch](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#fetch) Downloads objects and refs from another repository.
* [getRemoteNames](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getRemoteNames) Obtains an array of remote names.
* [initremote](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#initremote) Creates a special remote.
* [pullAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#pullAnx) Pulls content from remotes.
* [pull](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#pull) Fetches from and integrates with another repository or a local branch.
* [pushAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#pushAnx) Pushes content to remotes.
* [push](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#push) Updates remote refs along with associated objects.
* [remote](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#remote) Manages the set of tracked repositories.
* [renameremote](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#renameremote) Changes the name of a special remote.
* [satisfy](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#satisfy) Transfers and drops content as configured.
* [semitrust](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#semitrust) Sets a repository to the default trust level.
* [sync](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#sync) Synchronizes the local repository with remotes.
* [untrust](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#untrust) Records that a repository is not trusted and could lose content at any time.

### Inspection methods

* [forEachRef](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#forEachRef) Reports information about each ref.
* [getBackends](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getBackends) Obtains an array of key-value backends.
* [getBuildFlags](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getBuildFlags) Obtains an array of the git-annex build flags.
* [getRepositories](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getRepositories) Obtains an array identifying the current repositories.
* [getRepositoryInfo](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getRepositoryInfo) Obtains an object identifying the current repository.
* [getSpecialRemoteTypes](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getSpecialRemoteTypes) Obtains an array of special remote types.
* [info](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#info) Obtains information about an item or the repository.
* [list](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#list) Shows which remotes contain files.
* [revParse](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#revParse) Picks out and massages parameters.
* [show](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#show) Displays various types of objects.

### Generic functions

* [getBranches](https://jstritch.github.io/easy-git-annex/functions/getBranches) Returns information about Git branches in application-defined JavaScript objects.
* [getFinds](https://jstritch.github.io/easy-git-annex/functions/getFinds) Returns information about available files in application-defined JavaScript objects.
* [getLogs](https://jstritch.github.io/easy-git-annex/functions/getLogs) Returns information about Git commits in application-defined JavaScript objects.
* [getRefs](https://jstritch.github.io/easy-git-annex/functions/getRefs) Returns information about Git refs in application-defined JavaScript objects.
* [getShows](https://jstritch.github.io/easy-git-annex/functions/getShows) Returns information about Git objects in application-defined JavaScript objects.
* [getTags](https://jstritch.github.io/easy-git-annex/functions/getTags) Returns information about Git tags in application-defined JavaScript objects.
* [getWhereis](https://jstritch.github.io/easy-git-annex/functions/getWhereis) Returns information about repositories containing files in application-defined JavaScript objects.
* [listFiles](https://jstritch.github.io/easy-git-annex/functions/listFiles) Returns information about index and working tree files in application-defined JavaScript objects.

### Maintenance Methods

* [forget](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#forget) Prunes git-annex branch history.
* [fsckAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#fsckAnx) Verifies the validity of objects in git-annex.
* [fsckGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#fsckGit) Verifies the connectivity and validity of objects in Git.
* [repair](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#repair) Recovers a broken Git repository.

### Version methods

* [getVersionAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getVersionAnx) Obtains build information about the local git-annex installation in a JavaScript object.
* [getVersionGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#getVersionGit) Obtains build information about the local Git installation in a JavaScript object.
* [versionAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#versionAnx) Obtains build information about the local git-annex installation.
* [versionGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#versionGit) Obtains build information about the local Git installation.

### Low-level methods

* [runAnx](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#runAnx) Runs any git-annex command.
* [runGit](https://jstritch.github.io/easy-git-annex/interfaces/GitAnnexAPI.html#runGit) Runs any Git command.

## Contributions

If you would like to suggest a new feature or report a problem, please create an
[issue](https://github.com/jstritch/easy-git-annex/issues).

If you would like to improve the easy-git-annex code, please read CONTRIBUTING.md.

I am an independent developer.
If you find easy-git-annex helpful, please consider donating via
[Ko-fi](https://ko-fi.com/jstritch),
[Liberapay](https://liberapay.com/jstritch),
[Patreon](https://www.patreon.com/jstritch), or
[GitHub](https://github.com/sponsors/jstritch).

## Examples

### Create a repository

This example illustrates one way to create a git-annex repository and add some files.
The example may be copied and run on your machine.
When you invoke runExampleClick from a test application, it creates a temporary directory,
prepares the directory for Git and git-annex,
adds one large and one small file to a subdirectory,
and reports success or failure.

The repository remains on your system for study.
Once the repository exists, you can

* List annexed files using the [git annex list](https://git-annex.branchable.com/git-annex-list/) command.
* Add remote repositories using [git clone](https://git-scm.com/docs/git-clone) followed by
[git annex init](https://git-annex.branchable.com/git-annex-init/).
* Add special remotes with [git annex initremote](https://git-annex.branchable.com/git-annex-initremote/).
The `directory` remote type is great for learning.
* Save new files, deleted files, and file modifications using the
commands [git annex add](https://git-annex.branchable.com/git-annex-add/)
followed by [git commit](https://git-scm.com/docs/git-commit).
* Use the [git annex push](https://git-annex.branchable.com/git-annex-push/)
and [git annex pull](https://git-annex.branchable.com/git-annex-pull/)
commands to copy files between a repository and a special remote or another repository.
* Experiment with other commands.

```typescript
import * as anx from 'easy-git-annex';
import * as os from 'node:os';
import * as path from 'node:path';
import { promises as fs } from 'node:fs';

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

### Show progress of long-running commands

To make the addFiles function, above, display progress as files are added to git-annex, add the reportProgress function shown below.
The safeParseToArray function converts the received string to an array of JavaScript objects meeting the ActionProgress interface.
Each object is then written to console.info.

```typescript
function reportProgress(data: string): void {
  const progress = anx.safeParseToArray(anx.isActionProgress, data);
  progress.forEach((e) => { console.info(`${e['percent-progress']} ${e.action.command} ${e.action.file} ${e['byte-progress'].toLocaleString()} / ${e['total-size'].toLocaleString()}`); });
}
```

Then modify the `addAnx` line in addFiles to include the AddAnxOptions and ApiOptions parameters as shown below.
The `--json-progress` option requests JSON progress be written to stdout as files are added.
The outHandler establishes the reportProgress function to be called as information becomes available on stdout.

```typescript
  let rslt = await myAnx.addAnx(relativePaths, { '--json-progress': null }, { outHandler: reportProgress });
```

When the example is run, progress messages appear on the console for each annexed file before the command completes.

### Get application-defined JavaScript objects

Several generic functions are included in easy-git-annex.
These functions return JavaScript objects defined by your application.
This example uses the generic function getTags to obtain tag objects.
The pattern is similar for the other generic functions.

First declare the interface your application requires.

```typescript
export interface FooTag {
  name: string;
  objectName: string;
  taggerDate?: Date;
  contents?: string;
}
```

Then write a type predicate to determine if an object meets the interface requirements.

```typescript
export function isFooTag(o: unknown): o is FooTag {
  if (!anx.isRecord(o)) { return false; }
  if (!anx.isString(o['name'])) { return false; }
  if (!anx.isString(o['objectName'])) { return false; }
  if ('taggerDate' in o && !anx.isDate(o['taggerDate'])) { return false; }
  if ('contents' in o && !anx.isString(o['contents'])) { return false; }
  return true;
}
```

Write a function to return your tag objects.
The getFooTags function takes it's caller's arguments, 
sets up a [getTags](https://jstritch.github.io/easy-git-annex/functions/getTags) call, and returns the result.

```typescript
export async function getFooTags(repositoryPath: string, tagName?: string, ignoreCase?: boolean): Promise<FooTag[]> {

  const columns: [string, anx.Parser?][] = [
    ['name'],
    ['objectName'],
    ['taggerDate', anx.parseUnixDate],
    ['contents', anx.parseOptionalString],
  ];

  const options: anx.ForEachRefOptions = {
    '--format': '%(refname:lstrip=2)%09%(objectname)%09%(taggerdate:unix)%09%(contents:lines=1)',
    '--sort': ['*refname'],
    ...ignoreCase === true && { '--ignore-case': null }
  };

  return anx.getTags(isFooTag, columns, repositoryPath, options, tagName);
}
```

Your application can make the following call to get a list of all tags beginning with the letter `v`:

```typescript
const fooTags = await getFooTags(repositoryPath, 'v*');
```

The `fooTags` array can then be used in your application normally.
