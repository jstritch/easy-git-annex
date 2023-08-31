import { deleteDirectory } from '../helpers.ts';
import { jest } from '@jest/globals';
import { runExampleClick } from './readme.ts';

describe('example', () => {

  test('runs successfully', async () => {

    let repositoryPath = '';

    const click = jest.fn(async () => { repositoryPath = await runExampleClick(); });

    await click();

    expect(click).toHaveReturned();

    await deleteDirectory(repositoryPath, true);
  });

});
