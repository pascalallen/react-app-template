import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

export const notificationTypes = {
  SUCCESS: 'success',
  ERROR: 'error'
};

type Props = {
  id?: string;
  className?: string;
  show: boolean;
  type: string;
  message?: string;
  timeOut?: number; // time in ms
  onTimeout?: () => void;
};

let displayTimeout: NodeJS.Timeout;

const Notification = (props: Props) => {
  const { id, className, show, type, message = '', timeOut = 0, onTimeout = () => {} } = props;

  const [display, setDisplay] = useState(props.show);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setDisplay(show);
      clearTimeout(displayTimeout);
      if (timeOut && show) {
        displayTimeout = setTimeout(() => {
          setDisplay(false);
          onTimeout();
        }, timeOut);
      }
    }

    return () => {
      mounted = false;
    };
  }, [show]);

  return display ? (
    <div id={id} className={classnames('border border-light rounded w-100 notification-container', className)}>
      <div className="notification">
        <span
          className={classnames(
            'fas',
            'font-size-md',
            type === notificationTypes.SUCCESS ? 'fa-check-circle' : '',
            type === notificationTypes.ERROR ? 'fa-exclamation-circle' : ''
          )}
        />
        <span
          id="register-institution-form-notification"
          className="register-institution-form-notification d-inline-block py-3">
          {message}
        </span>
      </div>
    </div>
  ) : (
    <div className={classnames('notification-container', className)} />
  );
};

export default Notification;
