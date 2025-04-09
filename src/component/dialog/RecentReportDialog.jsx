import React from 'react'

const RecentReportDialog = () => {
    return (
        <div className="popUpAccessibilityContainer">
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="heading">Accessibility Report <span> Generated</span></div>
                            <div className="message">Your new accessibility report has been <span>successfully created.</span></div>
                            <div className="reportNameContainer">
                                <div className="reportIcon"><img src="images/iconDocument.svg" alt="Report Information"/></div>
                                <div className="reportDescription">
                                    <div className="name">AQMD Site Assessment Report-3</div>
                                    <div className="date">16 Jan 2025</div>
                                </div>


                            </div>

                        </div>
                        <div className="modal-footer">
                            <a href="#" className="downloadReport">Download Report</a>
                            <a href="viewReport.html" className="viewDetails">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RecentReportDialog