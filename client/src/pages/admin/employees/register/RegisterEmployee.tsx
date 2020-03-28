import React, { useEffect, useState } from 'react';
import HttpStatus from 'http-status-codes';
import { useHistory } from 'react-router-dom';
import { useFormik, FormikHelpers } from 'formik';
import { routerPath } from '@/router/common';
import { appErrorTypes } from '@/constants/errors';
import formHelper from '@/lib/helpers/formHelper';
import systemApi from '@/api/systemApi';
import validator from '@/lib/validator/validator';
import employeeApi from '@/api/employeeApi';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Notification, { notificationTypes } from '@/components/Form/Notification/Notification';
import Logo from '@/components/Logo/Logo';
import Form from '@/components/Form/Form';
import InputText from '@/components/Form/InputText';

type FormValues = { first_name: string; last_name: string; email: string };

const initialValues: FormValues = { first_name: '', last_name: '', email: '' };
const initialErrors = { first_name: '', last_name: '', email: '', status: 0 };

const RegisterEmployee = () => {
  const history = useHistory();
  const [validationRules, setValidationRules] = useState({});
  const [serverErrors, setServerErrors] = useState(initialErrors);
  const formName = 'register-employee';

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

  const submitForm = async (employeeData: FormValues, actions: FormikHelpers<FormValues>) => {
    const { setSubmitting, setStatus, resetForm } = actions;
    try {
      await employeeApi.register(employeeData);
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      if (error.type === appErrorTypes.API_ERROR) {
        switch (error.status) {
          case HttpStatus.BAD_REQUEST:
            setServerErrors({
              ...initialErrors,
              first_name: error.data.first_name || '',
              last_name: error.data.last_name || '',
              email: error.data.email || ''
            });
            return;
          case HttpStatus.UNAUTHORIZED:
            history.push(routerPath.LOGIN);
            return;
          case HttpStatus.FORBIDDEN:
            history.push(routerPath.FORBIDDEN);
            return;
          default:
            setStatus({ error: true });
            setSubmitting(false);
            return;
        }
      }
      setStatus({ error: true });
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
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

  const firstNameInputProps = formHelper.getInputProps('first_name', formik, serverErrors, validationRules);
  const lastNameInputProps = formHelper.getInputProps('last_name', formik, serverErrors, validationRules);
  const emailInputProps = formHelper.getInputProps('email', formik, serverErrors, validationRules);

  return (
    <PageContainer name="register-employee">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <Logo />
          </div>
        </div>
      </div>
      <div id="register-employee-form-container" className="register-employee-form-container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h4 id="register-employee-form-header" className="register-employee-form-header text-center">
              Register OME Admin
            </h4>
            <Form name={formName} handleSubmit={formik.handleSubmit}>
              <div className="form-row">
                <div className="col">
                  <InputText
                    formName={formName}
                    name="first_name"
                    type="text"
                    label="First Name"
                    value={formik.values.first_name}
                    tabIndex={1}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    required={firstNameInputProps.isRequired}
                    isValid={firstNameInputProps.isValid}
                    error={firstNameInputProps.errorMessage}
                  />
                </div>
                <div className="col">
                  <InputText
                    formName={formName}
                    name="last_name"
                    type="text"
                    label="Last Name"
                    value={formik.values.last_name}
                    tabIndex={2}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    required={lastNameInputProps.isRequired}
                    isValid={lastNameInputProps.isValid}
                    error={lastNameInputProps.errorMessage}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <InputText
                    formName={formName}
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="mail@email.com"
                    value={formik.values.email}
                    tabIndex={3}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    required={emailInputProps.isRequired}
                    isValid={emailInputProps.isValid}
                    error={emailInputProps.errorMessage}
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  id="register-employee-form-submit"
                  className="btn btn-primary register-employee-form-submit"
                  type="submit"
                  tabIndex={4}
                  disabled={formik.isSubmitting}>
                  Send Activation
                </button>
              </div>
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <Notification
                    id="register-employee-form-notification-container"
                    className="register-employee-form-notification-container"
                    show={!!formik.status}
                    type={formik.status?.success ? notificationTypes.SUCCESS : notificationTypes.ERROR}
                    message={formik.status?.success ? 'Activation email sent' : 'Activation email failed to send'}
                    timeOut={3000}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RegisterEmployee;
