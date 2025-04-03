import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../component/Loading';
import {USER_REPORT_PERMISSION} from "../../../utils/Constants";


export const OrganizationSelection = ({ onChange }) => {


    const [selectedProduct, setSelectedProduct] = useState('');
    const {response,loading} = useFetch(`/report/get/user-urls?permission_name=${USER_REPORT_PERMISSION}`);


    useEffect(() => {
        setSelectedProduct(response?.contents?.[0].web_url);
        if (onChange)
            onChange(response?.contents?.[0]);
    }, [response]);


    const handleClick = (e, item) => {
        e.preventDefault();
        setSelectedProduct(item.web_url);
        if (onChange)
            onChange(item);
    }

    if(loading)
        return <Loading/>

    return (
        <span className="dropdown">
            <a className="custSiteReportName dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedProduct}
            </a>
            <ul className="dropdown-menu">
                {response?.contents?.map((item,index) => <li className="viewSiteReportName" key={index}><a className="dropdown-item" href="#"
                    onClick={(e) => { handleClick(e, item) }}>{item.web_url}</a></li>)
                }
            </ul>
        </span>
    )
}
