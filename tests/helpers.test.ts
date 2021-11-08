import { cloneEnv } from './helpers';

describe('cloneEnv', () => {

  test('correctly duplicates the current environemt variables', () => {
    const anxEnv = cloneEnv();
    anxEnv['variableName'] = 'stringValue';

    expect(anxEnv).toMatchObject(process.env);
    expect(anxEnv).toHaveProperty('variableName', 'stringValue');
    expect(process.env).not.toHaveProperty('variableName');
  });

});
