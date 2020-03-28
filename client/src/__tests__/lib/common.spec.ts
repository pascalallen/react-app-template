import { hashStrArray, queryStringify, removeEmptyQueryParams } from '@/lib/common';
// mocked constants
const mockUrl = 'https://mercure_test_url';
// mocked modules
jest.mock('@/lib/helpers/envHelper', () => ({
  getEnv: jest
    .fn()
    // @1
    .mockImplementationOnce(() => mockUrl),
  envKeys: {
    MERCURE_PUBLISH_URL: 'MERCURE_PUBLISH_URL'
  }
}));
describe('common', () => {
  // hashStrArray tests
  it('hashStrArray should return an object with array elements as key value pairs', () => {
    expect(hashStrArray(['VALUE1', 'VALUE2'])).toEqual({
      VALUE1: 'VALUE1',
      VALUE2: 'VALUE2'
    });
  });
  it('hashStrArray should return an empty object if an empty array is passed in', () => {
    expect(hashStrArray([])).toEqual({});
  });
  // queryStringify tests
  it('queryStringify should return a query string of the key/value pairs found in a object', () => {
    expect(queryStringify({ test: 'test', number: 1 })).toBe('?test=test&number=1');
  });
  it('queryStringify should return an empty string if an empty object is passed in', () => {
    expect(queryStringify({})).toEqual('');
  });
  // removeEmptyQueryParams tests
  it('removeEmptyQueryParams should not modify an object with no empty keys', () => {
    const testObj = { a: '1', b: '2', c: '3' };
    removeEmptyQueryParams(testObj);
    expect(testObj).toEqual(testObj);
  });
  it('removeEmptyQueryParams should remove keys that are empty', () => {
    const testObj = { a: '1', b: '', c: 1, d: 0, e: null, f: undefined, g: {}, h: [], i: () => {} };
    removeEmptyQueryParams(testObj);
    expect(testObj).toEqual({ a: '1', c: 1, d: 0 });
  });
  // subscribeMercureEventSource tests
  it('subscribeMercureEventSource NOT TESTED ', () => {
    // * TODO: find a way to expose EventSource class to test environment in order to be able to test this function
  });
});
