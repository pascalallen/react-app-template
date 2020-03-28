import React, { useState } from 'react';
import moment from 'moment';
import envHelper from '@/lib/helpers/envHelper';
import ContactUsModal from '@/components/ContactUsModal/ContactUsModal';

const initialState: {
  showContactModal: boolean;
} = {
  showContactModal: false
};

const Footer = () => {
  const currentYear = moment().format('YYYY');
  const mainBaseUrl = envHelper.getEnv(envHelper.envKeys.MAIN_BASE_URL);
  const [showContactModal, setShowContactModal] = useState(initialState.showContactModal);

  const onToggleContactModal = (): void => {
    setShowContactModal(!showContactModal);
  };

  return (
    <div
      id="footer-container"
      className="container-fluid footer-container border-top border-light text-muted text-center font-size-sm">
      {showContactModal && <ContactUsModal show={showContactModal} onClose={onToggleContactModal} />}
      <div className="row footer-links-row justify-content-center">
        <div className="col-auto footer-link-col">
          <a id="footer-contact-us-link" className="link footer-link" onClick={onToggleContactModal}>
            Contact Us
          </a>
        </div>
        <div className="col-auto footer-link-col">
          <a
            id="footer-terms-of-service-link"
            className="link footer-link"
            href={mainBaseUrl ? `${mainBaseUrl}/terms-of-service` : '#'}
            target="_blank"
            rel="noopener noreferrer">
            Terms of Service
          </a>
        </div>
        <div className="col-auto footer-link-col">
          <a
            id="footer-privacy-policy-link"
            className="link footer-link"
            href={mainBaseUrl ? `${mainBaseUrl}/privacy` : '#'}
            target="_blank"
            rel="noopener noreferrer">
            Privacy Policy
          </a>
        </div>
        <div className="col-auto footer-link-col">
          <a
            id="footer-help-link"
            className="link footer-link"
            href="https://help.onlinemeded.org/"
            target="_blank"
            rel="noopener noreferrer">
            Help
          </a>
        </div>
      </div>
      <div className="row footer-disclaimer-row">
        <div className="col">
          &copy; {currentYear} OnlineMedEd. All rights reserved.
          <br />
          This site is purely for educational purposes; we do not diagnose, treat, or offer patient-specific advice.
        </div>
      </div>
    </div>
  );
};

export default Footer;
