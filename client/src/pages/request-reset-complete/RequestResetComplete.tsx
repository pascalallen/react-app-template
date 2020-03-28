import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@/lib/customHooks';
import { routerPath } from '@/router/common';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Logo from '@/components/Logo/Logo';
import ContactUsModal from '@/components/ContactUsModal/ContactUsModal';

const initialState: {
  showContactModal: boolean;
} = {
  showContactModal: false
};

const RequestResetComplete = () => {
  const query = useQuery();
  const emailParam = query.get('email');
  const email = emailParam ? emailParam.replace(' ', '+') : 'the email address you provided';
  const [showContactModal, setShowContactModal] = useState(initialState.showContactModal);

  const onToggleContactModal = (): void => {
    setShowContactModal(!showContactModal);
  };

  return (
    <PageContainer name="request-reset-complete">
      {showContactModal && <ContactUsModal show={showContactModal} onClose={onToggleContactModal} />}
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <Logo />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h4 id="request-reset-complete-header" className="request-reset-complete-header text-center mt-5">
            Email Sent
          </h4>
          <p id="caption-top" className="text-center caption-top">
            An email with instructions on how to reset your password has been sent to:
          </p>
          <p id="caption-email" className="text-center caption-email">
            <strong>{email}</strong>
          </p>
          <p id="caption-bottom" className="text-center caption-bottom">
            Check your spam or junk folder if you don’t see the email in your inbox.
          </p>
          <div id="request-reset-complete-help" className="text-center request-reset-complete-help">
            Need help logging in?{' '}
            <a className="link contact-us-link" onClick={onToggleContactModal} tabIndex={1}>
              Contact us
            </a>
          </div>
          <div className="text-center back-to-login">
            <Link className="link" to={{ pathname: routerPath.LOGIN }}>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RequestResetComplete;
