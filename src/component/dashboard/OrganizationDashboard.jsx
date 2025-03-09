import React, { useState } from 'react';
import iconMoveForward from '../../assets/images/iconMoveForward.svg';
import Table from '../table/Table';


const OrganizationDashboard = () => {

    const [loading, setLoading] = useState(false);

    const [organizations, setOrganizations] = useState([{
        org_name: 'WIPRO',
        org_type: 'Health',
        admin: 'Mukesh Kumar',
        location: 'India, Mumbai',
        created: '02-15-2025'
    }]);

    const columns = [
        {
            title: 'Organization Name',
            dataIndex: 'org_name',
            scope: 'col',
            width: '20%',
        },
        {
            title: 'Type',
            dataIndex: 'org_type',
            scope: 'col',
            width: '20%',
        },
        {
            title: 'Admin',
            dataIndex: 'admin',
            scope: 'col',
            width: '20%',
            render: (text, record) => (
                <a href={`/admin/user-management/viewuser/${record.org_id || '66C68316-9212-4F68-9309-804A888425DB'}`}>{text}</a>
            )
        },
        {
            title: 'Location',
            dataIndex: 'location',
            scope: 'col',
            width: '20%',
        },
        {
            title: 'created on',
            dataIndex: 'created',
            scope: 'col',
            width: '20%',
        }
    ];


    return (
        <div className="dashGraphicContainerWhite">
            <div className="heading">All Organization(10)  <a href="/admin/user-management"><img src={iconMoveForward} alt="Click Here for next Page" /></a></div>
            <div className="gridContainer">
                <Table columns={columns} dataSource={organizations} pagenation={false} loading={loading} />
            </div>
        </div>
    )
}

export default OrganizationDashboard