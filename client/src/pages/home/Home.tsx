import React from 'react';
import Table from '@/components/Table/Table';
import DogeImg from '@/assets/images/doge.png';

const Home = () => {
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

export default Home;
