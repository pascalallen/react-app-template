import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import HttpStatus from 'http-status-codes';
import { useHistory } from 'react-router-dom';
import { FormikHelpers, useFormik } from 'formik';
import { SchoolData } from '@/types/data';
import { routerPath } from '@/router/common';
import { appErrorTypes } from '@/constants/errors';
import formHelper from '@/lib/helpers/formHelper';
import validator from '@/lib/validator/validator';
import institutionApi from '@/api/institutionApi';
import systemApi from '@/api/systemApi';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Autocomplete from '@/components/Form/Autocomplete/Autocomplete';
import Notification, { notificationTypes } from '@/components/Form/Notification/Notification';
import Form from '@/components/Form/Form';
import InputText from '@/components/Form/InputText';
import Logo from '@/components/Logo/Logo';

type FormValues = {
  school_id: string;
  max_faculty: string;
  max_students: string;
  first_name: string;
  last_name: string;
  email: string;
};

const initialValues: FormValues = {
  school_id: '',
  max_faculty: '',
  max_students: '',
  first_name: '',
  last_name: '',
  email: ''
};

const initialErrors = {
  school_id: '',
  max_faculty: '',
  max_students: '',
  first_name: '',
  last_name: '',
  email: '',
  status: 0
};

const RegisterInstitution = () => {
  const formName = 'register-institution';
  const history = useHistory();
  const [validationRules, setValidationRules] = useState({});
  const [serverErrors, setServerErrors] = useState(initialErrors);
  const [schoolInputDisplayValue, setSchoolInputDisplayValue] = useState('');
  const [schoolInputSelected, setSchoolInputSelected] = useState(false);

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

  const fetchSchools = async (searchTerm: string): Promise<SchoolData[]> => {
    const emptySchools: SchoolData[] = [];

    if (_.isEmpty(searchTerm)) {
      return emptySchools;
    }

    try {
      const res = await institutionApi.getSchools(searchTerm);
      return res.data ? res.data : emptySchools;
    } catch (error) {
      return emptySchools;
    }
  };

  const submitForm = async (institutionData: FormValues, actions: FormikHelpers<FormValues>): Promise<void> => {
    const { setSubmitting: setFormikSubmitting, setStatus: setFormikStatus, resetForm: resetFormikForm } = actions;
    try {
      await institutionApi.register(institutionData);
      // ** resets all inputs to initial state
      resetFormikForm({});
      setSchoolInputDisplayValue('');
      setSchoolInputSelected(false);
      // **
      setFormikStatus({ success: true });
    } catch (error) {
      if (error.type === appErrorTypes.API_ERROR) {
        switch (error.status) {
          case HttpStatus.BAD_REQUEST:
            setServerErrors({
              ...initialErrors,
              school_id: error.data.school_id || '',
              max_faculty: error.data.max_faculty || '',
              max_students: error.data.max_students || '',
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
            setFormikStatus({ error: true });
            setFormikSubmitting(false);
            return;
        }
      }
      setFormikStatus({ error: true });
      setFormikSubmitting(false);
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

  const schoolIdProps = formHelper.getInputProps('school_id', formik, serverErrors, validationRules);
  const maxFacultyProps = formHelper.getInputProps('max_faculty', formik, serverErrors, validationRules);
  const maxStudentsProps = formHelper.getInputProps('max_students', formik, serverErrors, validationRules);
  const firstNameInputProps = formHelper.getInputProps('first_name', formik, serverErrors, validationRules);
  const lastNameInputProps = formHelper.getInputProps('last_name', formik, serverErrors, validationRules);
  const emailInputProps = formHelper.getInputProps('email', formik, serverErrors, validationRules);

  return (
    <PageContainer name="register-institution">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <Logo />
          </div>
        </div>
      </div>
      <div id="register-institution-form-container" className="register-institution-form-container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h4 id="register-institution-form-header" className="register-institution-form-header text-center">
              Register Institution
            </h4>
            <Form name={formName} handleSubmit={formik.handleSubmit}>
              <div className="form-row">
                <div className="col">
                  <Autocomplete
                    formName={formName}
                    name="school_id"
                    label="Institution"
                    placeholder="Search"
                    value={formik.values.school_id}
                    displayValue={schoolInputDisplayValue}
                    selected={schoolInputSelected}
                    tabIndex={1}
                    onBlur={event => {
                      formik.setFieldTouched('school_id', true);
                      handleBlur(event);
                    }}
                    onChange={(event, { newValue }) => {
                      setSchoolInputDisplayValue(newValue);
                      setSchoolInputSelected(false);
                      formik.setFieldValue('school_id', '');
                    }}
                    required={schoolIdProps.isRequired}
                    isValid={schoolIdProps.isValid}
                    error={schoolIdProps.errorMessage}
                    displaySuggestionProp="name"
                    onSuggestionsFetchRequested={fetchSchools}
                    fetchDelay={250}
                    onSuggestionSelected={school => {
                      setSchoolInputDisplayValue(school.name);
                      setSchoolInputSelected(true);
                      formik.setFieldValue('school_id', school.id);
                    }}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <InputText
                    formName={formName}
                    name="max_faculty"
                    type="number"
                    label="Faculty Users"
                    placeholder="Total users"
                    value={formik.values.max_faculty}
                    tabIndex={2}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    required={maxFacultyProps.isRequired}
                    isValid={maxFacultyProps.isValid}
                    error={maxFacultyProps.errorMessage}
                  />
                </div>
                <div className="col">
                  <InputText
                    formName={formName}
                    name="max_students"
                    type="number"
                    label="Student Users"
                    placeholder="Total users"
                    value={formik.values.max_students}
                    tabIndex={3}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    required={maxStudentsProps.isRequired}
                    isValid={maxStudentsProps.isValid}
                    error={maxStudentsProps.errorMessage}
                  />
                </div>
              </div>
              <h4
                id="register-institution-primary-admin-header"
                className="register-institution-primary-admin-header text-center">
                Primary Admin
              </h4>
              <div className="form-row">
                <div className="col">
                  <InputText
                    formName={formName}
                    name="first_name"
                    type="text"
                    label="First Name"
                    value={formik.values.first_name}
                    tabIndex={4}
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
                    tabIndex={5}
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
                    tabIndex={6}
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
                  id="register-institution-form-submit"
                  className="btn btn-primary register-institution-form-submit"
                  type="submit"
                  tabIndex={7}
                  disabled={formik.isSubmitting}>
                  Send Activation
                </button>
              </div>
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <Notification
                    id="register-institution-form-notification-container"
                    className="register-institution-form-notification-container"
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

export default RegisterInstitution;
