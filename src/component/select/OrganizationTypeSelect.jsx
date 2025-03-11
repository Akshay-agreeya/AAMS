import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select';
import { getData } from '../../utils/CommonApi';

export const OrganizationTypeSelect = ({ name = "role_id", value, onChange = () => {}, ...rest }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(value);

    useEffect(() => {
        setSelectedType(value);
    }, [value]);

    useEffect(() => {
        loadOrganizationTypes();
    }, []);

    const loadOrganizationTypes = async () => {
        try {
            const resp = await getData("lookup/org-types");
            const options = resp.contents.map(item => ({ value: item.org_type_id, label: item.org_type }));
            options.unshift({ value: "", label: "Select Type of Organization", props: { defaultValue: '', disabled: true } });
            setTypes(options);
        } catch (error) {
            console.log("Error fetching organization types:", error);
        }
    };

    return (
        <Select
            options={types}
            name={name}
            id="role_id"
            value={selectedType}
            onChange={(e) => {
                onChange(e);
                setSelectedType(e.target.value);
            }}
            {...rest}
        />
    );
};
