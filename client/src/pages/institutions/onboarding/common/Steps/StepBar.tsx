import React from 'react';

type Props = {
  active: boolean;
  checked: boolean;
  text: string;
};

const StepBar = (props: Props) => {
  const { active, checked, text } = props;

  return (
    <div className="col step-bar-container w-100 p-0">
      <div className="top-row d-flex align-items-center justify-content-start overflow-hidden">
        {checked && <span className="fas fa-check-circle font-size-lg" />}
        <span className={`step-bar-title font-size-sm font-weight-bold text-uppercase ${!active && 'text-muted'}`}>
          {text}
        </span>
      </div>
      <div className={`step-bar-line bg-primary rounded mt-2 ${!active && 'bg-muted'}`} />
    </div>
  );
};

export default StepBar;
