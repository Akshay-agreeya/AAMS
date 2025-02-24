import React from 'react';
import { Select } from '../input/Select';

const organizationTypes = [
    { value: '', label: "Select Type of Organization", props: { defaultValue:'', disabled: true } },
    { value: 1, label: "Private" },
    { value: 2, label: "Government" },
    { value: 3, label: "Non-Profit" }
];

export const OrganizationTypeSelect = ({ name = "role", ...rest }) => {

    return (
        <Select options={organizationTypes} name={name}
            id="role"  {...rest} />
    )
}