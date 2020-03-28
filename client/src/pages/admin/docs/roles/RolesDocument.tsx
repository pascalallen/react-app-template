import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner, Accordion, Card } from 'react-bootstrap';
import { routerPath } from '@/router/common';
import rolesApi from '@/api/rolesApi';
import errorHelper from '@/lib/helpers/errorHelper';
import { AnyObject } from '@/types/common';
import { RoleRecord } from '@/types/data';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Logo from '@/components/Logo/Logo';
import Paginator from '@/components/Paginator/Paginator';

const defaultPaginationParams = {
  per_page: 10,
  sort: 'id',
  order: 'asc'
};

const initialState: {
  loading: boolean;
  page: number;
  totalPages: number;
  roleRecords: RoleRecord[];
} = {
  loading: true,
  page: 1,
  totalPages: 1,
  roleRecords: []
};

const RolesDocument = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(initialState.loading);
  const [page, setPage] = useState(initialState.page);
  const [totalPages, setTotalPages] = useState(initialState.totalPages);
  const [roleRecords, setRoleRecords] = useState(initialState.roleRecords);

  useEffect(() => {
    let mounted = true;

    const fetchRoles = async (queryParams?: AnyObject) => {
      try {
        setLoading(true);
        const res = await rolesApi.getRoles(queryParams);

        if (res.data.total_pages <= 0) {
          throw errorHelper.makeAppError();
        }
        if (mounted) {
          setTotalPages(res.data.total_pages);
          setRoleRecords(res.data.records);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setLoading(false);
          history.push(routerPath.SERVER_ERROR);
        }
      }
    };

    fetchRoles({ ...defaultPaginationParams, page });

    return () => {
      mounted = false;
    };
  }, [page]);

  const renderRolesData = () => (
    <Accordion id="roles-container" className="roles-container">
      {_.map(roleRecords, (role, i) => (
        <Card key={i}>
          <Accordion.Toggle as={Card.Header} eventKey={`${i}`}>
            {role.name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={`${i}`}>
            <Card.Body>
              {_.isEmpty(role.permissions) && <strong>NO PERMISSIONS</strong>}
              {_.map(role.permissions ?? [], (permission, j) => (
                <dl className="row mb-0" key={j}>
                  <dt className="col-lg-3">{permission.name}</dt>
                  <dd className="col-lg-9">{permission.description}</dd>
                </dl>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );

  return (
    <PageContainer name="roles-document">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <Logo />
          </div>
        </div>
      </div>
      <h1 className="text-center mt-5">Roles</h1>
      <div className="roles-data-container">
        {loading ? (
          <div className="text-center mt-md-5">
            <Spinner animation="grow" />
          </div>
        ) : (
          renderRolesData()
        )}
      </div>
      <Paginator
        currentPage={page}
        totalPages={totalPages}
        pageRange={2}
        handlePageChange={newPage => {
          setPage(newPage);
        }}
        theme={{ ul: 'justify-content-center' }}
      />
    </PageContainer>
  );
};

export default RolesDocument;
