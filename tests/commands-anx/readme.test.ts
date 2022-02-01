import { runExampleClick } from './readme';

describe('example', () => {

  test('runs successfully', async () => {

    const click = jest.fn(async () => { await runExampleClick(); });

    await click();

    expect(click).toHaveReturned();
  });

});
