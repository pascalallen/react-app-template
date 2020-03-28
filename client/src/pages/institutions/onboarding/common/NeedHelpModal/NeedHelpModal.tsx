import React, { useState } from 'react';
import { Accordion, Card, Modal } from 'react-bootstrap';

type Props = {
  show: boolean;
  onClose: () => void;
};

const initialState: {
  openQuestions: boolean[];
} = {
  openQuestions: [false, false]
};

const NeedHelpModal = (props: Props) => {
  const { show, onClose } = props;
  const [openQuestions, setOpenQuestions] = useState(initialState.openQuestions);

  const handleOpenQuestion = (questionIdx: number): void => {
    const updatedOpenQuestions = openQuestions.map((question, idx) => {
      if (idx === questionIdx) {
        return !openQuestions[idx];
      }
      return false;
    });
    setOpenQuestions(updatedOpenQuestions);
  };

  return (
    <Modal id="need-help-modal" className="need-help-modal" show={show} onHide={onClose}>
      <Modal.Header closeButton />
      <Modal.Body className="mb-3">
        <h3 className="text-center mb-3">Need Help?</h3>
        <div className="need-help-accordion-container">
          <Accordion id="need-help-accordion" className="need-help-accordion">
            <Card className="need-help-accordion-card rounded-sm cursor-pointer">
              <Accordion.Toggle
                onClick={() => handleOpenQuestion(0)}
                as={Card.Header}
                eventKey="question-one"
                className="need-help-accordion-toggle font-size-md font-weight-bold">
                How do I upload my students into faculty?
                {!openQuestions[0] ? (
                  <span className="fas fa-chevron-down float-right font-size-sm" />
                ) : (
                  <span className="fas fa-chevron-up float-right font-size-sm" />
                )}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="question-one" className="need-help-accordion-collapse">
                <Card.Body>
                  <div className="upload-step">
                    <strong>Step 1:</strong> Download our student template zip file.
                  </div>
                  <div className="upload-step">
                    <strong>Step 2:</strong> Review our spreadsheet template PDF guide.
                  </div>
                  <div className="upload-step">
                    <strong>Step 3:</strong> Use our student template CSV file to enter your student’s first name, last
                    name, email, and class year.
                  </div>
                  <div className="upload-step">
                    <strong>Step 4:</strong> Upload your completed CSV file into Faculty Mode.
                  </div>
                  <div className="upload-step">
                    <strong>Step 5:</strong> You&apos;re all set to start managing your students. If you experience any
                    issues, please contact us at{' '}
                    <a className="link" href="mailto:help@onlinemeded.org">
                      help@onlinemed.org
                    </a>
                    .
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="need-help-accordion-card">
              <Accordion.Toggle
                onClick={() => handleOpenQuestion(1)}
                as={Card.Header}
                eventKey="question-two"
                className="need-help-accordion-toggle font-size-md font-weight-bold">
                How to prevent errors on your spreadsheet.
                {!openQuestions[1] ? (
                  <i className="fas fa-chevron-down float-right" />
                ) : (
                  <i className="fas fa-chevron-up float-right" />
                )}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="question-two" className="need-help-accordion-collapse">
                <Card.Body>
                  <strong>First & Last Name Column:</strong>
                  <ul>
                    <li>Make sure to enter both the first and last names of every student.</li>
                  </ul>
                  <strong>Class Year Column:</strong>
                  <ul>
                    <li>Use numbers only.</li>
                  </ul>
                  <strong>Email Column:</strong>
                  <ul>
                    <li>Only use a valid email address with prefix and domain.</li>
                  </ul>
                  <strong>Contract Parameters:</strong>
                  <ul>
                    <li>Enter the exact amount of students you signed up for.</li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <p className="text-center modal-body-caption">
          Our team is here to help address any issues you may have in your experience.
        </p>
        <p className="text-center mt-4">
          <strong>Email:</strong>{' '}
          <a className="link" href="mailto:help@onlinemeded.org">
            help@onlinemeded.org
          </a>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default NeedHelpModal;
