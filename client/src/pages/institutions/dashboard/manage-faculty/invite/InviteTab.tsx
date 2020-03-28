import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import HttpStatus from 'http-status-codes';
import { useHistory } from 'react-router-dom';
import { useFormik, FormikHelpers } from 'formik';
import { useMatch } from '@/lib/customHooks';
import { routerPath } from '@/router/common';
import { appErrorTypes } from '@/constants/errors';
import formHelper from '@/lib/helpers/formHelper';
import validator from '@/lib/validator/validator';
import systemApi from '@/api/systemApi';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import { ReduxThunkDispatch, RootState } from '@/types/redux';
import { State as InstitutionState } from '@/redux/institution/institutionReducer';
import institutionActions from '@/redux/institution/institutionActions';
import ContactUsModal from '@/components/ContactUsModal/ContactUsModal';
import Form from '@/components/Form/Form';
import InputText from '@/components/Form/InputText';
import Notification, { notificationTypes } from '@/components/Form/Notification/Notification';

type FormValues = { first_name: string; last_name: string; email: string };

const initialValues: FormValues = { first_name: '', last_name: '', email: '' };
const initialErrors = { first_name: '', last_name: '', email: '', status: 0 };

type Props = {
  dispatch: ReduxThunkDispatch;
  institution: InstitutionState;
};

const InviteTab = (props: Props) => {
  const history = useHistory();
  const { params } = useMatch();
  const institutionId: string = params.institutionId ?? '';
  const { dispatch, institution } = props;

  const formName = 'register-faculty-member';

  const [validationRules, setValidationRules] = useState({});
  const [serverErrors, setServerErrors] = useState(initialErrors);
  const [showContactModal, setShowContactModal] = useState(false);

  const onToggleContactModal = (): void => {
    setShowContactModal(!showContactModal);
  };

  const getRemainingInvites = (): number => {
    if (!institution.data) {
      return 0;
    }

    const maxFacultyUsers = institution.data?.contract_parameters.max_faculty ?? 0;
    const facultyUsers = _.size(institution.data?.users);
    const remainingInvites = maxFacultyUsers - facultyUsers;
    return remainingInvites >= 0 ? remainingInvites : 0;
  };

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

  const submitForm = async (facultyMemberData: FormValues, actions: FormikHelpers<FormValues>) => {
    const { setSubmitting, setStatus, resetForm } = actions;
    try {
      await dispatch(institutionActions.registerFacultyMember(institutionId, facultyMemberData));
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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    formik.setStatus(undefined);
    setServerErrors(initialErrors);
    formik.handleBlur(event);
  };

  const renderRegisterFacultyMemberForm = () => {
    const firstNameInputProps = formHelper.getInputProps('first_name', formik, serverErrors, validationRules);
    const lastNameInputProps = formHelper.getInputProps('last_name', formik, serverErrors, validationRules);
    const emailInputProps = formHelper.getInputProps('email', formik, serverErrors, validationRules);

    return (
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
              handleChange={formik.handleChange}
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
              handleChange={formik.handleChange}
              handleBlur={handleBlur}
              required={lastNameInputProps.isRequired}
              isValid={lastNameInputProps.isValid}
              error={lastNameInputProps.errorMessage}
            />
          </div>
          <div className="col">
            <InputText
              formName={formName}
              name="email"
              type="email"
              label="Email"
              placeholder="mail@email.com"
              value={formik.values.email}
              tabIndex={3}
              handleChange={formik.handleChange}
              handleBlur={handleBlur}
              required={emailInputProps.isRequired}
              isValid={emailInputProps.isValid}
              error={emailInputProps.errorMessage}
            />
          </div>
        </div>
        <div className="text-right">
          <button
            id="register-faculty-member-form-submit"
            className="btn btn-primary register-faculty-member-form-submit"
            type="submit"
            tabIndex={5}
            disabled={formik.isSubmitting}>
            Send Invite
          </button>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Notification
              id="register-faculty-member-form-notification-container"
              className="register-faculty-member-form-notification-container"
              show={!!formik.status}
              type={formik.status?.success ? notificationTypes.SUCCESS : notificationTypes.ERROR}
              message={formik.status?.success ? 'Invite sent' : 'Invite failed to send'}
              timeOut={3000}
            />
          </div>
        </div>
      </Form>
    );
  };

  const renderInviteLimitReachedContainer = () => {
    return (
      <div id="invite-limit-reached-container" className="invite-limit-reached-container">
        <div className="font-size-md font-weight-bold">You have reached your invite limit.</div>
        <p>
          Please remove a faculty member or{' '}
          <a className="link" onClick={onToggleContactModal}>
            <strong>contact us</strong>
          </a>{' '}
          to renegotiate the terms of your contract.
        </p>
      </div>
    );
  };

  return (
    <div className="invite-tab-container">
      {showContactModal && <ContactUsModal show={showContactModal} onClose={onToggleContactModal} />}
      <div id="register-faculty-member-form-container" className="register-faculty-member-form-container">
        <div className="row">
          <div className="col">
            <h3 id="register-faculty-member-form-header" className="register-faculty-member-form-header">
              Invite Faculty
            </h3>
            <p className="register-faculty-member-form-subheader">
              You have {getRemainingInvites()} invites available.
            </p>
            {getRemainingInvites() > 0 ? renderRegisterFacultyMemberForm() : renderInviteLimitReachedContainer()}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  institution: state.institution
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteTab);
