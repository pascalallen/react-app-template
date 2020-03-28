import React, { useEffect, useState } from 'react';
import HttpStatus from 'http-status-codes';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '@/lib/customHooks';
import { routerPath } from '@/router/common';
import { appErrorTypes } from '@/constants/errors';
import formHelper from '@/lib/helpers/formHelper';
import authApi from '@/api/authApi';
import systemApi from '@/api/systemApi';
import validator from '@/lib/validator/validator';
import ContactUsModal from '@/components/ContactUsModal/ContactUsModal';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Logo from '@/components/Logo/Logo';
import Form from '@/components/Form/Form';
import InputText from '@/components/Form/InputText';

type FormValues = {
  email: string;
};

const initialErrors = {
  email: '',
  status: 0
};

const initialState: {
  showContactModal: boolean;
} = {
  showContactModal: false
};

const RequestReset = () => {
  const history = useHistory();
  const query = useQuery();
  const emailParam = query.get('email');
  const email = emailParam ? emailParam.replace(' ', '+') : '';
  const [serverErrors, setServerErrors] = useState(initialErrors);
  const [validationRules, setValidationRules] = useState({});
  const formName = 'request-reset';
  const [showContactModal, setShowContactModal] = useState(initialState.showContactModal);

  useEffect(() => {
    let mounted = true;

    const fetchValidations = async () => {
      try {
        const res = await systemApi.getValidations(formName);

        if (mounted) {
          setValidationRules(res.data);
        }
      } catch (error) {
        /* Do nothing server will validate */
      }
    };

    fetchValidations();

    return () => {
      mounted = false;
    };
  }, []);

  const submitForm = async (params: FormValues): Promise<void> => {
    try {
      await authApi.requestPasswordReset(params);
      history.push({
        pathname: routerPath.REQUEST_RESET_COMPLETE,
        search: `?email=${params.email}`
      });
    } catch (error) {
      if (error.type === appErrorTypes.API_ERROR) {
        if (error.status === HttpStatus.BAD_REQUEST) {
          setServerErrors({
            ...initialErrors,
            email: error.data.email || ''
          });
          return;
        }
      }
      history.push(routerPath.SERVER_ERROR);
    }
  };

  const formik = useFormik({
    initialValues: { email },
    validate: validator.makeValidate(validationRules),
    onSubmit: submitForm,
    validateOnBlur: true,
    validateOnChange: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => formik.handleChange(event);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    formik.setStatus(undefined);
    setServerErrors(initialErrors);
    formik.handleBlur(event);
  };

  const emailInputProps = formHelper.getInputProps('email', formik, serverErrors, validationRules);

  const onToggleContactModal = (): void => {
    setShowContactModal(!showContactModal);
  };

  return (
    <PageContainer name="request-reset">
      {showContactModal && <ContactUsModal show={showContactModal} onClose={onToggleContactModal} />}
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <Logo />
          </div>
        </div>
      </div>
      <div id="request-reset-form-container" className="request-reset-form-container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h4 id="request-reset-form-header" className="request-reset-form-header text-center">
              Forgot your password?
            </h4>
            <p className="text-center request-reset-form-caption">
              Please enter the email address you used to sign up and we’ll send you a password reset link.
            </p>
            <Form name={formName} handleSubmit={formik.handleSubmit}>
              <InputText
                formName={formName}
                name="email"
                type="email"
                label="Email"
                placeholder="mail@email.com"
                tabIndex={1}
                value={formik.values.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required={emailInputProps.isRequired}
                isValid={emailInputProps.isValid}
                error={emailInputProps.errorMessage}
              />
              <div className="text-center">
                <button
                  id="request-reset-form-submit"
                  className="btn btn-primary request-reset-form-submit"
                  type="submit"
                  tabIndex={2}
                  disabled={formik.isSubmitting}>
                  Send
                </button>
              </div>
            </Form>
            <p id="request-reset-form-back" className="text-center request-reset-form-back">
              <Link className="link" to={{ pathname: routerPath.LOGIN }} tabIndex={3}>
                Back to login
              </Link>
            </p>
            <div id="request-reset-help" className="text-center request-reset-help">
              Need help logging in?{' '}
              <a className="link contact-us-link" onClick={onToggleContactModal} tabIndex={4}>
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RequestReset;
