import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select'; // Adjust the import path as needed
import { getData } from '../../utils/CommonApi';

export const WCAGVersionSelect = ({ name = "guideline_version_id", ...rest }) => {
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        loadWCAGVersions();
    }, []);

    const loadWCAGVersions = async () => {
        try {
            const resp = await getData("/lookup/guideline-version");
            const options = Array.isArray(resp.content)
                ? resp.content.map(item => ({ value: item.guidline_version_id, label: item.guideline }))
                : [];

            options.unshift({ value: "", label: "Select WCAG Version", props: { defaultValue: '', disabled: true } });
            setVersions(options);
        } catch (error) {
            console.error("Error fetching WCAG versions:", error);
        }
    };

    return (
        <Select
            options={versions}
            name={name}
            id="guideline_version_id"
            {...rest}
        />
    );
};
