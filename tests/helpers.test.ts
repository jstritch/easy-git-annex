import { cloneEnv, createDirectory, deleteDirectory } from './helpers';
import { pathExists } from '../src/helpers/path-exists';

describe('cloneEnv', () => {

  test('duplicates the current environemt variables', () => {
    const anxEnv = cloneEnv();
    anxEnv['variableName'] = 'stringValue';

    expect(anxEnv).toMatchObject(process.env);
    expect(anxEnv).toHaveProperty('variableName', 'stringValue');
    expect(process.env).not.toHaveProperty('variableName');
  });

});

describe('createDirectory, deleteDirectory, and pathExists', () => {

  test('creates and deletes a directory', async () => {
    const repositoryPath = await createDirectory();
    expect(await pathExists(repositoryPath)).toBe(true);
    await deleteDirectory(repositoryPath);
    expect(await pathExists(repositoryPath)).toBe(false);
  });

});
