import _ from 'lodash';
import formHelper from '@/lib/helpers/formHelper';

describe('formHelper', () => {
  // module tests
  it('formHelper has proper type and keys', () => {
    expect(_.isObject(formHelper)).toBe(true);
    expect(_.keys(formHelper)).toEqual(['getInputProps']);
  });
  //* TODO: Add methods tests
});
