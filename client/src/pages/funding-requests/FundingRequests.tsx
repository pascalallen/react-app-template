import React from 'react';
import Table from "@/components/Table/Table";

const FundingRequests = () => {
  return (
    <div className="funding-requests-container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="row">
            <div className="col-md-3">
              <h3>Funding Requests</h3>
            </div>
            <div className="col-md-3 offset-md-6 text-right">
              <strong>New Funding</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <select id="client-select" className="form-control">
                <option selected>Select Client</option>
                <option>...</option>
              </select>
            </div>
            <div className="col-md-3">
              Total Funding Amount: 1234
            </div>
            <div className="col-md-3" />
            <div className="col-md-3 text-right">
              <button className="btn btn-dark">Review</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingRequests;
