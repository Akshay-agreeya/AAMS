import React, { useEffect, useState } from "react";
import editOrgicon from "../../assets/images/iconWhiteEdit.svg";
import viewOrgicon from "../../assets/images/iconWhiteView.svg";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import Layout from '../../component/Layout';
import Accordian from "../../component/accordian/Accordian";
import { deleteData, getData } from "../../utils/CommonApi";
import { UserTable } from "./UserTable";
import { useNavigate } from "react-router-dom";
import notification from "../../component/notification/Notification";
import { getAllowedOperations, isSuperAdmin } from "../../utils/Helper";
import { USER_MGMT } from "../../utils/Constants";
import Loading from "../../component/Loading";
import useFetch from "../../hooks/useFetch";


const UserManagement = () => {
 // const [organizations, setOrganizations] = useState([]);
  // const [loading, setLoading] = useState(false); // Loading state added
  const [openOrgDeleteModal, setOpenOrgDeleteModal] = useState(false); // Loading state added

  const navigate = useNavigate();

  const superAdmin = isSuperAdmin();

  const {response, loading, setResponse} = useFetch("/org/list");
  const organizations = response.contents||[];

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

  const operations = getAllowedOperations(USER_MGMT);

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
                    {superAdmin && <a href="/#" onClick={(e) => {
                      e.preventDefault();
                      if (organizations.filter(item => item.selected)?.length > 0)
                        setOpenOrgDeleteModal(true);
                    }} className="delete me-1" >
                      <i className="fa-regular fa-trash-can"></i> Delete
                    </a>}
                    {superAdmin && <a href="/user-management/addorg" className="add">
                      <i className="fa-solid fa-plus"></i> Add New Organization
                    </a>}
                  </div>
                </div>
              </div>


              {loading ? (
                <Loading />
              ) : (
                <div className="col-12">
                  <div className="userManagmentContainer">
                    <div className="accordion" id="userManageList">
                      {organizations.map((org, index) => (
                        <Accordian title={org.org_name} key={index} prefix={<div className="form-check me-2 custCheck">
                          {superAdmin && <input className="form-check-input" type="checkbox" id={`addcheck-${org.org_id}`}
                            value="Add" onChange={(e) => { org.selected = e.target.checked; setResponse({contents:[...organizations]}) }} />}
                        </div>} extra={<div className="addNewUserCont">
                          {superAdmin && <a href={`/user-management/editorganization/${org.org_id}`} className="edit me-1">
                            <img src={editOrgicon} alt="Edit Organization" /> Edit Organization
                          </a>}
                          {superAdmin && <a href={`/user-management/vieworganization/${org.org_id}`} className="view me-1">
                            <img src={viewOrgicon} alt="View Organization" /> View Organization
                          </a>}
                          {operations?.find(item => item.operation_type_id === 1) && <a href={`/user-management/adduser/${org.org_id}`} className="add">
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
                    {/* <ChangePasswordModal id="changePassword" /> */}
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
