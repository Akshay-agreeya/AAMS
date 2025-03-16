import React from 'react';
import { Select } from '../input/Select';

const roleTypes = [{ value: "", label: "Select Role", props: { defaultValue: '', disabled: true } },
{ value: 'Admin', label: 'Admin' }, { value: 'User', label: 'User' }];

export const RoleTypeSelect = ({ name = "role_key", ...rest }) => {

    //const [roles, setRoles] = useState(roleTypes);

    return (
        <Select options={roleTypes} name={name} {...rest} />
    )
}