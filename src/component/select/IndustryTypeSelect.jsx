import React from 'react';
import { Select } from '../input/Select';

const industryTypes = [
    { value: '', label: "Select Industry Type", props: { defaultValue:'', disabled: true } },
    { value: "1", label: "IT" },
    { value: "2", label: "Healthcare" },
    { value: "3", label: "Education" }
];

export const IndustryTypeSelect = ({ name = "industry_type", ...rest }) => {

    return (
        <Select options={industryTypes} name={name} {...rest} />
    )
}