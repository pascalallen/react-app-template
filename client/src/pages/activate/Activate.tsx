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

type Props = {
  dispatch: ReduxThunkDispatch;
};

const initialErrors = {
  token: '',
  password: '',
  confirm_password: '',
  status: 0
};

const Activate = (props: Props) => {
  const match = useMatch();
  const history = useHistory();
  const token = match.params.token || '';
  const { dispatch } = props;
  const [serverErrors, setServerErrors] = useState(initialErrors);
  const [validationRules, setValidationRules] = useState({});
  const formName = 'activate';

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

  const submitForm = async (passwordActivate: {
    token: string;
    password: string;
    confirm_password: string;
  }): Promise<void> => {
    try {
      await dispatch(userActions.activate(passwordActivate));
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => formik.handleChange(event);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setServerErrors(initialErrors);
    formik.handleBlur(event);
  };

  const tokenInputProps = formHelper.getInputProps('token', formik, serverErrors, validationRules);
  const passwordInputProps = formHelper.getInputProps('password', formik, serverErrors, validationRules);
  const confirmPasswordInputProps = formHelper.getInputProps('confirm_password', formik, serverErrors, validationRules);

  return (
    <PageContainer name="activate">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <Logo />
          </div>
        </div>
      </div>
      <div id="activate-form-container" className="activate-form-container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h4 id="activate-form-header" className="activate-form-header text-center">
              Create your password
            </h4>
            {tokenInputProps.errorMessage || serverErrors.status === HttpStatus.UNAUTHORIZED ? (
              <div
                id="activate-form-token-error"
                className="activate-form-token-error alert alert-danger fade show"
                role="alert">
                Your activation link is not valid
              </div>
            ) : null}
            <Form name={formName} handleSubmit={formik.handleSubmit}>
              <input
                id="activate-form-token"
                type="hidden"
                name="token"
                value={formik.values.token}
                onChange={handleChange}
              />
              <InputText
                formName={formName}
                name="password"
                label="Enter Password"
                type="password"
                tabIndex={1}
                required={passwordInputProps.isRequired}
                value={formik.values.password}
                isValid={passwordInputProps.isValid}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={passwordInputProps.errorMessage}
                tip="8 characters minimum."
              />
              <InputText
                formName={formName}
                name="confirm_password"
                label="Confirm Password"
                type="password"
                tabIndex={2}
                required={confirmPasswordInputProps.isRequired}
                value={formik.values.confirm_password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isValid={confirmPasswordInputProps.isValid}
                error={confirmPasswordInputProps.errorMessage}
              />
              <div className="text-center">
                <button
                  id="activate-form-submit"
                  className="btn btn-primary activate-form-submit p-0"
                  type="submit"
                  tabIndex={3}
                  disabled={formik.isSubmitting}>
                  Create Password
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default connect(null, mapDispatchToProps)(Activate);
