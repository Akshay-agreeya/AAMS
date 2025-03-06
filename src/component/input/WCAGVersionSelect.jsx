import React, { useEffect, useState } from 'react';
import { getData } from '../../utils/CommonApi';

export const WCAGVersionSelect = ({ className = "form-select", value, onChange, ...rest }) => {
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        loadWCAGVersions();
    }, []);

    const loadWCAGVersions = async () => {
        try {
            const resp = await getData("/lookup/guideline-version");
            const options = Array.isArray(resp.data)
                ? resp.data.map(item => ({ value: item.guideline_version_id, label: item.guideline }))
                : [];

            options.unshift({ value: "", label: "Select WCAG Version", props: { defaultValue: '', disabled: true } });
            setVersions(options);
        } catch (error) {
            console.error("Error fetching WCAG versions:", error);
        }
    };

    return (
        <select className={className} value={value} onChange={onChange} {...rest}>
            {versions.map(option => (
                <option key={option.value} value={option.value} {...option.props}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
