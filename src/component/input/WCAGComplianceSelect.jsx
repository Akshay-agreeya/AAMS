import React, { useEffect, useState } from 'react';
import { getData } from '../../utils/CommonApi';

export const WCAGComplianceLevelSelect = ({ className = "form-select", value, onChange, ...rest }) => {
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
        <select className={className} value={value} onChange={onChange} {...rest}>
            {levels.map(option => (
                <option key={option.value} value={option.value} {...option.props}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
