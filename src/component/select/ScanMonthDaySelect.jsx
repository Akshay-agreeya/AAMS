import React, { useEffect, useState } from 'react';
import { getData } from '../../utils/CommonApi';

export const ScanMonthDaySelect = ({ name = "scan_day_ids", onChange, values=[] }) => {
    const [monthDays, setMonthDays] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(values);

    useEffect(() => {
        setSelectedOptions(values);
    }, [values]);

    useEffect(() => {
        loadScanMonthDays();
    }, []);

    const loadScanMonthDays = async () => {
        try {
            const resp = await getData("/lookup/scan-days");
            const options = Array.isArray(resp.contents)
                ? resp.contents.filter(item => item.Scan_day_id > 7).map((item) => ({
                    value: item.Scan_day_id,
                    label: item.day_name,
                }))
                : [];

            options.unshift({ value: "", label: "Select Scan Days", disabled: true });
            setMonthDays(options);
        } catch (error) {
            console.error("Error fetching scan days:", error);
        }
    };

    useEffect(() => {
        const options = { target: { name, multiple: true, selectedOptions: selectedOptions.map(item => ({ value: item })) } };
        if (onChange)
            onChange(options);
    }, [selectedOptions]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        setSelectedOptions(prevSelected =>
            checked && prevSelected.length < 2 ? [...prevSelected, Number(value)] : prevSelected.filter(item => item !== Number(value))
        );
    };

    const clearSelections = () => {
        setSelectedOptions([]);
    };

    return (
        <div className="dropdown form-control">
            <div className="dropdown-toggle" id="dropdownTrigger" data-bs-toggle="dropdown" aria-expanded="false">
                <span id="selectedText">{selectedOptions.length > 0 ? monthDays.filter(item => selectedOptions.includes(item.value)).map(item => item.label).join(", ") : "Scan Day"}</span>
                <span className="btn-clear" onClick={clearSelections} style={{ display: selectedOptions.length > 0 ? 'inline' : 'none' }}>&times;</span>
            </div>

            <ul className="dropdown-menu w-100" aria-labelledby="dropdownTrigger"
                style={{ overflowY: 'auto', maxHeight: '200px' }}>
                {monthDays.map(item => (
                    <li key={item.value} >
                        <label className="dropdown-item">
                            {item.value && <input
                                type="checkbox"
                                value={item.value}
                                checked={selectedOptions.includes(item.value)}
                                onChange={handleCheckboxChange}
                                disabled={item.disabled}
                            />}
                            {item.label}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
