import React from 'react';
import { Select } from '../input/Select';

const countries = [
    { value: '', label: "Select Country", props: { defaultValue:'', disabled: true } },
    { value: "United States", label: "United States" },
    { value: "India", label: "India" },
    { value: "Japan", label: "Japan" }
];

export const CountrySelect = ({ name = "country", ...rest }) => {

    return (
        <Select options={countries} name={name} {...rest} />
    )
}