import React, { useState } from "react";

const EditUser = () => {
  const [user, setUser] = useState({
    firstName: "Ajay",
    lastName: "Sharma",
    email: "ajay.sharma@gmail.com",
    contactNo: "+91 9899432567",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="adaMainContainer">
      <div className="breadcrumbsContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <a href="dashboard.html">Home</a> &gt;{" "}
              <a href="userManagment.html">User Management</a> &gt;{" "}
              <span>Edit User</span>
            </div>
          </div>
        </div>
      </div>

      <section className="adminControlContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>Edit User Details</h1>
              </div>
            </div>

            <div className="col-12">
              <div className="roleContainer">
                <div className="userrole">
                  User Name: <span className="me-4">mukesh.kumar</span> Role:{" "}
                  <span>Admin</span>
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
                        <div className="value">B-34, Sector 45, Noida, India</div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="userStaticInfo">
                        <div className="title">Contact Person</div>
                        <div className="value">Shiva Sharma - +91 9876545367</div>
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
                          value={user.firstName}
                          onChange={handleChange}
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
                          value={user.lastName}
                          onChange={handleChange}
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
                          value={user.email}
                          onChange={handleChange}
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
                          value={user.contactNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="buttonBox">
                    <a href="/usermanagement" className="btnCancel">
                      Cancel
                    </a>
                    <button type="submit" className="btnAddUser">
                      Save Details
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditUser;
