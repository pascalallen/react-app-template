import React from 'react';
import { Modal } from 'react-bootstrap';

type Props = {
  show: boolean;
  onClose: () => void;
};

const ContactUsModal = (props: Props) => {
  const { show, onClose } = props;

  return (
    <Modal className="contact-us-modal" show={show} onHide={onClose}>
      <Modal.Header className="border-0" closeButton />
      <Modal.Body className="text-center mb-5">
        <h4 className="mb-3">Contact Us</h4>
        <p className="modal-body-caption">
          Our team is here to help address any issues you may have in your experience.
        </p>
        <p className="mt-4">
          <strong>Email:</strong>{' '}
          <a className="link" href="mailto:help@onlinemeded.org">
            help@onlinemeded.org
          </a>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUsModal;
