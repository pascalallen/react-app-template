import React, { useEffect, useState } from 'react';
import HttpStatus from 'http-status-codes';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { ReduxThunkDispatch } from '@/types/redux';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { routerPath, defaultUserRedirect } from '@/router/common';
import { AnyObject } from '@/types/common';
import { appErrorTypes } from '@/constants/errors';
import systemApi from '@/api/systemApi';
import validator from '@/lib/validator/validator';
import userActions from '@/redux/user/userActions';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Logo from '@/components/Logo/Logo';
import Form from '@/components/Form/Form';
import InputText from '@/components/Form/InputText';
import Checkbox from '@/components/Form/Checkbox';
import ContactUsModal from '@/components/ContactUsModal/ContactUsModal';

type Props = {
  dispatch: ReduxThunkDispatch;
};

type FormValues = {
  email: string;
  password: string;
  remember_me: boolean;
};

const initialFormValues: FormValues = {
  email: '',
  password: '',
  remember_me: false
};

type InitialState = {
  validationRules: AnyObject;
  errors: {
    email: string;
    password: string;
    status: number;
  };
  showContactModal: boolean;
};

const initialState: InitialState = {
  validationRules: {},
  errors: {
    email: '',
    password: '',
    status: 0
  },
  showContactModal: false
};

const Login = (props: Props) => {
  const { dispatch } = props;
  const history = useHistory();
  const formName = 'login';
  const [validationRules, setValidationRules] = useState(initialState.validationRules);
  const [serverErrors, setServerErrors] = useState(initialState.errors);
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
      await dispatch(userActions.login(params));
      await defaultUserRedirect(history);
    } catch (error) {
      if (error.type === appErrorTypes.API_ERROR) {
        switch (error.status) {
          case HttpStatus.BAD_REQUEST:
            setServerErrors({
              ...initialState.errors,
              email: error.data.email || '',
              password: error.data.password || ''
            });
            return;
          case HttpStatus.UNAUTHORIZED:
            setServerErrors({ ...initialState.errors, status: error.status });
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
    initialValues: initialFormValues,
    validate: validator.makeValidate(validationRules),
    onSubmit: submitForm,
    validateOnBlur: true,
    validateOnChange: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => formik.handleChange(event);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    formik.setStatus(undefined);
    setServerErrors(initialState.errors);
    formik.handleBlur(event);
  };

  const getEmailInputProps = () => {
    let error = '';
    if (formik.touched.email && formik.errors.email) {
      error = formik.errors.email;
    }
    if (serverErrors.email !== '') {
      error = serverErrors.email;
    }

    let required = false;
    if (validationRules['email']) {
      required = validationRules['email'].reduce((required: boolean, rule: { type: string }) => {
        if (rule.type === 'Required') {
          return true;
        }
        return required;
      }, false);
    }

    return {
      errorMessage: error,
      isValid: !error && serverErrors.status !== HttpStatus.UNAUTHORIZED,
      isRequired: required
    };
  };

  const getPasswordInputProps = () => {
    let error = '';
    if (formik.touched.password && formik.errors.password) {
      error = formik.errors.password;
    }
    if (serverErrors.password !== '') {
      error = serverErrors.password;
    }
    if (serverErrors.status === HttpStatus.UNAUTHORIZED) {
      error = 'Email does not exist or password is invalid';
    }

    let required = false;
    if (validationRules['password']) {
      required = validationRules['password'].reduce((required: boolean, rule: { type: string }) => {
        if (rule.type === 'Required') {
          return true;
        }
        return required;
      }, false);
    }

    return {
      errorMessage: error,
      isValid: !error,
      isRequired: required
    };
  };

  const emailInputProps = getEmailInputProps();
  const passwordInputProps = getPasswordInputProps();

  const onToggleContactModal = (): void => {
    setShowContactModal(!showContactModal);
  };

  return (
    <PageContainer name="login">
      {showContactModal && <ContactUsModal show={showContactModal} onClose={onToggleContactModal} />}
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <Logo />
          </div>
        </div>
      </div>
      <div id="login-form-container" className="login-form-container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h4 id="login-form-header" className="login-form-header text-center">
              Login to faculty
            </h4>
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
              <Link
                id="forgot-password-link"
                className="link float-right forgot-password-link pr-0 pt-1"
                tabIndex={4}
                to={{
                  pathname: '/request-reset',
                  search: `?email=${formik.values.email}`
                }}>
                Forgot password?
              </Link>
              <InputText
                formName={formName}
                name="password"
                type="password"
                label="Password"
                tabIndex={2}
                value={formik.values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required={passwordInputProps.isRequired}
                isValid={passwordInputProps.isValid}
                error={passwordInputProps.errorMessage}
              />
              <Checkbox
                formName={formName}
                name="remember_me"
                label="Remember me"
                tabIndex={3}
                checked={formik.values.remember_me}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isValid={true}
              />
              <div className="text-center">
                <button
                  id="login-form-submit"
                  className="btn btn-primary login-form-submit"
                  type="submit"
                  tabIndex={5}
                  disabled={formik.isSubmitting}>
                  Login
                </button>
              </div>
            </Form>
            <div id="login-form-help" className="text-center login-form-help">
              Need help logging in?{' '}
              <a className="link contact-us-link" onClick={onToggleContactModal} tabIndex={6}>
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default connect(null, mapDispatchToProps)(Login);
