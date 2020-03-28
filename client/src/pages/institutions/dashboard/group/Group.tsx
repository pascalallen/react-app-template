import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useMatch, useQuery, useDidUpdateEffect } from '@/lib/customHooks';
import { queryStringify, removeEmptyQueryParams } from '@/lib/common';
import { routerPath } from '@/router/common';
import institutionApi from '@/api/institutionApi';
import { StudentDataRecord } from '@/types/data';
import { RootState } from '@/types/redux';
import { State as InstitutionState } from '@/redux/institution/institutionReducer';
import { GetStudentsByGroupQueryParams } from '@/types/api';
import Footer from '@/components/Footer/Footer';
import Paginator from '@/components/Paginator/Paginator';
import SideMenuToggle from '@/components/SideMenuToggle/SideMenuToggle';
import GraphicImg from '@/assets/images/OME_graphic_placeholder.png';

type Props = {
  institution: InstitutionState;
};

const initialState: {
  loadingStudents: boolean;
  students: StudentDataRecord[];
  search: string;
  searchFieldFocused: boolean;
  page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  sort: string;
  order: string;
} = {
  loadingStudents: true,
  students: [],
  search: '',
  searchFieldFocused: false,
  page: 1,
  per_page: 100,
  total_pages: 0,
  total_records: 0,
  sort: 'first_name',
  order: 'asc'
};

type QueryParams = {
  page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  sort: string;
  order: string;
  search: string;
};

const getInitialQueryParams = (query: URLSearchParams): QueryParams => {
  const page = Number(query.get('page')) || initialState.page;
  const perPage = Number(query.get('per_page')) || initialState.per_page;
  const sort = query.get('sort') ?? initialState.sort;
  const order = query.get('order') ?? initialState.order;
  const search = query.get('search') ?? initialState.search;

  return {
    page,
    per_page: perPage,
    total_pages: initialState.total_pages,
    total_records: initialState.total_records,
    sort,
    order,
    search
  };
};

