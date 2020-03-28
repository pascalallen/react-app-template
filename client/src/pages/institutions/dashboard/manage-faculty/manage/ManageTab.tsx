import _ from 'lodash';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { ReduxThunkDispatch, RootState } from '@/types/redux';
import { GetFacultyMembersQueryParams } from '@/types/api';
import { FacultyMemberDataRecord } from '@/types/data';
import { State as UserState } from '@/redux/user/userReducer';
import { State as InstitutionState } from '@/redux/institution/institutionReducer';
import institutionActions from '@/redux/institution/institutionActions';
import { useMatch } from '@/lib/customHooks';
import { routerPath } from '@/router/common';
import { permission, role, activationStatus } from '@/constants/userAccess';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import errorHelper from '@/lib/helpers/errorHelper';
import userHelper from '@/lib/helpers/userHelper';
import institutionApi from '@/api/institutionApi';
import RemoveMemberModal from './common/RemoveMemberModal/RemoveMemberModal';
import Notification, { notificationTypes } from '@/components/Form/Notification/Notification';

type Props = {
  dispatch: ReduxThunkDispatch;
  user: UserState;
  institution: InstitutionState;
};

type State = {
  loadingFacultyMembers: boolean;
  facultyMembers: FacultyMemberDataRecord[];
  showFacultyMemberModal: boolean;
  facultyMemberDeleteId: string | null;
  removingFacultyMember: boolean;
  resendingInvite: boolean;
  sendInviteNotification: {
    show: boolean;
    type: string;
  };
};

const initialState: State = {
  loadingFacultyMembers: true,
  facultyMembers: [],
  showFacultyMemberModal: false,
  facultyMemberDeleteId: null,
  removingFacultyMember: false,
  resendingInvite: false,
  sendInviteNotification: {
    show: false,
    type: notificationTypes.SUCCESS
  }
};

