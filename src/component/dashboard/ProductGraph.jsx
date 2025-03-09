import React from 'react';
import dashboardGraph1 from '../../assets/images/dashboardGraph1.png';

const ProductGraph = () => {
    return (
        <div className="dashGraphicContainer">
            <div className="row">
                <div className="col-lg-1">
                    <div className="heading">Total Scanned Products</div>
                </div>
                <div className="col-lg-11">
                    <img src={dashboardGraph1} alt="Total Scanned Products" />
                </div>
            </div>
        </div>
    )
}

export default ProductGraph;