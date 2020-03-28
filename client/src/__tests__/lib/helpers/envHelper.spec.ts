import _ from 'lodash';
import env from '@/constants/env';
import envHelper from '@/lib/helpers/envHelper';

describe('envHelper', () => {
  // module tests
  it('envHelper has proper type and keys', () => {
    expect(_.isObject(envHelper)).toBe(true);
    expect(_.keys(envHelper)).toEqual(['envKeys', 'getEnv']);
  });

  // envKeys tests
  it('envKeys has same keys as env constants', () => {
    expect(envHelper.envKeys).toEqual(env);
  });

  // getEnv Tests
  it('getEnv should return default value if element is not found in the DOM', () => {
    expect(envHelper.getEnv('NOT_PRESENT')).toEqual(null);
  });

  it('getEnv should not return key value if key is not present in ENV', () => {
    // *TODO find a way to attach a dom to test suite with input that holds base64 encoded string
  });

  it('getEnv should return key value if key is present in ENV', () => {
    // *TODO find a way to attach a dom to test suite with input that holds base64 encoded string
  });
});
