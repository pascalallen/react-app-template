import React from 'react';
import classnames from 'classnames';

type Props = {
  formName: string;
  name: string;
  type: 'text' | 'password' | 'email' | 'color' | 'date' | 'number' | 'search' | 'tel' | 'file' | 'url';
  label?: string;
  isValid?: boolean;
  placeholder?: string;
  value?: string;
  required?: boolean;
  tabIndex?: number;
  error?: string;
  tip?: string;
  theme?: {
    label?: string;
    input?: string;
    error?: string;
    tipContainer?: string;
    tip?: string;
  };
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const InputText = (props: Props) => {
  const {
    formName,
    name,
    type,
    // optional props
    label = '',
    isValid = true,
    placeholder = '',
    value = '',
    required = false,
    tabIndex = 0,
    error = '',
    tip = '',
    theme = {
      label: '',
      input: '',
      error: '',
      tipContainer: '',
      tip: ''
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
    <div className="form-group">
      {label && (
        <label htmlFor={id} className={classnames('form-label', `${id}-label`, theme?.label)}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={classnames(isValid ? 'form-control' : 'form-control is-invalid', `${id}-input`, theme?.input)}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        tabIndex={tabIndex}
      />
      {error ? (
        <div id={`${id}-error`} className={classnames('invalid-feedback', `${id}-error`, theme?.error)}>
          {error}
        </div>
      ) : null}
      {!error && tip ? (
        <div
          id={`${id}-tip-container`}
          className={classnames('form-tip-container', `${id}-tip-container`, theme?.tipContainer)}>
          <span className={classnames('form-tip-text', `${id}-tip-text`, theme?.tip)}>{tip}</span>
        </div>
      ) : null}
    </div>
  );
};

export default InputText;
