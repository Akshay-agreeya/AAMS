import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select';
import { getData } from '../../utils/CommonApi';


export const UserStatusSelect = ({ name = "role_id", value, onChange = () => { }, ...rest }) => {

    const [status, setStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(value);

    useEffect(() => {
        setSelectedStatus(value);
    }, [value,status]);

    useEffect(() => {
        loadUserStatus();
    }, []);

    const loadUserStatus = async () => {
        try {
            const resp = await getData("/lookup/user-status");
            const options = resp.data.map(item => ({ value: item.user_status_id, label: item.status }));
            options.splice(0, 0, { value: "", label: "Select Status", props: { defaultValue: '', disabled: true } });
            setStatus(options);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Select options={status} value={selectedStatus} name={name} onChange={(e) => {
            onChange(e);
            setSelectedStatus(e.target.value)
        }} {...rest} />
    )
}