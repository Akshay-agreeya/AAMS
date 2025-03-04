import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select';
import { getData } from '../../utils/CommonApi';


export const UserStatusSelect = ({ name = "role_id", ...rest }) => {

    const [status, setStatus] = useState([]);    

    useEffect(()=>{
        loadUserStatus();
    },[]);

    const loadUserStatus = async()=>{
        try{
            const resp = await getData("/lookup/user-status");
            const options = resp.data.map(item=>({value: item.user_status_id, label: item.status}));
            options.splice(0,0, { value: "", label: "Select Status", props: { defaultValue:'', disabled: true } });
            setStatus(options);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <Select options={status} name={name} {...rest} />
    )
}