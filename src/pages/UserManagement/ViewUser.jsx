import React from "react";
import iconEdit from '../../assets/images/iconEditDeails.svg'
import Layout from '../../component/Layout';

const ViewUserDetails = () => {
  const breadcrumbs = [{ url: "admin/viwuser", label: "Home" },
        {label:"View User"}
    ];
  return (
    <Layout breadcrumbs={breadcrumbs}>
    <div className="adaMainContainer">
      {/* Admin Panel site content */}
      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>View User Details</h1>
              </div>
            </div>

            <div className="col-12">
              <div className="roleContainer">
                <div className="userrole">
                  User Name: <span className="me-4">ajay.sharma</span> Role:{" "}
                  <span>User</span>
                </div>
                <div className="editDetails">
                  <a href="/edituser">
                    <img
                      src={iconEdit}
                      alt="Edit User Details"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="userManagmentContainer">
                <div className="formContainer">
                  <div className="row">
                    <div className="col-12 col-lg-3">
                      <div className="userStaticInfo">
                        <div className="title">Organization Name</div>
                        <div className="value">Organization Enterprise -1</div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="userStaticInfo">
                        <div className="title">Organization Address</div>
                        <div className="value">
                          B-34, Sector 45, Noida, India
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="userStaticInfo">
                        <div className="title">Contact Person</div>
                        <div className="value">
                          Shiva Sharma - +91 9876545367
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="userStaticInfo">
                        <div className="title">Email</div>
                        <div className="value">shiva.sharma@email.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3>User Details - 01</h3>
                <div className="formContainer">
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          value="Ajay"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          value="Sharma"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="name@example.com"
                          value="ajay.sharma@gmail.com"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="mb-3">
                        <label htmlFor="contactNo" className="form-label">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="contactNo"
                          name="contactNo"
                          placeholder="Contact Number"
                          value="+91 9899432567"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="buttonBox">
                    <a href="/admin/user-management" className="btnAddUser">
                      <i className="fa-solid fa-arrow-left-long"></i> Back
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default ViewUserDetails;
