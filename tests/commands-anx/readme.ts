/* eslint-disable no-console */
import * as anx from '../../src/index';
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
    await fs.writeFile(path.join(repositoryPath, smallFile),
      'small file stored in Git\n');
    await fs.writeFile(path.join(repositoryPath, largeFile),
      'large file stored in git-annex\n');
    await addFiles(repositoryPath, [smallFile, largeFile], 'add two files');

    console.log(`Created ${repositoryPath}`);
  } catch (e: unknown) {
    console.error(e);
    throw e;
  }
}
