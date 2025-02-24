import React from "react";

const OrganizationDetails = ({ details=[] }) => {
  return (
    <div>
      {/* <h3>Organization Details</h3> */}
      <div className="formContainer">
        <div className="row">
          {details.map((item, index) => (
            <div key={index} className="col-12 col-lg-3">
              <div className="userStaticInfo">
                <div className="title">{item.title}</div>
                <div className="value">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetails;
