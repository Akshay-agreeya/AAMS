import React from 'react';
import { Select } from '../input/Select';

const organizationTypes = [
    { value: '', label: "Select Type of Organization", props: { defaultValue:'', disabled: true } },
    { value: "Private", label: "Private" },
    { value: "Government", label: "Government" },
    { value: "Non-Profit", label: "Non-Profit" }
];

export const OrganizationTypeSelect = ({ name = "role", ...rest }) => {

    return (
        <Select options={organizationTypes} name={name}
            id="role"  {...rest} />
    )
}