import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMatch } from '@/lib/customHooks';
import { routerPath } from '@/router/common';
import { StudentDataRecord } from '@/types/data';
import institutionApi from '@/api/institutionApi';
import PageContainer from '@/components/Layout/PageContainer/PageContainer';
import Header from './Header/Header';
import NavigateBack from './NavigateBack/NavigateBack';

const initialState: {
  student: StudentDataRecord | null;
} = {
  student: null
};

const Student = () => {
  const history = useHistory();
  const { params } = useMatch();

  const institutionId = params.institutionId ?? '';
  const studentId = params.studentId ?? '';

  const [student, setStudent] = useState(initialState.student);

  useEffect(() => {
    let mounted = true;

    const fetchStudent = async () => {
      try {
        const res = await institutionApi.getStudentById(institutionId, studentId);
        if (mounted) {
          setStudent(res.data);
        }
      } catch (error) {
        if (mounted) {
          history.push(routerPath.SERVER_ERROR);
        }
      }
    };

    fetchStudent();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageContainer name="students">
      <Header />
      <div id="student-container" className="student-container">
        <NavigateBack />
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {student && (
              <React.Fragment>
                <h3>
                  {student.first_name} {student.last_name}
                </h3>
                <h4>{student.email_address}</h4>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Student;
