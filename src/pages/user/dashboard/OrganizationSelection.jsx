import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../component/Loading';
import { ADMIN_ROLE_KEY, USER_REPORT_PERMISSION } from "../../../utils/Constants";
import { getOrganizationIdFromSession, getUserRoleKey } from '../../../utils/Helper';

const SELECTED_ORG_KEY = "selected_organization";

export const OrganizationSelection = ({ onChange }) => {
    const roleKey = getUserRoleKey();
    const [selectedProduct, setSelectedProduct] = useState('');
    const { response, loading } = useFetch(
        roleKey === ADMIN_ROLE_KEY
            ? `report/get/urls/${getOrganizationIdFromSession()}`
            : `/report/get/user-urls?permission_name=${USER_REPORT_PERMISSION}`
    );

    useEffect(() => {
        if (response?.contents?.length > 0) {
            // Try to load previously selected org from sessionStorage
            const stored = sessionStorage.getItem(SELECTED_ORG_KEY);
            const matchedItem = response.contents.find(item => item.web_url === stored);

            const selected = matchedItem || response.contents[0];

            setSelectedProduct(selected.web_url);
            sessionStorage.setItem(SELECTED_ORG_KEY, selected.web_url);

            if (onChange) onChange(selected);
        }
    }, [response]);

    const handleClick = (e, item) => {
        e.preventDefault();
        setSelectedProduct(item.web_url);
        sessionStorage.setItem(SELECTED_ORG_KEY, item.web_url);
        if (onChange) onChange(item);
    };

    if (loading) return <Loading />;

    return (
        <span className="dropdown">
            <a
                className="custSiteReportName dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {selectedProduct}
            </a>
            <ul className="dropdown-menu">
                {response?.contents?.map((item, index) => (
                    <li className="viewSiteReportName" key={index}>
                        <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => handleClick(e, item)}
                        >
                            {item.web_url}
                        </a>
                    </li>
                ))}
            </ul>
        </span>
    );
};
