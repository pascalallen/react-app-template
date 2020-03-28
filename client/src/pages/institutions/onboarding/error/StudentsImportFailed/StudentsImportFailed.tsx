import React from 'react';

type Props = {
  errorMessage: string;
};

const StudentsImportFailed = (props: Props) => {
  const { errorMessage } = props;

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h4 id="students-import-failed-heading" className="body-title text-center">
          Something Went Wrong
        </h4>
        <p className="body-text text-center p-0">{errorMessage}</p>
      </div>
    </div>
  );
};

export default StudentsImportFailed;
