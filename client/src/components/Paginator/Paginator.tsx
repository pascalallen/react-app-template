import React, { ReactNode } from 'react';
import _ from 'lodash';
import classnames from 'classnames';

type Props = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  pageRange?: number;
  showFirstAndLast?: boolean;
  showPrevAndNext?: boolean;
  theme?: {
    nav?: string;
    ul?: string;
  };
};

const Paginator = (props: Props) => {
  const {
    currentPage,
    totalPages,
    handlePageChange,
    pageRange = 2,
    showFirstAndLast = false,
    showPrevAndNext = true,
    theme
  } = props;

  if (totalPages <= 1) {
    return null;
  }

  const pagesPerRow = pageRange * 2 + 1;
  const enableFirstLink =
    showFirstAndLast && currentPage > 2 && currentPage > pageRange + 1 && pagesPerRow < totalPages;
  const enablePrevLink = showPrevAndNext && currentPage > 1 && pagesPerRow < totalPages;
  const enableNextLink = showPrevAndNext && currentPage < totalPages && pagesPerRow < totalPages;
  const enableLastLink =
    showFirstAndLast &&
    currentPage < totalPages - 1 &&
    currentPage + pageRange - 1 < totalPages &&
    pagesPerRow < totalPages;

  const pageLinks = (): ReactNode[] => {
    const output: ReactNode[] = [];
    _.range(1, totalPages + 1).map(i => {
      if (!(i >= currentPage + pageRange + 1 || i <= currentPage - pageRange - 1) || totalPages <= pagesPerRow) {
        if (currentPage === i) {
          output.push(
            <li className="page-item active" key={`page-item-${i}`}>
              <span className="page-link" aria-current="page">
                <span aria-hidden="true">{i}</span>
              </span>
            </li>
          );
        } else {
          output.push(
            <li className="page-item" key={`page-item-${i}`}>
              <a
                href="#"
                className="page-link"
                aria-label={`page ${i}`}
                onClick={event => {
                  event.preventDefault();
                  handlePageChange(i);
                }}>
                <span aria-hidden="true">{i}</span>
              </a>
            </li>
          );
        }
      }
    });
    return output;
  };

  return (
    <nav aria-label="page navigation" className={classnames('paginator', theme?.nav)}>
      <ul className={classnames('pagination', 'm-0', theme?.ul)}>
        {showFirstAndLast && (
          <li className={classnames('page-item', enableFirstLink ? '' : 'disabled')}>
            <a
              href="#"
              className="page-link"
              aria-label="first"
              onClick={event => {
                event.preventDefault();
                if (enableFirstLink) {
                  handlePageChange(1);
                }
              }}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}
        {showPrevAndNext && (
          <li className={classnames('page-item', enablePrevLink ? '' : 'disabled')}>
            <a
              href="#"
              className="page-link"
              aria-label="previous"
              onClick={event => {
                event.preventDefault();
                if (enablePrevLink) {
                  handlePageChange(currentPage - 1);
                }
              }}>
              <span aria-hidden="true">Previous</span>
            </a>
          </li>
        )}
        {pageLinks()}
        {showPrevAndNext && (
          <li className={classnames('page-item', enableNextLink ? '' : 'disabled')}>
            <a
              href="#"
              className="page-link"
              aria-label="next"
              onClick={event => {
                event.preventDefault();
                if (enableNextLink) {
                  handlePageChange(currentPage + 1);
                }
              }}>
              <span aria-hidden="true">Next</span>
            </a>
          </li>
        )}
        {showFirstAndLast && (
          <li className={classnames('page-item', enableLastLink ? '' : 'disabled')}>
            <a
              href="#"
              className="page-link"
              aria-label="last"
              onClick={event => {
                event.preventDefault();
                if (enableLastLink) {
                  handlePageChange(totalPages);
                }
              }}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Paginator;