const ManageTab = (props: Props) => {
  const history = useHistory();
  const { params } = useMatch();
  const institutionId = params.institutionId ?? '';
  const { dispatch, user, institution } = props;

  const [loadingFacultyMembers, setLoadingFacultyMembers] = useState(initialState.loadingFacultyMembers);
  const [facultyMembers, setFacultyMembers] = useState(initialState.facultyMembers);
  const [showRemoveMemberModal, setShowDeleteFacultyMemberModal] = useState(initialState.showFacultyMemberModal);
  const [facultyMemberDeleteId, setFacultyMemberDeleteId] = useState(initialState.facultyMemberDeleteId);
  const [removingFacultyMember, setDeletingFacultyMember] = useState(initialState.removingFacultyMember);
  const [resendingInvite, setResendingInvite] = useState(initialState.resendingInvite);
  const [sendInviteNotification, setSendInviteNotification] = useState(initialState.sendInviteNotification);

  useEffect(() => {
    let mounted = true;

    const fetchFacultyMembers = async () => {
      try {
        setLoadingFacultyMembers(initialState.loadingFacultyMembers);
        const queryParams: GetFacultyMembersQueryParams = { page: 1, per_page: 100 };
        const res = await institutionApi.getFacultyMembers(institutionId, queryParams);

        if (mounted) {
          setFacultyMembers(res.data.records);
          setLoadingFacultyMembers(false);
        }
      } catch (error) {
        if (mounted) {
          setLoadingFacultyMembers(false);
          history.push(routerPath.SERVER_ERROR);
        }
      }
    };

    fetchFacultyMembers();

    return () => {
      mounted = false;
    };
  }, []);

  const handleResendInvite = async (facultyMemberId: string): Promise<void> => {
    try {
      setResendingInvite(true);
      if (!facultyMemberId) {
        throw errorHelper.makeAppError();
      }
      await institutionApi.resendActivationEmail(institutionId, facultyMemberId);
      setResendingInvite(initialState.resendingInvite);
      setSendInviteNotification({ show: true, type: notificationTypes.SUCCESS });
    } catch (error) {
      setResendingInvite(initialState.resendingInvite);
      setSendInviteNotification({ show: true, type: notificationTypes.ERROR });
    }
  };

  const handleShowRemoveModal = (facultyMemberId: string): void => {
    setFacultyMemberDeleteId(facultyMemberId);
    setShowDeleteFacultyMemberModal(true);
  };

  const handleHideRemoveMemberModal = () => {
    setFacultyMemberDeleteId(initialState.facultyMemberDeleteId);
    setShowDeleteFacultyMemberModal(initialState.showFacultyMemberModal);
  };

  const handleRemoveFacultyMember = async (): Promise<void> => {
    try {
      setDeletingFacultyMember(true);
      if (!facultyMemberDeleteId || _.isNull(institution.data)) {
        throw errorHelper.makeAppError();
      }
      setFacultyMembers(_.filter(facultyMembers, fm => fm.id !== facultyMemberDeleteId));
      setDeletingFacultyMember(initialState.removingFacultyMember);
      await dispatch(institutionActions.removeFacultyMember(institutionId, facultyMemberDeleteId));
      handleHideRemoveMemberModal();
    } catch (error) {
      handleHideRemoveMemberModal();
      setDeletingFacultyMember(initialState.removingFacultyMember);
      history.push(routerPath.CLIENT_ERROR);
    }
  };

  const renderLoading = () => {
    return (
      <div className="manage-tab-container d-flex align-items-center justify-content-center h-100">
        <Spinner animation="grow" />
      </div>
    );
  };

  const renderHeader = () => {
    const activeMembersCount = _.size(_.filter(facultyMembers, fm => fm.activation_status === activationStatus.ACTIVE));

    return (
      <React.Fragment>
        <h3 id="manage-tab-header-text">Team Members</h3>
        <p id="manage-tab-subheader-text">You have {activeMembersCount} active members.</p>
      </React.Fragment>
    );
  };

  const renderFacultyMembersTable = () => {
    return (
      <table className="manage-tab-table table">
        <thead>
          <tr>
            <th scope="col" className="border-bottom-0 border-top-0">
              Full Name
            </th>
            <th scope="col" className="border-bottom-0 border-top-0">
              Email
            </th>
            <th scope="col" className="border-bottom-0 border-top-0">
              Role
            </th>
            <th scope="col" className="border-bottom-0 border-top-0" />
          </tr>
        </thead>
        <tbody className="border-bottom">
          {_.map(facultyMembers, fm => {
            const emailKey = fm.email_address.replace(/[@.]/g, '-');

            return (
              <tr key={fm.id}>
                <td id={`${emailKey}-full-name`} className="align-middle">
                  {fm.first_name} {fm.last_name}
                  {userHelper.hasPermissions([permission.REGISTER_FACULTY_MEMBER]) &&
                  fm.activation_status === activationStatus.INACTIVE ? (
                    <React.Fragment>
                      <br />
                      <small>
                        Invite Pending -{' '}
                        <button
                          id={`${emailKey}-resend-btn`}
                          className="resend-btn btn btn-link"
                          disabled={resendingInvite}
                          onClick={() => handleResendInvite(fm.id)}>
                          Resend
                        </button>
                      </small>
                    </React.Fragment>
                  ) : null}
                </td>
                <td id={`${emailKey}-email-address`} className="align-middle">
                  {fm.email_address}
                </td>
                <td id={`${emailKey}-role`} className="align-middle">
                  {!!_.find(fm.roles, fmRole => fmRole === role.FACULTY_ADMIN) ? 'Admin' : 'Member'}
                </td>
                <td className="align-middle">
                  {userHelper.hasPermissions([permission.REMOVE_FACULTY_MEMBER]) && fm.id !== user.data.id ? (
                    <button
                      id={`${emailKey}-delete-btn`}
                      className="delete-btn btn"
                      onClick={() => handleShowRemoveModal(fm.id)}>
                      <span className="fas fa-trash" />
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  if (loadingFacultyMembers) {
    return renderLoading();
  }

  return (
    <div className="manage-tab-container">
      {showRemoveMemberModal && (
        <RemoveMemberModal
          show={showRemoveMemberModal}
          onRemove={handleRemoveFacultyMember}
          isRemoving={removingFacultyMember}
          onClose={handleHideRemoveMemberModal}
        />
      )}
      <div className="manage-tab-header-container">{renderHeader()}</div>
      <div className="manage-tab-content">
        {renderFacultyMembersTable()}
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Notification
              id="resend-invite-notification-container"
              className="resend-invite-notification-container"
              show={sendInviteNotification.show}
              type={sendInviteNotification.type}
              message={
                sendInviteNotification.type === notificationTypes.SUCCESS ? 'Invite resent' : 'Invite failed to send'
              }
              timeOut={3000}
              onTimeout={() => setSendInviteNotification(initialState.sendInviteNotification)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  institution: state.institution
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTab);
