import * as path from 'path';
import { cloneEnv, createRepository, deleteDirectory, pathExists } from './helpers';

describe('cloneEnv', () => {

  test('correctly duplicates the current environemt variables', () => {
    const anxEnv = cloneEnv();
    anxEnv['variableName'] = 'stringValue';

    expect(anxEnv).toMatchObject(process.env);
    expect(anxEnv).toHaveProperty('variableName', 'stringValue');
    expect(process.env).not.toHaveProperty('variableName');
  });

});

describe('createDirectory, createRepository, deleteDirectory, pathExists', () => {

  test('correctly creates and deletes a repository', async () => {
    const repositoryPath = await createRepository();

    expect(await pathExists(repositoryPath)).toBe(true);
    expect(await pathExists(path.join(repositoryPath, '.git'))).toBe(true);

    await deleteDirectory(repositoryPath);

    expect(await pathExists(repositoryPath)).toBe(false);
  });

});
