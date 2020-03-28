import React from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useMatch } from '@/lib/customHooks';
import { routerPath } from '@/router/common';

type Props = {
  show?: boolean;
  theme?: {
    container?: string;
  };
};

const NavigateBack = (props: Props) => {
  const history = useHistory();
  const { path } = useMatch();

  const { show = true, theme } = props;

  const handleGoBack = (): void => {
    switch (path) {
      case routerPath.INSTITUTION_STUDENT: {
        // TODO: change to `history.push(`${routerPath.INSTITUTIONS}/${params.institutionId}/students`)` when route exists
        return history.goBack();
      }
      default: {
        // TODO: change to `history.push(`${routerPath.INSTITUTIONS}/${params.institutionId}/students`)` when route exists
        return history.goBack();
      }
    }
  };

  return (
    <div className={classnames('navigate-back-container', theme?.container)}>
      {show ? (
        <button
          className="btn navigate-back-btn align-items-center justify-content-center cursor-pointer h-100 p-0"
          onClick={handleGoBack}>
          <span className="fas fa-arrow-left fa-1x font-size-md" />
        </button>
      ) : null}
    </div>
  );
};

export default NavigateBack;
