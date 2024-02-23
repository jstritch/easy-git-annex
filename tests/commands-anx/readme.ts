import * as anx from '../../src/index.ts';
import * as os from 'node:os';
import * as path from 'node:path';
import { promises as fs } from 'node:fs';

async function setupAnnexClient(repositoryPath: string, description: string, largefiles: string): Promise<void> {
  const myAnx = anx.createAccessor(repositoryPath);

  anx.checkResult(await myAnx.initGit());

  const gitSettings: [string, string][] = [
    ['push.followTags', 'true'],
    ['receive.denyCurrentBranch', 'updateInstead'],
  ];
  for (const setting of gitSettings) {
    anx.checkResult(await myAnx.configGit({ set: setting, '--local': null }));
  }

  anx.checkResult(await myAnx.initAnx(description));

  anx.checkResult(await myAnx.wanted('here', 'standard'));

  anx.checkResult(await myAnx.group('here', 'manual'));

  const anxSettings: [string, string][] = [
    ['annex.largefiles', largefiles],
  ];
  for (const setting of anxSettings) {
    anx.checkResult(await myAnx.configAnx({ '--set': setting }));
  }
}

async function addFiles(repositoryPath: string, relativePaths: string | string[], commitMessage: string): Promise<void> {
  const myAnx = anx.createAccessor(repositoryPath);

  anx.checkResult(await myAnx.addAnx(relativePaths));

  anx.checkResult(await myAnx.commit(relativePaths, { '--message': commitMessage }));
}

export async function runExampleClick(): Promise<string> {
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

  return repositoryPath;
}
