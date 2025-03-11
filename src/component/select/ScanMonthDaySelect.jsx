import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select';
import { getData } from '../../utils/CommonApi';

export const ScanMonthDaySelect = ({ name = "scan_day_ids", mode, ...rest }) => {

    const [monhthDays, setMonthDays] = useState([]);

    useEffect(() => {
        loadScanMonthDays();
    }, []);

    const loadScanMonthDays = async () => {
        try {
            const resp = await getData("/lookup/scan-days");
            const options = Array.isArray(resp.content)
                ? resp.content.filter(item => item.Scan_day_id > 7).map((item) => ({
                    value: item.Scan_day_id,
                    label: item.day_name,
                }))
                : [];
            options.unshift({ value: "", label: "Select Scan Days", props: { defaultValue: '', disabled: true } });
            setMonthDays(options);
        } catch (error) {
            console.error("Error fetching scan days:", error);
        }
    };

    return (
        <Select
            name={name}
            options={monhthDays}
            multiple={mode === "multiple"}
            {...rest}
        />
    );
};
