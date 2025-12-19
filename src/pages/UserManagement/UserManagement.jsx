




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
import Pagenation from "../../component/Pagenation";

const UserManagement = () => {
  const [openOrgDeleteModal, setOpenOrgDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [pageSize] = useState(100); // Organizations per page

  const navigate = useNavigate();
  const superAdmin = isSuperAdmin();

  // Build the URL with pagination parameters
  const paginationUrl = `/org/list?page=${currentPage}&size=${pageSize}`;
  const { response, loading, setResponse, refetch } = useFetch(paginationUrl);

  const organizations = response?.contents || [];
  const totalPages = response?.totalPages || 1;
  const totalRecords = response?.totalRecords || 0;

  // Debug log to check response structure
  useEffect(() => {
    console.log("API Response:", response);
    console.log("Organizations:", organizations);
    console.log("Total Pages:", totalPages);
    console.log("Total Records:", totalRecords);
  }, [response]);

  const handleDeleteOrganization = async () => {
    const selectedOrg = organizations.filter(item => item.selected);
    const data = { org_ids: selectedOrg.map(item => item.org_id) };
    let success = false;
    try {
      const resp = await deleteData(`/org/delete`,  data);
      if (resp && (resp.message || resp.Message)) {
        notification.success({
          title: "Delete Organization",
          message: resp.message || resp.Message
        });
        success = true;
      } else {
        notification.error({
          title: 'Delete Organization',
          message: resp?.message || resp?.Message || 'Delete unsuccessful.'
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        title: 'Delete Organization',
        message: error?.data?.error || error?.message || 'Delete unsuccessful.'
      });
    } finally {
      // Always close modal after delete attempt
      setOpenOrgDeleteModal(false);
      // Refresh current page data if delete was successful
      if (success) refetch();
    }
  };

  const handlePageChange = (newPage) => {
    console.log("Page changed to:", newPage);
    setCurrentPage(newPage);
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
                  <h1>User Management - Organization ({totalRecords})</h1>
                  <div className="buttonContainer">
                    {superAdmin && (
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (organizations.filter(item => item.selected)?.length > 0)
                            setOpenOrgDeleteModal(true);
                        }}
                        className={`${organizations.filter(item => item.selected)?.length > 0 ? "delete-active" : "delete"} me-1`}
                      >
                        <i className="fa-regular fa-trash-can"></i> Delete
                      </a>
                    )}

                    {superAdmin && (
                      <>
                      <a href="/user-management/addorg" className="add">
                        <i className="fa-solid fa-plus"></i> Add New Organization
                      </a>

                      <a href="/uploadexcle" className="add">
                        <i className="fa-solid fa-plus"></i>       Upload Excel File

                      </a>
    </>
                    )}
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
                        <Accordian
                          title={org.org_name}
                          key={`${org.org_id}-${currentPage}`}
                          prefix={
                            <div className="form-check me-2 custCheck">
                              {superAdmin && (
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`addcheck-${org.org_id}`}
                                  value="Add"
                                  onChange={(e) => {
                                    org.selected = e.target.checked;
                                    setResponse({ ...response, contents: [...organizations] })
                                  }}
                                />
                              )}
                            </div>
                          }
                          extra={
                            <div className="addNewUserCont">
                              {superAdmin && (
                                <a href={`/user-management/editorganization/${org.org_id}`} className="edit me-1">
                                  <img src={editOrgicon} alt="Edit Organization" /> Edit Organization
                                </a>
                              )}
                              {superAdmin && (
                                <a href={`/user-management/vieworganization/${org.org_id}`} className="view me-1">
                                  <img src={viewOrgicon} alt="View Organization" /> View Organization
                                </a>
                              )}
                              {operations?.find(item => item.operation_type_id === 1) && (
                                <a href={`/user-management/adduser/${org.org_id}`} className="add">
                                  <i className="fa-solid fa-plus"></i> Add New User
                                </a>
                              )}
                            </div>
                          }
                        >
                          <UserTable org_id={org.org_id} />
                        </Accordian>
                      ))}
                    </div>

                    {/* Use your existing Pagenation component */}
                    <Pagenation
                      totalPages={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      hideOnSingle={true}
                    />

                    <DeleteConfirmationModal
                      modalId="deleteUserModal"
                      open={openOrgDeleteModal}
                      onDelete={handleDeleteOrganization}
                      onClose={() => { setOpenOrgDeleteModal(false) }}
                    />
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



























// import React, { useEffect, useState } from "react";
// import editOrgicon from "../../assets/images/iconWhiteEdit.svg";
// import viewOrgicon from "../../assets/images/iconWhiteView.svg";
// import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
// import Layout from '../../component/Layout';
// import Accordian from "../../component/accordian/Accordian";
// import { deleteData, getData } from "../../utils/CommonApi";
// import { UserTable } from "./UserTable";
// import { useNavigate } from "react-router-dom";
// import notification from "../../component/notification/Notification";
// import { getAllowedOperations, isSuperAdmin } from "../../utils/Helper";
// import { USER_MGMT } from "../../utils/Constants";
// import Loading from "../../component/Loading";
// import useFetch from "../../hooks/useFetch";


// const UserManagement = () => {
//   // const [organizations, setOrganizations] = useState([]);
//   // const [loading, setLoading] = useState(false); // Loading state added
//   const [openOrgDeleteModal, setOpenOrgDeleteModal] = useState(false); // Loading state added

//   const navigate = useNavigate();

//   const superAdmin = isSuperAdmin();

//   const { response, loading, setResponse } = useFetch("/org/list");
//   const organizations = response.contents || [];

//   const handleDeleteOrganization = async () => {
//     const selectedOrg = organizations.filter(item => item.selected);
//     const data = {
//       org_ids: selectedOrg.map(item => item.org_id)
//     };
//     try {
//       const resp = await deleteData(`/org/delete`, data);
//       notification.success({
//         title: `Delete Organization`,
//         message: resp.message
//       });
//       navigate(0);
//     } catch (error) {
//       console.log(error);
//       notification.error({
//         title: 'Delete Organization',
//         message: error.data?.error
//       });
//     }
//   };

//   const operations = getAllowedOperations(USER_MGMT);

//   return (
//     <Layout>
//       <div className="adaMainContainer">
//         <section className="adminControlContainer">
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="pageTitle">
//                   <h1>User Management - Organization ({organizations.length})</h1>
//                   <div className="buttonContainer">
//                     {superAdmin && <a href="/#" onClick={(e) => {
//                       e.preventDefault();
//                       if (organizations.filter(item => item.selected)?.length > 0)
//                         setOpenOrgDeleteModal(true);
//                     }} className={`${organizations.filter(item => item.selected)?.length > 0?"delete-active":"delete"} me-1`}>
//                       <i className={`fa-regular fa-trash-can`}></i> Delete
//                     </a>}
//                     {superAdmin && <a href="/user-management/addorg" className="add">
//                       <i className="fa-solid fa-plus"></i> Add New Organization
//                     </a>}
//                   </div>
//                 </div>
//               </div>


//               {loading ? (
//                 <Loading />
//               ) : (
//                 <div className="col-12">
//                   <div className="userManagmentContainer">
//                     <div className="accordion" id="userManageList">
//                       {organizations.map((org, index) => (
//                         <Accordian title={org.org_name} key={index} prefix={<div className="form-check me-2 custCheck">
//                           {superAdmin && <input className="form-check-input" type="checkbox" id={`addcheck-${org.org_id}`}
//                             value="Add" onChange={(e) => { org.selected = e.target.checked; setResponse({ contents: [...organizations] }) }} />}
//                         </div>} extra={<div className="addNewUserCont">
//                           {superAdmin && <a href={`/user-management/editorganization/${org.org_id}`} className="edit me-1">
//                             <img src={editOrgicon} alt="Edit Organization" /> Edit Organization
//                           </a>}
//                           {superAdmin && <a href={`/user-management/vieworganization/${org.org_id}`} className="view me-1">
//                             <img src={viewOrgicon} alt="View Organization" /> View Organization
//                           </a>}
//                           {operations?.find(item => item.operation_type_id === 1) && <a href={`/user-management/adduser/${org.org_id}`} className="add">
//                             <i className="fa-solid fa-plus"></i> Add New User
//                           </a>
//                           }
//                         </div>}>
//                           <UserTable org_id={org.org_id} />
//                         </Accordian>
//                       ))}
//                     </div>

//                     <DeleteConfirmationModal
//                       modalId="deleteUserModal"
//                       open={openOrgDeleteModal}
//                       onDelete={handleDeleteOrganization}
//                       onClose={() => { setOpenOrgDeleteModal(false) }}
//                     />
//                     {/* <ChangePasswordModal id="changePassword" /> */}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>
//     </Layout>
//   );
// };

// export default UserManagement;





// import React, { useState,useEffect } from "react";
// import editOrgicon from "../../assets/images/iconWhiteEdit.svg";
// import viewOrgicon from "../../assets/images/iconWhiteView.svg";
// import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
// import Layout from '../../component/Layout';
// import Accordian from "../../component/accordian/Accordian";
// import { deleteData } from "../../utils/CommonApi";
// import { UserTable } from "./UserTable";
// import { useNavigate } from "react-router-dom";
// import notification from "../../component/notification/Notification";
// import { getAllowedOperations, isSuperAdmin } from "../../utils/Helper";
// import { USER_MGMT } from "../../utils/Constants";
// import Loading from "../../component/Loading";
// import useFetch from "../../hooks/useFetch";
// import Pagenation from "../../component/Pagenation";

// const UserManagement = () => {
//   const [openOrgDeleteModal, setOpenOrgDeleteModal] = useState(false);

//   const navigate = useNavigate();
//   const superAdmin = isSuperAdmin();

//   // const { response, loading, setResponse } = useFetch("/org/list");
//   // const organizations = response.contents || [];



//   // 🔹 Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // 🔹 Fetch orgs with page_number + page_size
//   const { response, loading, setResponse } = useFetch(`/org/list?page_number=${currentPage}&page_size=5`);

//   const organizations = response?.contents || [];

//   useEffect(() => {
//     if (response?.total_pages) {
//       setTotalPages(response.total_pages);
//     }
//   }, [response]);




  
//   const handleDeleteOrganization = async () => {
//     const selectedOrg = organizations.filter(item => item.selected);
//     const data = {
//       org_ids: selectedOrg.map(item => item.org_id)
//     };
//     try {
//       const resp = await deleteData(`/org/delete`, data);
//       notification.success({
//         title: `Delete Organization`,
//         message: resp.message
//       });
//       navigate(0);
//     } catch (error) {
//       console.log(error);
//       notification.error({
//         title: 'Delete Organization',
//         message: error.data?.error
//       });
//     }
//   };

  
//   const operations = getAllowedOperations(USER_MGMT);

//   return (
//     <Layout>
//       <div className="adaMainContainer">
//         <section className="adminControlContainer">
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="pageTitle d-flex justify-content-between align-items-center">
//                   <h1>
//                     {/* User Management - Organization ({organizations.length}) */}
//                       User Management - Organization ({response?.total_count || 0})

//                   </h1>
//                   <div className="buttonContainer">
//                     {superAdmin && (
//                       <a
//                         href="/#"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           if (organizations.filter(item => item.selected)?.length > 0)
//                             setOpenOrgDeleteModal(true);
//                         }}
//                         className={`${organizations.filter(item => item.selected)?.length > 0
//                           ? "delete-active"
//                           : "delete"
//                           } me-1`}
//                       >
//                         <i className="fa-regular fa-trash-can"></i> Delete
//                       </a>
//                     )}
//                     {superAdmin && (
//                       <a href="/user-management/addorg" className="add">
//                         <i className="fa-solid fa-plus"></i> Add New Organization
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {loading ? (
//                 <Loading />
//               ) : (
//                 <div className="col-12">
//                   <div className="userManagmentContainer">
//                     <div className="accordion" id="userManageList">
//                       {organizations.map((org, index) => (
//                         <Accordian
//                           title={org.org_name}
//                           // key={index}
//                               key={org.org_id}

//                           prefix={
//                             <div className="form-check me-2 custCheck">
//                               {superAdmin && (
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   id={`addcheck-${org.org_id}`}
//                                   value="Add"
//                                   onChange={(e) => {
//                                     org.selected = e.target.checked;
//                                     setResponse({ contents: [...organizations] });
//                                   }}
//                                 />
//                               )}
//                             </div>
//                           }
//                           extra={
//                             <div className="addNewUserCont">
//                               {superAdmin && (
//                                 <a
//                                   href={`/user-management/editorganization/${org.org_id}`}
//                                   className="edit me-1"
//                                 >
//                                   <img src={editOrgicon} alt="Edit Organization" /> Edit Organization
//                                 </a>
//                               )}
//                               {superAdmin && (
//                                 <a
//                                   href={`/user-management/vieworganization/${org.org_id}`}
//                                   className="view me-1"
//                                 >
//                                   <img src={viewOrgicon} alt="View Organization" /> View Organization
//                                 </a>
//                               )}
//                               {operations?.find(item => item.operation_type_id === 1) && (
//                                 <a
//                                   href={`/user-management/adduser/${org.org_id}`}
//                                   className="add"
//                                 >
//                                   <i className="fa-solid fa-plus"></i> Add New User
//                                 </a>
//                               )}
//                             </div>
//                           }
//                         >
//                           <UserTable org_id={org.org_id} />
//                         </Accordian>
//                       ))}
//                     </div>


//                     <Pagenation
//                       totalPages={totalPages}
//                       page={currentPage}
//                       onChange={(pageNum) => setCurrentPage(pageNum)}
//                       hideOnSingle={false}
//                     />


//                     <DeleteConfirmationModal
//                       modalId="deleteUserModal"
//                       open={openOrgDeleteModal}
//                       onDelete={handleDeleteOrganization}
//                       onClose={() => setOpenOrgDeleteModal(false)}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>
//     </Layout>
//   );
// };

// export default UserManagement;


