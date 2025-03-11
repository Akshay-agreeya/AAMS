import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select'; 
import { getData } from '../../utils/CommonApi';

export const ScanDaySelect = ({ name = "scan_day_ids", ...rest }) => {

    const [days, setDays] = useState([]);

    useEffect(() => {
        loadScanDays();
    }, []);

    const loadScanDays = async () => {
        try {
            const resp = await getData("/lookup/scan-days");
            const options = Array.isArray(resp.contents)
                ? resp.data.filter(item => item.Scan_day_id < 8).map((item) => ({
                    value: item.Scan_day_id,
                    label: item.day_name,
                }))
                : [];
            options.unshift({ value: "", label: "Select Scan Day", props: { defaultValue: '', disabled: true } });
            setDays(options);
        } catch (error) {
            console.error("Error fetching scan days:", error);
        }
    };

    return (
        <Select
            name={name}
            options={days}
            {...rest}
        />
    );
};
