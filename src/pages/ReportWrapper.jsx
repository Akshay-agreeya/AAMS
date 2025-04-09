import React from 'react';
import UserReport from './user/report/UserReport';
import Reports from './Report/Reports';
import { ADMIN_ROLE_KEY, USER_ROLE_KEY } from '../utils/Constants';
import { getUserRoleKey } from '../utils/Helper';

const ReportWrapper = (props) => {
    const roleKey = getUserRoleKey();

    if (roleKey === USER_ROLE_KEY||roleKey === ADMIN_ROLE_KEY)
        return <UserReport {...props} />
  

    return (
        <Reports {...props} />
    )
}

export default ReportWrapper;