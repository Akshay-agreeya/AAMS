import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../component/Layout";
import iconEditDeails from '../../assets/images/iconEditDeails.svg';
import { postData } from "../../utils/CommonApi"; // API function

const ViewOrganization = () => {
  const { org_id } = useParams();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    if (org_id) {
      getOrganizationInfo();
    }
  }, [org_id]);

  const getOrganizationInfo = async () => {
    try {
      const resp = await postData(`/org/get`, { org_id });
      
      if (resp.success && resp.data.length > 0) {
        setOrganization(resp.data[0]); 
      } 
    } catch (error) {
      console.log("Error fetching organization details:", error);
    }
  };
  

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>View Organization</h1>
                </div>
              </div>

              <div className="col-12">
                <div className="roleContainer">
                  <div className="userrole">
                    User Name: <span className="me-4">{organization?.first_name} {organization?.last_name}</span>
                    Role: <span>Admin</span>
                  </div>
                  <div className="editDetails">
                    <a href={`/admin/user-management/editorganization/${org_id}`}>
                      <img src={iconEditDeails} alt="Edit User Details" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="userManagmentContainer">
                  <form>
                    <h3>Organization Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { title: "Organization Name", value: organization?.org_name },
                          { title: "Type of Organization", value: organization?.org_type },
                          { title: "Industry Type", value: organization?.industry_type},
                          { title: "Organization Address", value: organization?.address_line },
                          { title: "Country", value: organization?.country },
                          { title: "State", value: organization?.state },
                          { title: "Hub Contract Expiry Date", value: organization?.contract_expiry_date },
                        ].map((item, index) => (
                          <div className="col-12 col-lg-3 mt-4" key={index}>
                            <div className="userStaticInfo">
                              <div className="title">{item.title}</div>
                              <div className="value">{item.value || "N/A"}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <h3>Organization Contact Person Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { title: "First Name", value: organization?.first_name },
                          { title: "Last Name", value: organization?.last_name },
                          { title: "Email Address", value: organization?.email },
                          { title: "Contact Number", value: organization?.phone_number },
                        ].map((item, index) => (
                          <div className="col-12 col-lg-3 mt-4" key={index}>
                            <div className="userStaticInfo">
                              <div className="title">{item.title}</div>
                              <div className="value">{item.value || "N/A"}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="buttonBox">
                        <a href="/admin/user-management" className="btnAddUser">
                          Back
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ViewOrganization;
