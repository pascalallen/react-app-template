import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '@/types/redux';
import { login, State as UserState } from '@/redux/userSlice';
import Table from '@/components/Table/Table';
import DogeImg from '@/assets/images/doge.png';

type Props = {
  user: UserState;
};

const Home = () => {
  const dispatch = useDispatch();

  dispatch(login({ email: 'test', password: 'test' }));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="text-center">
            <img id="doge-image" className="doge-image img-fluid" src={DogeImg} alt="Doge Image" />
          </div>
        </div>
      </div>
      <h1 className="text-center mt-5">Hello World</h1>
      <Table />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
