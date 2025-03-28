import React, { useCallback, useEffect, useState } from 'react';
import { getData } from '../../utils/CommonApi';

const ComplieneGraph = () => {

    const [compliant, setCompliant] = useState({});


    const getCompliant = useCallback(async () => {
        try {
            const resp = await getData(`/dashboard/total-products-compliance`);
            setCompliant(resp.contents);
        }
        catch (error) {
            console.log(error);
        }
    }, []);


    useEffect(() => {
        getCompliant();
    }, [getCompliant]);


    return (
        <div className='activityLeft'>
            <div className="graphOuter">
                <div className="overAllQyalityCircle">
                    <div className="overAllQyality-text">
                        <span className="number">{compliant.non_compliant_percentage}</span>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <span className='userAddStatus report'></span>
                <span>{`Product Compliant (${compliant.compliant_products})`}</span>
            </div>
            <div className=''>
                <span className='userAddStatus productComp'></span>
                <span>{`Product non-Compliant (${compliant.non_compliant_products})`}</span>
            </div>
        </div>
    )
}

export default ComplieneGraph;