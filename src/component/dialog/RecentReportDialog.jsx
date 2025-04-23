import React, { useEffect, useState } from 'react';
import { getUserIdFromSession } from '../../utils/Helper';
import iconDocument from '../../assets/images/iconDocument.svg';
import { getData, patchData } from '../../utils/CommonApi';
import { getFormattedDateWithTime } from '../input/DatePicker';
import { DATE_TIME_FORMAT } from '../../utils/Constants';
import DownloadDocx from '../download/DownloadDocx';

const RecentReportDialog = () => {

    const userId = getUserIdFromSession();
    const [unseenReport, setUnseenReport] = useState({});

    const fetchData = async () => {

        try {
            const resp = await getData(`/dashboard/notifications/${userId}?latest_flag=1`);
            setUnseenReport(resp);
            console.log(resp)
        } catch (error) {
            console.log(error);
        }
    };

    const updateNotification = async () => {
        try {
            await patchData(`/dashboard/update-notification-status`, { notification_id: unseenReport.contents?.notification_id });
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userId)
            fetchData();
    }, [userId]);

    useEffect(() => {
        if (unseenReport.contents) {
            showModal(true);
            updateNotification();
        }
    }, [unseenReport]);

    const showModal = (status) => {
        const modalElement = document.getElementById('staticBackdrop');
        if (!modalElement) return;

        const myModal = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);

        status ? myModal.show() : myModal.hide();
    };

    if (!unseenReport.contents)
        return <></>

    return (
        <div className="popUpAccessibilityContainer">
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close" onClick={() => { showModal(false) }}></button>
                        </div>
                        <div className="modal-body">

                            <div className="heading">Accessibility Report <span> Generated</span></div>
                            <div className="message">Your new accessibility report has been <span>successfully created.</span></div>
                            <div className="reportNameContainer">
                                <div className="reportIcon">
                                    <img src={iconDocument} alt="Report Information" />
                                </div>
                                <div className="reportDescription">
                                    <div className="name">{unseenReport.contents?.summary_report_name}</div>
                                    <div className="date">{getFormattedDateWithTime(new Date(unseenReport.contents?.created_at), DATE_TIME_FORMAT)}</div>
                                </div>


                            </div>

                        </div>
                        <div className="modal-footer">
                            <DownloadDocx record={{
                                assessment_id: unseenReport.contents?.assessment_id,
                                scan_date: ''
                            }} titleText="Download Report" className="downloadReport"/>
                            {/* <a href="#" className="downloadReport">Download Report</a> */}
                            <a href={`/reports/listing/viewReport/${unseenReport.contents?.assessment_id}`} className="viewDetails">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RecentReportDialog