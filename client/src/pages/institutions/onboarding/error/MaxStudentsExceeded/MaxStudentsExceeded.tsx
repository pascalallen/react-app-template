import React from 'react';
import GraphicImg from '@/assets/images/OME_graphic_placeholder.png';

type Props = {
  institutionName: string;
  maxStudents: number;
};

const MaxStudentsExceeded = (props: Props) => {
  const { institutionName, maxStudents } = props;

  return (
    <React.Fragment>
      <h4 id="max-students-exceeded-heading" className="body-title text-center">
        Oops! Your contract parameters have been violated
      </h4>
      <p className="body-text text-center p-0">
        {institutionName} is on contract for <strong>{maxStudents} students</strong>. If this is incorrect please{' '}
        <a className="link" href="mailto:help@onlinemeded.org">
          <strong>contact us</strong>
        </a>
        .
      </p>
      <div className="graphic-container d-flex flex-column align-content-center justify-content-center">
        <img className="graphic-placeholder align-self-center img-fluid" src={GraphicImg} alt="Graphic Placeholder" />
      </div>
    </React.Fragment>
  );
};

export default MaxStudentsExceeded;
