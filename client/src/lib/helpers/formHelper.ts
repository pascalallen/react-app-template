import { FormikValues, FormikState } from 'formik';
import { AnyObject } from '@/types/common';

type InputProps = {
  errorMessage: string;
  isValid: boolean;
  isRequired: boolean;
};

export const getInputProps = (
  fieldName: string,
  formik: FormikState<FormikValues>,
  serverErrors: AnyObject,
  validationRules: AnyObject
): InputProps => {
  let error: any = '';

  if (formik.touched[fieldName] && formik.errors[fieldName]) {
    error = formik.errors[fieldName];
  }

  if (serverErrors[fieldName] !== '') {
    error = serverErrors[fieldName];
  }

  let required = false;
  if (validationRules[fieldName]) {
    required = validationRules[fieldName].reduce((required: boolean, rule: { type: string }) => {
      if (rule.type === 'Required') {
        return true;
      }
      return required;
    }, false);
  }

  return {
    errorMessage: error,
    isValid: !error,
    isRequired: required
  };
};

export default Object.freeze({
  getInputProps
});
