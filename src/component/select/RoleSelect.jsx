import React, { useEffect, useState } from 'react';
import { Select } from '../input/Select';
import { getData } from '../../utils/CommonApi';


export const RoleSelect = ({ name = "role_id", ...rest }) => {

    const [roles, setRoles] = useState([]);

    

    useEffect(()=>{
        loadRoles();
    },[]);

    const loadRoles = async()=>{
        try{
            const resp = await getData("/role/list");
            const options = resp.data.map(item=>({value: item.role_id, label: item.role_name}));
            options.splice(0,0, { value: "", label: "Select Role", props: { defaultValue:'', disabled: true } });
            setRoles(options);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <Select options={roles} name={name} {...rest} />
    )
}