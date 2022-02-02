import { cloneEnv, createDirectory, deleteDirectory, pathExists } from './helpers';

describe('cloneEnv', () => {

  test('duplicates the current environemt variables', () => {
    const anxEnv = cloneEnv();
    anxEnv['variableName'] = 'stringValue';

    expect(anxEnv).toMatchObject(process.env);
    expect(anxEnv).toHaveProperty('variableName', 'stringValue');
    expect(process.env).not.toHaveProperty('variableName');
  });

});

describe('createDirectory, deleteDirectory, pathExists', () => {

  test('creates and deletes a directory', async () => {
    const repositoryPath = await createDirectory();

    expect(await pathExists(repositoryPath)).toBe(true);

    await deleteDirectory(repositoryPath);

    expect(await pathExists(repositoryPath)).toBe(false);
  });

});
