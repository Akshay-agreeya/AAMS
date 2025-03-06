import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select';
import { getData } from '../../utils/CommonApi';

export const IndustryTypeSelect = ({ name = "industry_type", value, onChange = () => {}, ...rest }) => {
    const [industries, setIndustries] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState(value);

    useEffect(() => {
        setSelectedIndustry(value);
    }, [value]);

    useEffect(() => {
        loadIndustryTypes();
    }, []);

    const loadIndustryTypes = async () => {
        try {
            const resp = await getData("/lookup/industry-types"); 
            const options = Array.isArray(resp.data) 
                ? resp.data.map(item => ({ value: item.industry_type_id, label: item.industry_type })) 
                : [];
            
            options.unshift({ value: "", label: "Select Industry Type", props: { defaultValue: '', disabled: true } });
            setIndustries(options);
        } catch (error) {
            console.error("Error fetching industry types:", error);
        }
    };

    return (
        <Select
            options={industries}
            name={name}
            id="industry_type"
            value={selectedIndustry}
            onChange={(e) => {
                onChange(e);
                setSelectedIndustry(e.target.value);
            }}
            {...rest}
        />
    );
};
