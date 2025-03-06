import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select'; // Adjust the import path as needed
import { getData } from '../../utils/CommonApi';

export const WCAGComplianceLevelSelect = ({ name = "compliance_level_id", ...rest }) => {
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        loadComplianceLevels();
    }, []);

    const loadComplianceLevels = async () => {
        try {
            const resp = await getData("/lookup/compliance-level");
            const options = Array.isArray(resp.data)
                ? resp.data.map(item => ({ value: item.compliance_level_id, label: item.level }))
                : [];

            options.unshift({ value: "", label: "Select Compliance Level", props: { defaultValue: '', disabled: true } });
            setLevels(options);
        } catch (error) {
            console.error("Error fetching compliance levels:", error);
        }
    };

    return (
        <Select
            options={levels}
            name={name}
            id="compliance_level_id"
            {...rest}
        />
    );
};
