import React, { useEffect, useState } from "react";
import editOrgicon from "../../assets/images/iconWhiteEdit.svg";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import Layout from '../../component/Layout';
import ChangePasswordModal from '../../common/auth/ChangePassword'
import Accordian from "../../component/accordian/Accordian";
import { deleteData, getData } from "../../utils/CommonApi";
import { UserTable } from "./UserTable";
import { useNavigate } from "react-router-dom";
import notification from "../../component/notification/Notification";

const UserManagement = () => {
  const [organizations, setOrganizations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getOrganizations();
  }, [])

  const getOrganizations = async () => {
    try {
      const resp = await getData("/org/list");
      setOrganizations(resp.data.organizations);
    }
    catch (error) {
      console.log(error);
    }
  }
  const handleDeleteOrganization = async () => {
    const selectedOrg = organizations.filter(item => item.selected);
    const data = {
      org_ids:selectedOrg.map(item=>item.org_id)
   }
    try {
      const resp = await deleteData(`/org/delete`,data);
      notification.success({
        title: `Delete Organization`,
        message: resp.message
      });
      navigate(0);
    }
    catch (error) {
      console.log(error);
      notification.error({
        title: 'Delete Organization',
        message: error.data?.error
      })
    }
  }

  return (
    <Layout>
      <div className="adaMainContainer">
        {/* Breadcrumb */}
        {/* Admin Panel Content */}
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>User Management - Organization ({organizations.length})</h1>
                  <div className="buttonContainer">
                    <a href="#" onClick={(e)=>{e.preventDefault()}} className="delete me-1" data-bs-toggle={organizations.filter(item => item.selected).length > 0 ? "modal" : ""} data-bs-target="#deleteUserModal">
                      <i className="fa-regular fa-trash-can"></i> Delete
                    </a>
                    <a href="/admin/user-management/addorg" className="add">
                      <i className="fa-solid fa-plus"></i> Add New Organization
                    </a>
                  </div>
                </div>
              </div>

              {/* Accordion Section */}
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
                        <a href={`/admin/user-management/adduser/${org.org_id}`} className="add">
                          <i className="fa-solid fa-plus"></i> Add New User
                        </a>
                      </div>}>
                        <UserTable org_id={org.org_id}/>
                      </Accordian>
                    ))}
                  </div>
                  {/* Accordion Ends */}
                  {/* Delete Confirmation Modal - Reusable Component */}
                  <DeleteConfirmationModal modalId="deleteUserModal" onDelete={handleDeleteOrganization}/>
                  <ChangePasswordModal id="changePassword" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div >
    </Layout >
  );
};

export default UserManagement;
