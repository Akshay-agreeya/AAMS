import React, { useCallback, useEffect, useState } from "react";
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images//iconDelete.svg";
import DeleteConfirmationModal from "../../component/dialog/DeleteConfirmation";
import Layout from '../../component/Layout';
import { deleteData, getData } from "../../utils/CommonApi";
import Table from "../../component/table/Table";
import { formattedDate } from "../../component/input/DatePicker";
import { useNavigate } from "react-router-dom";
import notification from "../../component/notification/Notification";
import Loading from "../../component/Loading";
import { getAllowedOperations, getPagenationFromResponse, operationExist, getOrganizationIdFromSession,getUserRoleKey } from "../../utils/Helper";
import { DATE_FORMAT, ROLE_MGMT, SUPER_ADMIN, TABLE_RECORD_SIZE } from "../../utils/Constants";

const RoleManagement = () => {

  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagenation, setPagenation] = useState({});

  const navigate = useNavigate();

  const operations = getAllowedOperations(ROLE_MGMT);

  const getRoles = useCallback(async (page = 1) => {
    try {
      let resp;
      setLoading(true);
     const role_key = getUserRoleKey();
     if(role_key == SUPER_ADMIN){
     
      resp = await getData(`/role/list?page=${page}&size=${TABLE_RECORD_SIZE}`);
     }else{
       resp = await getData(`/role/list?page=${page}&size=${TABLE_RECORD_SIZE}&org_id=${getOrganizationIdFromSession()}`);
     
     }setRoles(resp.contents);
      setPagenation(getPagenationFromResponse(resp));
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRoles();
  }, [getRoles]);


  const handleDelete = async () => {
    try {
      const resp = await deleteData(`/role/delete/${selectedRoleId}`);
      notification.success({
        title: `Delete Role`,
        message: resp.message
      });
      navigate(0);
    }
    catch (error) {
      notification.error({
        title: 'Delete Role',
        message: error.data?.error
      });
    }
  }

  const columns = [{
    title: 'Role Name',
    dataIndex: 'role_name',
    scop: "col",
    width: '15%'
  },
  {
    title: 'Role Type',
    dataIndex: 'role_key',
    scop: "col",
    width: '15%'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    scop: 'col',
    width: '25%'
  },
  {
    title: 'Organization Name',
    dataIndex: 'org_name',
    scop: 'col',
    width: '15%'
  },
  {
    title: 'Created',
    dataIndex: 'creation_date',
    scop: 'col',
    width: '15%',
    render: (text) => (
      <span>{formattedDate(new Date(text),DATE_FORMAT)}</span>
    )
  },
  {
    title: 'Action',
    dataIndex: 'ction',
    scop: 'col',
    width: '20%',
    className: "text-center",
    render: (_, record) => (
      <>
        <a title="Edit Role" href={`/role-management/editrole/${record.role_id}`}
          className="me-3">
          <img src={editicon} alt="Edit Role" />
        </a>
         <a title="Delete Role"href="/">
          <img src={deleteicon} className="disabled" alt="Delete Role" onClick={(e) => {
            e.preventDefault();
            setSelectedRoleId(record.role_id);
            setIsModalVisible(true);
          }} />
        </a>
      </>
    )
  }];

  if (!operationExist(operations, 2) && !operationExist(operations, 4))
    columns.splice(columns.length - 1, 1);

  return (
    <Layout >
      <div className="adaMainContainer">

        {loading ? (
          <Loading />
        ) : (
          <section className="adminControlContainer">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="pageTitle">
                    <h1>Role Management</h1>
                    <div className="buttonContainer">
                      {operationExist(operations, 1) && <a href="/role-management/addrole" className="add">
                        + New Role
                      </a>}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="roleManagmentContainer">
                    <div className="gridContainer">
                      <Table columns={columns} dataSource={roles} rowKey="role_id"
                        pagenation={{ ...pagenation, onChange: getRoles }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <DeleteConfirmationModal modalId="deleteUserModal" onDelete={handleDelete}
          open={isModalVisible}
          onClose={() => { setIsModalVisible(false) }} />
      </div>
    </Layout>
  );
};

export default RoleManagement;
