import React from 'react';
import iconMoveForward from '../../assets/images/iconMoveForward.svg';
import Table from '../table/Table';
import { convertUtcToLocal, getAllowedOperations } from '../../utils/Helper';
import { formattedDate } from '../input/DatePicker';
import useFetch from '../../hooks/useFetch';
import { DATE_FORMAT, USER_MGMT } from '../../utils/Constants';


const UserTableDashboard = ({ org_id }) => {

    const { response, loading } = useFetch(`user/list/${org_id}?page=1&size=5`);

    const columns = [
        {
            title: "User Name",
            dataIndex: "username",
            width: "20%",
        },
        {
            title: "Email Address",
            dataIndex: "email",
            width: "20%",
            render: (email) => (
                <a href={`mailto:${email}`} className="text-primary underline">{email}</a>
            )
        },
        {
            title: "Phone",
            dataIndex: "phone_number",
            width: "20%",
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "20%",
            className: "text-center",
        },
        {
            title: "Created on",
            dataIndex: "created_on",
            width: "20%",
            render: (text) => (
                <span>{formattedDate(convertUtcToLocal(text), DATE_FORMAT)}</span>
            )
        },
    ];
    const operations = getAllowedOperations(USER_MGMT);

    return (
        <div className="dashGraphicContainerWhite">
            <div className="heading">{`All Users (${response.total_count})`}
                {operations?.find(item => item.operation_type_id === 1) && <a href="/admin/user-management"><img src={iconMoveForward} alt="Click Here for next Page" /></a>}
            </div>
            <div className="gridContainer">
                <Table columns={columns} dataSource={response.contents} pagenation={false} loading={loading} />
            </div>
        </div>
    )
}

export default UserTableDashboard;