const Group = (props: Props) => {
  const history = useHistory();
  const urlQuery = useQuery();
  const { url, params } = useMatch();
  const { institution } = props;

  const initialQueryParams = getInitialQueryParams(urlQuery);
  const institutionId: string = params.institutionId ?? '';
  const groupId: string = params.groupId ?? '';
  const groupName: string = institution.groups.find(group => group.id === groupId)?.name ?? '';

  const [loadingStudents, setLoadingStudents] = useState(initialState.loadingStudents);
  const [students, setStudents] = useState(initialState.students);
  const [search, setSearch] = useState(initialQueryParams.search);
  const [searchFieldFocused, setSearchFieldFocused] = useState(initialState.searchFieldFocused);
  const [page, setPage] = useState(initialQueryParams.page);
  // TODO: future functionality
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [perPage, setPerPage] = useState(initialQueryParams.per_page);
  const [totalPages, setTotalPages] = useState(initialQueryParams.total_pages);
  const [totalRecords, setTotalRecords] = useState(initialQueryParams.total_records);
  // TODO: future functionality
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState(initialQueryParams.sort);
  const [order, setOrder] = useState(initialQueryParams.order);

  const buildComponentQueryParams = (): GetStudentsByGroupQueryParams => {
    const queryParams: GetStudentsByGroupQueryParams = {
      group_id: groupId,
      per_page: perPage,
      search,
      page,
      sort,
      order
    };

    return removeEmptyQueryParams(queryParams);
  };

  useEffect(() => {
    let mounted = true;

    const fetchGroups = async () => {
      try {
        setLoadingStudents(initialState.loadingStudents);
        const queryParams = buildComponentQueryParams();
        const res = await institutionApi.getStudentsByGroup(institutionId, queryParams);
        if (mounted) {
          setTotalRecords(res.data.total_records);
          setTotalPages(res.data.total_pages);
          setStudents(res.data.records);
          setLoadingStudents(false);
        }
      } catch (error) {
        if (mounted) {
          setLoadingStudents(false);
          history.push(routerPath.SERVER_ERROR);
        }
      }
    };

    fetchGroups();

    return () => {
      mounted = false;
    };
  }, []);

  useDidUpdateEffect(() => {
    history.push(`${url}${queryStringify(_.omit(buildComponentQueryParams(), 'group_id'))}`);
  }, [page, perPage, sort, order]);

  const handleSearchSubmit = () => {
    if (_.isEmpty(search)) {
      return history.push(url);
    }

    return history.push(
      `${url}${queryStringify({
        search
      })}`
    );
  };

  const handleSearchClear = () => {
    return history.push(url);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFocusChange = () => {
    setSearchFieldFocused(true);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleBlurChange = () => {
    setSearchFieldFocused(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const renderLoading = () => (
    <div className="d-flex align-items-center justify-content-center h-100">
      <Spinner animation="grow" />
    </div>
  );

  const renderStudentsListHeader = () => {
    return (
      <div className="students-header-bar-container">
        <button
          id="students-control-bar-name-sort"
          className="name-sort-btn bg-white rounded"
          onClick={() => {
            if (order === 'asc') {
              return setOrder('desc');
            }
            return setOrder('asc');
          }}>
          Sort: {order === 'asc' ? 'A - Z' : 'Z - A'}
        </button>
      </div>
    );
  };

  const renderStudentsList = () => (
    <div className="students-container">
      {/* TODO: convert button to link */}
      {_.map(students, (student, index) => (
        <button
          id={`student-row-${index}`}
          key={student.id}
          className="student-row-btn d-flex align-items-center justify-content-between bg-white rounded-lg w-100">
          <div className="row-left d-flex align-items-center justify-content-center">
            <div className="student-initials-bubble d-flex align-items-center justify-content-center rounded-circle">
              <span className="student-initials-text">
                {student.first_name[0]}
                {student.last_name[0]}
              </span>
            </div>
            <span className="student-name">
              {student.first_name} {student.last_name}
            </span>
          </div>
          <div className="row-right" />
        </button>
      ))}
    </div>
  );

  const renderPagination = () => {
    const upperRange = () => {
      if (page * perPage > totalRecords) {
        return totalRecords;
      }
      return page * perPage;
    };

    const lowerRange = () => {
      return page * perPage - perPage + 1;
    };

    return (
      <div className="pagination-container d-flex align-items-center justify-content-between">
        <div className="pagination-left d-flex align-items-center justify-content-center">
          {_.size(students) > 0 && (
            <span className="pagination-text">
              Showing {lowerRange()} to {upperRange()} of {totalRecords}
            </span>
          )}
        </div>
        <div className="pagination-right d-flex align-items-center justify-content-center">
          <Paginator
            theme={{ ul: 'pagination-sm' }}
            currentPage={page}
            totalPages={totalPages}
            pageRange={1}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    );
  };

  const renderStudentsNotFound = () => {
    return (
      <div className="not-found-container d-flex flex-column align-content-center justify-content-center">
        <img className="not-found-placeholder align-self-center img-fluid" src={GraphicImg} alt="Graphic Placeholder" />
        <h3 id="not-found-header" className="not-found-header align-self-center">
          No Results Found
        </h3>
        <div className="not-found-subheader align-self-center">Try searching for another student.</div>
      </div>
    );
  };

  return (
    <div className="group-container d-flex flex-column vh-100">
      <div className="header-container flex-shrink-0">
        <SideMenuToggle id="side-nav-open-button" className="side-nav-open-button position-relative" />
        <div className="header d-flex align-items-center justify-content-center">
          <h3 className="institution-name-text text-center">{institution.data?.name}</h3>
        </div>
        <div className="student-search-input-group input-group float-right">
          <div className="input-group-prepend">
            <div
              className={classnames(
                'input-group-text',
                searchFieldFocused ? 'input-group-text-focus bg-transparent border-right-0' : 'bg-light border-0'
              )}>
              <button
                id="search-submit-button"
                className={classnames(
                  'search-submit-button border-0 pr-0',
                  searchFieldFocused ? 'search-submit-button-focus bg-transparent text-primary' : ''
                )}
                type="button"
                onClick={handleSearchSubmit}>
                <span className="fas fa-search" />
              </button>
            </div>
          </div>
          <input
            id="student-search-input-field"
            type="text"
            className={classnames(
              'form-control',
              'student-search-input-field',
              'font-size-base',
              searchFieldFocused ? 'bg-transparent border-left-0 border-right-0 shadow-none' : 'border-0 bg-light'
            )}
            aria-describedby="input-group-text"
            placeholder={`Search ${groupName}...`}
            value={search}
            onBlur={handleBlurChange}
            onFocus={handleFocusChange}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            tabIndex={1}
            autoComplete="off"
            maxLength={100}
          />
          <div className="input-group-append">
            <div
              className={classnames(
                'input-group-text',
                searchFieldFocused ? 'input-group-text-focus bg-transparent border-left-0' : 'bg-light border-0'
              )}>
              <button
                id="search-clear-button"
                className={classnames(
                  'search-clear-button border-0 pl-0',
                  searchFieldFocused ? 'search-clear-button-focus bg-transparent text-primary' : ''
                )}
                type="button"
                onClick={handleSearchClear}>
                {search && <span className="fas fa-times-circle" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="body-container flex-fill-shrink-0">
        {loadingStudents ? (
          renderLoading()
        ) : (
          <React.Fragment>
            {renderStudentsListHeader()}
            {_.size(students) > 0 ? (
              <React.Fragment>
                {renderStudentsList()}
                {renderPagination()}
              </React.Fragment>
            ) : (
              renderStudentsNotFound()
            )}
          </React.Fragment>
        )}
      </div>
      <div className="footer-container flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  institution: state.institution
});

export default connect(mapStateToProps)(Group);
