import { deleteDirectory } from '../helpers.ts';
import { jest } from '@jest/globals'; // eslint-disable-line node/no-extraneous-import
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
