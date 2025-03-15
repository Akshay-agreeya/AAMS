import React, { useEffect, useState } from 'react';


const data = ["aqmd.gov", "agreeya.com", "cogentcollection.com"];

export const OrganizationSelection = ({ onChange }) => {


    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');


    useEffect(() => {
        setProducts(data);
    }, [data]);

    useEffect(() => {
        setSelectedProduct(products?.[0]);
    }, [products]);


    const handleClick = (e, item) => {
        e.preventDefault();
        setSelectedProduct(item);
        if (onChange)
            onChange(item);
    }


    return (
        <span className="dropdown">
            <a className="custSiteReportName dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedProduct}
            </a>
            <ul className="dropdown-menu">
                {/* <li className="viewSiteReportName"><a className="dropdown-item" href="#">aqmd.gov</a></li>
                <li className="viewSiteReportName"><a className="dropdown-item" href="#">agreeya.com</a></li>
                <li className="viewSiteReportName"><a className="dropdown-item" href="#">cogentcollection.com</a></li> */}
                {products.map((item,index) => <li className="viewSiteReportName" key={index}><a className="dropdown-item" href="#"
                    onClick={(e) => { handleClick(e, item) }}>{item}</a></li>)
                }
            </ul>
        </span>
    )
}
