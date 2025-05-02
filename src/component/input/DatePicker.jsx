import React, { useEffect, useState } from 'react';

// Month names
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const monthAbbrs = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

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


export const getFormattedDateWithTime = (date, dateFormat = "dd MMM yyyy - HH:mm:ss") => {
    if (!date) return '';

    const year = date.getFullYear();
    const monthIndex = date.getMonth(); // 0-based month index
    const day = String(date.getDate()).padStart(2, '0'); // Ensures day is two digits
    const hours = String(date.getHours()).padStart(2, '0'); // 24-hour clock
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Seconds

    const period = hours >= 12 ? 'PM' : 'AM';
    // Create a map to format based on the given dateFormat

    // Convert hours to 12-hour format
    const formattedHours = String(hours % 12 || 12).padStart(2, '0');  // If 0, use 12

    const formats = {
        "yyyy": year,
        "MM": String(monthIndex + 1).padStart(2, '0'), // Numeric month
        "MMM": monthAbbrs[monthIndex], // Abbreviated month name
        "MMMM": monthNames[monthIndex], // Full month name
        "dd": day,
        "HH": String(hours).padStart(2, '0'), 
        "hh": formattedHours,
        "mm": minutes,
        "ss": seconds,
        "a": period
    };

    // Replace the date format with corresponding values from the map
    return dateFormat.replace(/yyyy|MMM|MMMM|MM|dd|HH|hh|mm|ss|a/g, match => formats[match]);
};
export const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

    useEffect(() => {
        if (value)
            setDate(value instanceof Date ? formattedDate(value) : formattedDate(new Date(value)));
        else
            setDate('');
    }, [value]);

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
