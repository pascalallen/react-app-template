import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { mapDispatchToProps } from '@/lib/helpers/reduxHelper';
import userHelper from '@/lib/helpers/userHelper';
import { permission } from '@/constants/userAccess';
import { ReduxThunkDispatch, RootState } from '@/types/redux';
import { InstitutionsGroupsDataRecord } from '@/types/data';
import { State as InstitutionState } from '@/redux/institution/institutionReducer';
import { routerPath } from '@/router/common';
import { useMatch } from '@/lib/customHooks';
import institutionActions from '@/redux/institution/institutionActions';
import userActions from '@/redux/user/userActions';
import { SideMenuCardButton, SideMenuIconButton } from '@/components/SideMenuWrapper';

type Props = {
  dispatch: ReduxThunkDispatch;
  institution: InstitutionState;
};

const initialState: {
  loadingGroups: boolean;
} = {
  loadingGroups: false
};

const SideMenuContent = (props: Props) => {
  const history = useHistory();
  const location = useLocation();
  const { params, path } = useMatch();
  const institutionId: string = params.institutionId ?? '';
  const groupId: string = params.groupId ?? '';
  const { dispatch, institution } = props;

  const [loadingGroups, setLoadingGroups] = useState(initialState.loadingGroups);

  useEffect(() => {
    let mounted = true;

    const fetchInstitutionGroups = async () => {
      try {
        if (_.isEmpty(institution.groups)) {
          setLoadingGroups(true);
        }

        await dispatch(institutionActions.getInstitutionGroups(institutionId));
        if (mounted) {
          setLoadingGroups(initialState.loadingGroups);
        }
      } catch (error) {
        if (mounted) {
          setLoadingGroups(initialState.loadingGroups);
          history.push(routerPath.SERVER_ERROR);
        }
      }
    };

    fetchInstitutionGroups();

    return () => {
      mounted = false;
    };
  }, [institutionId]);

  const getGroupPath = (group: InstitutionsGroupsDataRecord): string => {
    if (_.isEmpty(group.id)) {
      return `${routerPath.INSTITUTIONS}/${institutionId}`;
    }

    return `${routerPath.INSTITUTIONS}/${institutionId}/groups/${group.id}`;
  };

  const handleGroupChange = (group: InstitutionsGroupsDataRecord): void => {
    history.push(getGroupPath(group));
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(userActions.logout());
    } finally {
      history.push(routerPath.LOGIN);
    }
  };

  const isActiveGroupId = (gid: string): boolean => {
    const isHomeInstitutionRoute = path === routerPath.INSTITUTION;
    const isInstitutionGroupRoute = path === routerPath.INSTITUTION_GROUP;
    return (isHomeInstitutionRoute && gid === '') || (isInstitutionGroupRoute && gid === groupId);
  };

  const institutionHasFacultyMembers = !(
    institution.data &&
    institution.data?.users.length < 2 &&
    institution.data?.contract_parameters.max_faculty > 1
  );

  const manageFacultyUrlPath = institutionHasFacultyMembers
    ? `${routerPath.INSTITUTIONS}/${institutionId}/faculty-members`
    : `${routerPath.INSTITUTIONS}/${institutionId}/faculty-members/invite`;

  return (
    <React.Fragment>
      <div className="side-menu-cards-container d-flex flex-column">
        {loadingGroups ? (
          <div className="groups-cards-loading d-flex flex-column align-items-center justify-content-center">
            <Spinner animation="grow" />
          </div>
        ) : (
          _.map(institution.groups, group => {
            return (
              <SideMenuCardButton
                key={group.id}
                id={`institution-${group.name.replace(/\s/g, '-').toLowerCase()}-group-button`}
                title={group.name}
                text={group.total_students}
                // All Students "group" id is an empty string
                active={isActiveGroupId(group.id)}
                href={getGroupPath(group)}
                onClick={() => handleGroupChange(group)}
              />
            );
          })
        )}
      </div>
      <div className="side-menu-actions-container">
        {userHelper.hasPermissions([permission.REGISTER_FACULTY_MEMBER]) && (
          <div className="invite-faculty-button-container">
            {!institutionHasFacultyMembers && (
              <span className="badge badge-light badge-pill font-size-xs float-right py-2">Invite Faculty</span>
            )}
            <SideMenuIconButton
              id="side-menu-invite-faculty-button"
              className="action-button"
              iconClassName="fas fa-user-friends fa-1x"
              text="Manage Faculty"
              active={_.includes(location.pathname, `${routerPath.INSTITUTIONS}/${institutionId}/faculty-members`)}
              href={manageFacultyUrlPath}
              onClick={() => history.push(manageFacultyUrlPath)}
            />
          </div>
        )}
        <SideMenuIconButton
          id="side-nav-logout-button"
          className="action-button"
          iconClassName="fas fa-user-circle fa-1x"
          text="Logout"
          onClick={handleLogout}
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  institution: state.institution
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContent);
