import React from 'react';
import ProductAccessibilityChart from './ProductAccessibilityChart';

const ProductGraph = () => {
    return (
        <div className="dashGraphicContainer">
            <div className="row">
                <div className="col-lg-1">
                    <div className="heading">Total Scanned Products</div>
                </div>
                <div className="col-lg-11">
                    <ProductAccessibilityChart/>
                </div>
            </div>
        </div>
    )
}

export default ProductGraph;