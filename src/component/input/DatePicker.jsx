import React, { useEffect, useState } from 'react';

export const formattedDate = (date, dateFormat = "yyyy-MM-dd") => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0'); // Ensures day is two digits

    // Create a map to format based on the given dateFormat
    const formats = {
        "yyyy": year,
        "MM": month,
        "dd": day,
    };

    // Replace the date format with corresponding values from the map
    return dateFormat.replace(/yyyy|MM|dd/g, match => formats[match]);
};


const DatePicker = ({
    onChange = () => { },
    className = "form-control",
    placeholder = "Select Date",
    minDate,
    maxDate,
    dateFormat = "yyyy-MM-dd", // Use default format for HTML date input
    value,
    ...rest
}) => {
    const [date, setDate] = useState(value instanceof Date ? formattedDate(value) : formattedDate(new Date(value)));

    const handleChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        e.target.dateFormat = dateFormat;
        onChange(e);
    };



    return (
        <input
            type="date"
            className={className}
            placeholder={placeholder}
            value={date}
            onChange={handleChange}
            min={formattedDate(minDate)}
            max={formattedDate(maxDate)}
            {...rest}
        />
    );
};

export default DatePicker;
