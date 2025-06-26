import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select';
import { getData } from '../../utils/CommonApi';

export const FrequencySelect = ({ name = "frequency_id", ...rest }) => {

    const [frequencies, setFrequencies] = useState([]);

    useEffect(() => {
        loadFrequencies();
    }, []);

    const loadFrequencies = async () => {
        try {
            const resp = await getData("/lookup/frequency");
            const options = Array.isArray(resp.contents)
                ? resp.contents.map((item) => ({
                    value: item.frequency_id,
                    label: item.scan_frequency,
                }))
                : [];
            options.unshift({ value: "", label: "Select Scan Frequency", props: { defaultValue: '', disabled: true } });

            setFrequencies(options);
        } catch (error) {
            console.error("Error fetching scan frequencies:", error);
        }
    };

    return (
        <Select
            name={name}
            options={frequencies}
            id="frequency_id"
            {...rest}
        />
    );
};
