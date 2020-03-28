//@ts-nocheck
import _ from 'lodash';
import validations from '@/lib/validator/validations';

const makeValidate = rules => {
  const comparisonValidations = ['Equals', 'NotEquals', 'Same', 'NotSame'];

  return data => {
    const errors = {};
    const keys = Object.keys(rules);
    for (const key of keys) {
      const fieldRules = rules[key];
      fieldRules.forEach(rule => {
        const validation = validations[rule.type];
        let valid;
        if (comparisonValidations.includes(rule.type)) {
          const compKey = rule.args[0];
          valid = validation.call(null, data[key], data[compKey]);
        } else {
          valid = validation.call(null, data[key], ...rule.args);
        }
        if (!valid) {
          if (_.isUndefined(errors[key])) {
            errors[key] = rule.error;
          }
        }
      });
    }
    return errors;
  };
};

export default Object.freeze({
  makeValidate
});
