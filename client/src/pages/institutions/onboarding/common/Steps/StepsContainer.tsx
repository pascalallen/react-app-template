import _ from 'lodash';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode[];
};

const StepsContainer = (props: Props) => {
  const { children } = props;
  return (
    <div className="row steps-container">
      {_.map(children, (child, idx) => {
        if (_.size(children) === idx - 1) {
          return <React.Fragment key={idx}>{child}</React.Fragment>;
        }
        return (
          <React.Fragment key={idx}>
            {child}
            <span className="step-divider" />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepsContainer;
