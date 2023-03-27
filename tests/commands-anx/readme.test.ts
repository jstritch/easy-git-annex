import { deleteDirectory } from '../helpers';
import { runExampleClick } from './readme';

describe('example', () => {

  test('runs successfully', async () => {

    let repositoryPath = '';

    const click = jest.fn(async () => { repositoryPath = await runExampleClick(); });

    await click();

    expect(click).toHaveReturned();

    await deleteDirectory(repositoryPath, true);
  });

});
