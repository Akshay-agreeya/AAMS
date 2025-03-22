import React, { useCallback, useEffect, useState } from 'react'
import Table from '../table/Table'
import { getData } from '../../utils/CommonApi';

const ExpiringClientServices = () => {

    const [expiringServices, setExpiringServices] = useState([]);


    const getxpiringServices = useCallback(async () => {
        try {
            const resp = await getData(`/dashboard/expiring-services?days=30&size=50`);
            setExpiringServices(resp.contents);
        }
        catch (error) {
            console.log(error);
        }
    }, []);


    useEffect(() => {
        getxpiringServices();
    }, [getxpiringServices]);

    const columns = [
        {
            title: 'Organization Name',
            dataIndex: 'expiry',
            scope: "col",
            width: "60%",
            render: (_, record) => (<>
                <div className="orgname">{record.organization_name}</div>
                <div className="prodDetail"><a href="#">{record.service_type}</a></div>
            </>
            )
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiry',
            scope: "col",
            width: "40%",
            render: (_, record) => (
                <div className="expDetail">{record.expiry_date}</div>
            )
        }
    ]

    return (
        <div>
            <Table columns={columns} dataSource={expiringServices} />
            {/* <table>
                <thead>
                    <tr>
                        <th scope="col" width="60%">Organization Name</th>
                        <th scope="col" width="40%">Expiry Date</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">
                            <div className="orgname">WIPRO</div>
                            <div className="prodDetail"><a href="#">Website Scanned</a></div>
                        </td>
                        <td>
                            <div className="expDetail">02-15-2025</div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className="orgname">SIP</div>
                            <div className="prodDetail"><a href="#">PDF Scanned</a></div>
                        </td>
                        <td>
                            <div className="expDetail">02-15-2025</div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className="orgname">TATA</div>
                            <div className="prodDetail"><a href="#">Mobile App</a></div>
                        </td>
                        <td>
                            <div className="expDetail">02-15-2025</div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className="orgname">WIPRO</div>
                            <div className="prodDetail"><a href="#">Website Scanned</a></div>
                        </td>
                        <td>
                            <div className="expDetail">02-15-2025</div>
                        </td>
                    </tr>

                </tbody>
            </table> */}
        </div>
    )
}

export default ExpiringClientServices