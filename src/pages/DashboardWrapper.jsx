import React from 'react';
import { getUserRoleKey } from '../utils/Helper';
import Dashboard from './Dashboard';
import { ADMIN_ROLE_KEY, USER_ROLE_KEY } from '../utils/Constants';
import UserDashboard from './user/dashboard/UserDashboard';
import AdminDashboard from './admin/AdminDashboard';


const DashboardWrapper = (props) => {

    const roleKey = getUserRoleKey();

    if (roleKey === USER_ROLE_KEY)
        return <UserDashboard {...props} />
    if (roleKey === ADMIN_ROLE_KEY)
        return <AdminDashboard {...props} />
    return (
        <Dashboard {...props} />
    )
}

export default DashboardWrapper;