import React, { useCallback, useEffect, useState } from 'react';
import iconMoveForward from '../../assets/images/iconMoveForward.svg';
import Table from '../table/Table';
import { postData } from '../../utils/CommonApi';
import { getFullName, getShortAddress } from '../../utils/Helper';
import { formattedDate } from '../input/DatePicker';


const OrganizationDashboard = () => {

    const [loading, setLoading] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [totalOrganizations, setTotalOrganizations] = useState(0);

    const getOrganizations = useCallback(async () => {
        try {
            const resp = await postData(`/org/get?size=5`);

            // Await the result of each individual `postData` call
            // const organizationsWithDetails = await Promise.all(
            //     resp.contents.map(async (item) => {
            //         const details = await postData(`/org/get`, { org_id: item.org_id });
            //         return { ...item, ...details.contents?.[0] }; // Add details to each item
            //     })
            // );

            setOrganizations(resp.contents);
            setTotalOrganizations(resp.total_count);
        }
        catch (error) {
            console.log(error);
        }
    }, []);


    useEffect(() => {
        getOrganizations();
    }, [getOrganizations]);


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
                <a href={`/admin/user-management/vieworganization/${record.org_id}`}>{
                    getFullName(record.first_name, record.last_name)
                }</a>
            )
        },
        {
            title: 'Location',
            dataIndex: 'location',
            scope: 'col',
            width: '20%',
            render: (_,record)=>(
                <span>{getShortAddress(record)}</span>
            )
        },
        {
            title: 'Created on',
            dataIndex: 'creation_date',
            scope: 'col',
            width: '20%',
            render: (text)=>(
                <span>{formattedDate(new Date(text),"dd-MM-yyyy")}</span>
            )
        }
    ];


    return (
        <div className="dashGraphicContainerWhite">
            <div className="heading">{`All Organization(${totalOrganizations})`}  <a href="/admin/user-management"><img src={iconMoveForward} alt="Click Here for next Page" /></a></div>
            <div className="gridContainer">
                <Table columns={columns} dataSource={organizations} pagenation={false} loading={loading} />
            </div>
        </div>
    )
}

export default OrganizationDashboard