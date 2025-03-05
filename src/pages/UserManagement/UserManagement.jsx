import React, { useEffect, useState } from "react";
import editOrgicon from "../../assets/images/iconWhiteEdit.svg";
import viewOrgicon from "../../assets/images/iconWhiteView.svg";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import Layout from '../../component/Layout';
import ChangePasswordModal from '../../common/auth/ChangePassword';
import Accordian from "../../component/accordian/Accordian";
import { deleteData, getData } from "../../utils/CommonApi";
import { UserTable } from "./UserTable";
import { useNavigate } from "react-router-dom";
import notification from "../../component/notification/Notification";
import { getAllowedOperations } from "../../utils/Helper";

const UserManagement = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state added
  const [openOrgDeleteModal, setOpenOrgDeleteModal] = useState(false); // Loading state added

  const navigate = useNavigate();

  useEffect(() => {
    getOrganizations();
  }, []);

  const getOrganizations = async () => {


    try {
      setLoading(true);
      const resp = await getData("/org/list");
      setOrganizations(resp.data.organizations);
    } catch (error) {
      console.log(error);
    }

    finally {
      setLoading(false);
    }
  };

  const handleDeleteOrganization = async () => {
    const selectedOrg = organizations.filter(item => item.selected);
    const data = {
      org_ids: selectedOrg.map(item => item.org_id)
    };
    try {
      const resp = await deleteData(`/org/delete`, data);
      notification.success({
        title: `Delete Organization`,
        message: resp.message
      });
      navigate(0);
    } catch (error) {
      console.log(error);
      notification.error({
        title: 'Delete Organization',
        message: error.data?.error
      });
    }
  };

  const operations = getAllowedOperations(1);

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>User Management - Organization ({organizations.length})</h1>
                  <div className="buttonContainer">
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      if (organizations.filter(item => item.selected)?.length > 0)
                        setOpenOrgDeleteModal(true);
                    }} className="delete me-1" >
                      <i className="fa-regular fa-trash-can"></i> Delete
                    </a>
                    <a href="/admin/user-management/addorg" className="add">
                      <i className="fa-solid fa-plus"></i> Add New Organization
                    </a>
                  </div>
                </div>
              </div>

              
              {loading ? (
                <div className="dataLoadContainer">
                  <div className="progressBarContainer">
                    <div className="message">Loading data, please wait...</div>
                    <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                      <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: "55%" }}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-12">
                  <div className="userManagmentContainer">
                    <div className="accordion" id="userManageList">
                      {organizations.map((org) => (
                        <Accordian title={org.org_name} prefix={<div className="form-check me-2 custCheck">
                          <input className="form-check-input" type="checkbox" id={`addcheck-${org.org_id}`}
                            value="Add" onChange={(e) => { org.selected = e.target.checked; setOrganizations([...organizations]) }} />
                        </div>} extra={<div className="addNewUserCont">
                          <a href={`/admin/user-management/editorganization/${org.org_id}`} className="edit me-1">
                            <img src={editOrgicon} alt="Edit Organization" /> Edit Organization
                          </a>
                          <a href={`/admin/user-management/vieworganization/${org.org_id}`} className="view me-1">
                            <img src={viewOrgicon} alt="View Organization" /> View Organization
                          </a>
                         { operations?.find(item => item.operation_type_id === 1)&&<a href={`/admin/user-management/adduser/${org.org_id}`} className="add">
                            <i className="fa-solid fa-plus"></i> Add New User
                          </a>
                        }
                        </div>}>
                          <UserTable org_id={org.org_id} />
                        </Accordian>
                      ))}
                    </div>

                    <DeleteConfirmationModal
                      modalId="deleteUserModal"
                      open={openOrgDeleteModal}
                      onDelete={handleDeleteOrganization}
                      onClose={() => { setOpenOrgDeleteModal(false) }}
                    />
                    <ChangePasswordModal id="changePassword" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UserManagement;
