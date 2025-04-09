import React from 'react'
import useFetch from '../../hooks/useFetch';
import { formattedDate } from '../input/DatePicker';
import { getPercentValue } from '../../utils/Helper';
import { DATE_FORMAT } from '../../utils/Constants';

const ScanDashboard = ({ product_id }) => {

    const { response } = useFetch(product_id ? `/report/get/assessments/${product_id}` : '');

    return (

        <div className="dashGraphicContainerWhite">
            <div className="heading">Last Scan Date & Time</div>
            {response.contents?.map(item => <div className="activityContainer flex-column">
                <div className="scannedTitle"><a href={`/reports/listing/viewreport/${item.assessment_id}`}>{item.report_name}</a></div>
                <div className="scannedIssueTime">{`Issues Found - ${getPercentValue(item.issues)}% | ${formattedDate(new Date(item.scan_date),DATE_FORMAT)}`}</div>
            </div>
            )}

        </div>
    )
}

export default ScanDashboard;