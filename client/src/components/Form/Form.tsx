import React, { ReactNode } from 'react';
import classnames from 'classnames';

type Props = {
  name: string;
  className?: string;
  children?: ReactNode | null;
  autoComplete?: boolean;
  noValidate?: boolean;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form = (props: Props) => {
  const {
    name,
    // optional props
    className = '',
    children = [],
    autoComplete = false,
    noValidate = true,
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }
  } = props;

  const id = `${name.replace('_', '-')}-form`;

  return (
    <form
      id={id}
      className={classnames(id, className)}
      autoComplete={autoComplete ? 'on' : 'off'}
      onSubmit={handleSubmit}
      noValidate={noValidate}>
      {children}
    </form>
  );
};

export default Form;
