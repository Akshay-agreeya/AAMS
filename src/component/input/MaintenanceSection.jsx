import React, { useEffect, useState } from 'react';
import { getData } from '../../utils/CommonApi';

export const MaintenanceSection = ({ scanFrequency, scanDay, scheduleTime, onChange }) => {
    const [frequencies, setFrequencies] = useState([]);
    const [days, setDays] = useState([]);

    useEffect(() => {
        loadScanFrequencies();
        loadScanDays();
    }, []);

    const loadScanFrequencies = async () => {
        try {
            const resp = await getData("/lookup/frequency");
            const options = Array.isArray(resp.data)
                ? resp.data.map(item => ({ value: item.frequency_id, label: item.scan_frequency}))
                : [];
            options.unshift({ value: "", label: "Select Scan Frequency", props: { defaultValue: '', disabled: true } });
            setFrequencies(options);
        } catch (error) {
            console.error("Error fetching scan frequencies:", error);
        }
    };

    const loadScanDays = async () => {
        try {
            const resp = await getData("/lookup/scan-days");
            const options = Array.isArray(resp.data)
                ? resp.data.map(item => ({ value: item.day_id, label: item.day_name }))
                : [];
            options.unshift({ value: "", label: "Select Scan Day", props: { defaultValue: '', disabled: true } });
            setDays(options);
        } catch (error) {
            console.error("Error fetching scan days:", error);
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-lg-4">
                <select name="scanFrequency" value={scanFrequency} onChange={onChange} className="form-select">
                    {frequencies.map(option => (
                        <option key={option.value} value={option.value} {...option.props}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-12 col-lg-4">
                <select name="scanDay" value={scanDay} onChange={onChange} className="form-select">
                    {days.map(option => (
                        <option key={option.value} value={option.value} {...option.props}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-12 col-lg-4">
                <input type="time" name="scheduleTime" value={scheduleTime} onChange={onChange} className="form-control" />
            </div>
        </div>
    );
};
