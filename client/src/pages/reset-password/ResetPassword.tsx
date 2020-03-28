import React, { useEffect, useState } from 'react';
import HttpStatus from 'http-status-codes';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { ReduxThunkDispatch } from '@/types/redux';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { routerPath, defaultUserRedirect } from '@/router/common';
import { useMatch } from '@/lib/customHooks';
import { appErrorTypes } from '@/constants/errors';
import formHelper from '@/lib/helpers/formHelper';
import systemApi from '@/api/systemApi';
import validator from '@/lib/validator/validator';
import userActions from '@/redux/user/userActions';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Logo from '@/components/Logo/Logo';
import Form from '@/components/Form/Form';
import InputText from '@/components/Form/InputText';
import ContactUsModal from '@/components/ContactUsModal/ContactUsModal';

type Props = {
  dispatch: ReduxThunkDispatch;
};

const initialErrors = {
  token: '',
  password: '',
  confirm_password: '',
  status: 0
};

const initialState: {
  showContactModal: boolean;
} = {
  showContactModal: false
};

const ResetPassword = (props: Props) => {
  const match = useMatch();
  const history = useHistory();
  const token = match.params.token || '';
  const { dispatch } = props;
  const [serverErrors, setServerErrors] = useState(initialErrors);
  const [validationRules, setValidationRules] = useState({});
  const formName = 'reset-password';
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
      mounted = true;
    };
  }, []);

  const submitForm = async (passwordReset: {
    token: string;
    password: string;
    confirm_password: string;
  }): Promise<void> => {
    try {
      await dispatch(userActions.resetPassword(passwordReset));
      await defaultUserRedirect(history);
    } catch (error) {
      if (error.type === appErrorTypes.API_ERROR) {
        switch (error.status) {
          case HttpStatus.BAD_REQUEST:
            setServerErrors({
              ...initialErrors,
              token: error.data.token || '',
              password: error.data.password || '',
              confirm_password: error.data.confirm_password || ''
            });
            return;
          case HttpStatus.UNAUTHORIZED:
            setServerErrors({ ...initialErrors, status: error.status });
            return;
          case HttpStatus.FORBIDDEN:
            history.push(routerPath.FORBIDDEN);
            return;
          default:
            history.push(routerPath.SERVER_ERROR);
            return;
        }
      }
      history.push(routerPath.SERVER_ERROR);
    }
  };

  const formik = useFormik({
    initialValues: {
      token: token,
      password: '',
      confirm_password: ''
    },
    validate: validator.makeValidate(validationRules),
    onSubmit: submitForm,
    validateOnBlur: true,
    validateOnChange: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setServerErrors(initialErrors);
    formik.handleBlur(event);
  };

  const tokenInputProps = formHelper.getInputProps('token', formik, serverErrors, validationRules);
  const passwordInputProps = formHelper.getInputProps('password', formik, serverErrors, validationRules);
  const confirmPasswordInputProps = formHelper.getInputProps('confirm_password', formik, serverErrors, validationRules);

  const onToggleContactModal = (): void => {
    setShowContactModal(!showContactModal);
  };

  return (
    <PageContainer name="reset-password">
      {showContactModal && <ContactUsModal show={showContactModal} onClose={onToggleContactModal} />}
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <Logo />
          </div>
        </div>
      </div>
      <div id="reset-password-from-container" className="reset-password-form-container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h4 id="reset-password-form-header" className="reset-password-form-header text-center">
              Reset your password
            </h4>
            {tokenInputProps.errorMessage || serverErrors.status === HttpStatus.UNAUTHORIZED ? (
              <div
                id="reset-password-form-token-error"
                className="reset-password-form-token-error alert alert-danger fade show"
                role="alert">
                Your reset password link is not valid
              </div>
            ) : null}
            <Form name={formName} handleSubmit={formik.handleSubmit}>
              <input
                id="reset-password-form-token"
                type="hidden"
                name="token"
                value={formik.values.token}
                onChange={handleChange}
              />
              <InputText
                formName={formName}
                name="password"
                type="password"
                label="Enter Password"
                tabIndex={1}
                value={formik.values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required={passwordInputProps.isRequired}
                isValid={passwordInputProps.isValid}
                error={passwordInputProps.errorMessage}
                tip="8 characters minimum."
              />
              <InputText
                formName={formName}
                name="confirm_password"
                type="password"
                label="Confirm Password"
                tabIndex={2}
                value={formik.values.confirm_password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required={confirmPasswordInputProps.isRequired}
                isValid={confirmPasswordInputProps.isValid}
                error={confirmPasswordInputProps.errorMessage}
              />
              <div className="text-center">
                <button
                  id="reset-password-form-submit"
                  className="btn btn-primary reset-password-form-submit"
                  type="submit"
                  tabIndex={3}
                  disabled={formik.isSubmitting}>
                  Reset Password
                </button>
                <div id="reset-password-help" className="text-center reset-password-help">
                  Need help logging in?{' '}
                  <a className="link contact-us-link" onClick={onToggleContactModal} tabIndex={4}>
                    Contact us
                  </a>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default connect(null, mapDispatchToProps)(ResetPassword);
