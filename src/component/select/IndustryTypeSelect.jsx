import React from 'react';
import { Select } from '../input/Select';

const industryTypes = [
    { value: '', label: "Select Industry Type", props: { defaultValue:'', disabled: true } },
    { value: "IT", label: "IT" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Education", label: "Education" }
];

export const IndustryTypeSelect = ({ name = "industry_type", ...rest }) => {

    return (
        <Select options={industryTypes} name={name} {...rest} />
    )
}