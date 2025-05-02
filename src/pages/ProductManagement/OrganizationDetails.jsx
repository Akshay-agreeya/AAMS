import React, { useEffect, useState } from 'react'
import { postData } from '../../utils/CommonApi';
import { getShortAddress } from '../../utils/Helper';

export const OrganizationDetails = ({org_id}) => {

    const[details, setDetails] = useState({});

    useEffect(()=>{
        getOrganizationDetails();
    },[org_id]);

    const getOrganizationDetails = async()=>{
        try{
            const resp = await postData(`/org/get`,{org_id});
            setDetails(resp.contents?.[0]);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <div className="userDetails">
                <span className="title"> Name</span>
                <span className="desc">{`${details.first_name || ''} ${details.last_name || ''}`}</span>
            </div>
            <div className="userDetails">
                <span className="title"> Email Address</span>
                <span className="desc">{details.email}</span>
            </div>
            <div className="userDetails contactPh">
                <span className="title">Phone Number</span>
                <span className="desc">{details.phone_number}</span>
            </div>
            <div className="userDetails">
                <span className="title"> Location</span>
                <span className="desc">{getShortAddress(details)}</span>
            </div>
        </>
    )
}
