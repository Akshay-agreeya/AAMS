import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../component/table/Table';
import { getData } from '../../utils/CommonApi';
import { convertProductPermission, getAllowedOperations, getFullName, getOperationsFromPermission, operationExist } from '../../utils/Helper';
import Loading from '../../component/Loading';
import { PRODUCT_PERMISSION } from '../../utils/Constants';

const ProductionPermissionTable = ({ org_id, onChange }) => {

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [productPermissions, setProductPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usersWithServices, setUsersWithServices] = useState([]);

    const operations = getAllowedOperations(PRODUCT_PERMISSION );

    const getOrganizationData = useCallback(async () => {
        try {
            setLoading(true);
            setUsers([]);
            setProducts([]);
            setUsersWithServices([]);
            // Fetch users and products in parallel
            const { Users, Service, allPermissions, prod_permissions } = await getData(`/permission/get/${org_id}`);

            // Handle users data
            if (Users) {
                // Fetch roles for users concurrently using Promise.all
                const usersWithRoles = await Promise.all(
                    Users.map(async (item, index) => {
                        const roleResp = await getData(`/role/get/${item.role_id}`);
                        return { ...item, id: index + 1, user_role: roleResp.details };
                    })
                );
                setUsers(usersWithRoles); // Set users with roles in one go
            }

            // Handle products data
            if (Service) {
                const processedProducts = Service.map((item, index) => ({
                    ...item,
                    id: index + 1
                }));
                setProducts(processedProducts); // Assuming you want to set products to state
            }
            // Handle products permission data
            if (allPermissions) {
                setProductPermissions(allPermissions); // Assuming you want to set products to state
            }
            // Handle products permission data
            if (prod_permissions) {
                setUsersWithServices(Object.values(convertProductPermission(prod_permissions)));
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [org_id]);


    useEffect(() => {
        if (org_id)
            getOrganizationData();
    }, [org_id, getOrganizationData]);

    useEffect(() => {
        onChange(usersWithServices);
    }, [usersWithServices]);

    const getTDComp = (menu_key, record) => {
        return (
            <div className="selectCheckRepeat">
                <div className="form-check custCheck me-3">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"
                        checked={operationExist(getOperationsFromPermission(record.user_role, menu_key), 3)} disabled />
                    <label className="form-check-label" htmlFor="inlineCheckbox1">View</label>
                </div>
                <div className="form-check custCheck">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"
                        checked={operationExist(getOperationsFromPermission(record.user_role, menu_key), 2)} disabled />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Edit</label>
                </div>
            </div>

        )
    }

    const permissionExist = useCallback((service_id, user_id, menu_key) => {
        const mKey = productPermissions?.find(item => item.product_permission_opr_name === menu_key)?.product_permission_opr_id;
        const operationIds = usersWithServices.find(item => item.user_id === user_id && item.service_id === service_id)?.product_permission_opr_ids;
        return operationIds?.includes(mKey);
    }, [usersWithServices, productPermissions]);

    const columns = [
        {
            title: 'Users',
            dataIndex: 'user_id',
            scope: 'col',
            width: '20%',
            render: (_, record) => (
                <>
                    {getFullName(record.first_name, record.last_name)}
                    <div className="roletype">Role: <span>{record.role_name}</span></div>
                </>
            )
        },
        {
            title: 'User Management',
            dataIndex: 'user_mgmt',
            scope: 'col',
            width: '13%',
            render: (_text, record) => (
                getTDComp("user_mgmt", record)
            )
        },
        {
            title: 'Role Management',
            dataIndex: 'role',
            scope: 'col',
            width: '13%',
            render: (_text, record) => (
                getTDComp("role_mgmt", record)
            )
        },
        {
            title: 'Product Permission',
            dataIndex: 'prodPer',
            scope: 'col',
            width: '13%',
            render: (_text, record) => (
                getTDComp("product_permission", record)
            )
        },
        {
            title: 'Product',
            dataIndex: 'product',
            scope: 'col',
            width: '15%',
            className: "tblDataOuter",
            render: () => (
                <div className="selectOptionRepeat">
                    <ul>
                        {products?.map((item, index) => <li key={index}><div className="form-check custCheck">{item.web_url}</div></li>)}
                    </ul>
                </div>

            )
        },
        {
            title: 'Product Management',
            dataIndex: 'product_mgmt',
            scope: 'col',
            width: '13%',
            className: "tblDataOuter",
            render: (_, record) => (
                <div className="selectOptionRepeat">
                    <ul>
                        {products?.map((item, index) => <li key={index}>
                            <div className="form-check custCheck">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox20"
                                    checked=
                                    {record.role_key !== 'User'
                                    ? true : permissionExist(item.service_id, record.user_id, 'Product_View')}
                                    value={item.service_id} onChange={(e) => { handlePermissionChanged(e, record, 'Product_View') }}
                                    disabled={record.role_key !== 'User' ||!operationExist(operations, 2)} />
                                <label className="form-check-label" htmlFor="inlineCheckbox20">View</label>
                            </div></li>)}
                    </ul>
                </div>
            )
        },
        {
            title: 'Reports',
            dataIndex: 'reports',
            scope: 'col',
            width: '13%',
            className: "tblDataOuter",
            render: (_, record) => (
                <div className="selectOptionRepeat">
                    <ul>
                        {products?.map((item, index) => <li key={index}><div className="form-check custCheck">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox20"
                                checked={record.role_key !== 'User'
                                ? true :permissionExist(item.service_id, record.user_id, 'Report_View')}
                                value={item.service_id} onChange={(e) => { handlePermissionChanged(e, record, 'Report_View') }} 
                                disabled={  record.role_key !== 'User' ||!operationExist(operations, 2)} />
                            <label className="form-check-label" htmlFor="inlineCheckbox20">View</label>
                        </div></li>)}
                    </ul>
                </div>

            )
        },
    ];

    const handlePermissionChanged = (e, record, menu_key) => {
        const mKey = productPermissions?.find(item => item.product_permission_opr_name === menu_key)?.product_permission_opr_id;
        const { value, checked } = e.target;

        // Create a copy of usersWithServices to avoid direct mutation
        const updatedUsersWithServices = [...usersWithServices];

        // Find the existing user-service pair
        let existData = updatedUsersWithServices.find(item => item.user_id === record.user_id && item.service_id === Number(value));

        if (checked) {
            if (existData) {
                // Add the permission operation ID if it doesn't exist
                if (!existData.product_permission_opr_ids.includes(mKey)) {
                    existData.product_permission_opr_ids = [...existData.product_permission_opr_ids, mKey];
                }
            } else {
                // If user-service pair doesn't exist, create a new entry
                updatedUsersWithServices.push({
                    user_id: record.user_id,
                    service_id: Number(value),
                    product_permission_opr_ids: [mKey] // Initialize with selected permission
                });
            }
        } else {
            if (existData) {
                // Remove the permission operation ID
                existData.product_permission_opr_ids = existData.product_permission_opr_ids.filter(item => item !== mKey);

                // Ensure an empty array is present instead of removing the object
                existData.product_permission_opr_ids = existData.product_permission_opr_ids.length ? existData.product_permission_opr_ids : [];
            }
        }

        // Update state with modified array
        setUsersWithServices([...updatedUsersWithServices]);
    };



    if (loading)
        return <Loading />

    return (
        <Table columns={columns} dataSource={users} pagenation={false} rowKey='user_id' />
    )
}

export default ProductionPermissionTable