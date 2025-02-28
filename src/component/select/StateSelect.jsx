import React, { useEffect } from 'react';
import { Select } from '../input/Select';

const states = [
    { value: '', label: "Select State", props: { defaultValue:'', disabled: true } },
    { value: "Noida", label: "Noida" },
    { value: "Pune", label: "Pune" },
    { value: "Mumbai", label: "Mumbai" }];

export const StateSelect = ({ countryId, name = "state", ...rest }) => {

    useEffect(() => {

    }, [countryId]);

    return (
        <Select options={states} name={name} {...rest} />
    )
}