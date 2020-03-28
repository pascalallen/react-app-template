import React from 'react';
import classnames from 'classnames';

type Props = {
  formName: string;
  name: string;
  isValid: boolean;
  checked?: boolean;
  label?: string;
  inline?: boolean;
  required?: boolean;
  tabIndex?: number;
  error?: string;
  theme?: {
    checkbox?: string;
    label?: string;
    error?: string;
  };
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Checkbox = (props: Props) => {
  const {
    formName,
    name,
    isValid,
    // optional props
    checked = false,
    label = '',
    inline = true,
    required = false,
    tabIndex = 0,
    error = '',
    theme = {
      checkbox: '',
      label: '',
      error: ''
    },
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
    },
    handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault();
    }
  } = props;

  const id = `${formName}-${name.replace('_', '-')}`;

  return (
    <div className={inline ? 'form-check form-check-inline' : 'form-check'}>
      <input
        id={id}
        type="checkbox"
        className={classnames(
          isValid ? 'form-check-input' : 'form-check-input is-invalid',
          `${id}-checkbox`,
          theme?.checkbox
        )}
        name={name}
        checked={checked}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        tabIndex={tabIndex}
      />
      {label && (
        <label htmlFor={id} className={classnames('form-check-label', `${id}-label`, theme?.label)}>
          <span className="text-muted">{label}</span>
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      {error ? (
        <div id={`${id}-error`} className={classnames('invalid-feedback', `${id}-error`, theme?.error)}>
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default Checkbox;
