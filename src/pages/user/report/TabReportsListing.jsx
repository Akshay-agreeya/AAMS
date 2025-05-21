import React, { useState } from 'react';
import ReportTable from '../../Report/ReportTable';
import Pagenation from '../../../component/Pagenation';
import ManualReportTable from '../../Report/ManualTableReport';
import { DeepAssessmentReportDialog } from '../../../component/dialog/DeepAssessmentReportDialog';

const TabReportsListing = ({ product_id, org_id, selected_tab = "1" }) => {

    const [openModal, setOpenModal] = useState();

    const [selectedTab, setSelectedTab] = useState(parseInt(selected_tab));

    return (
        <div className="col-12">
            <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className={`nav-link ${selectedTab === 1 ? "active" : ""} py-3`} id="nav-lite-tab" data-bs-toggle="pill"
                        data-bs-target="#nav-lite" type="button" role="tab"
                        aria-controls="nav-lite" aria-selected="true"
                        onClick={() => { setSelectedTab(1) }}>Lite Assessment
                        Report</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`nav-link py-3 ${selectedTab === 2 ? "active" : ""}`} id="nav-manual-tab" data-bs-toggle="pill"
                        data-bs-target="#nav-manual" type="button" role="tab"
                        aria-controls="nav-manual" aria-selected="false"
                        onClick={() => { setSelectedTab(2) }}>Manual Assessment
                        Report</button>
                </li>

            </ul>
            <div className="tab-content  px-4 pb-4 pt-2 border border-top-0 bg-white shadow"
                id="nav-tabContent">
                <div className={`tab-pane fade ${selectedTab === 1 ? "show active" : ""}`} id="nav-lite" role="tabpanel"
                    aria-labelledby="nav-lite-tab">
                    <div className="col-12 mb-3">
                        <h2 className="">Lite Assessment Report Listing</h2>
                    </div>
                    <div className="col-12">
                        <div className="gridContainer">
                            {/* Reports Table */}
                            <ReportTable product_id={product_id} org_id={org_id} />
                        </div>
                        {/* Pagination */}
                        <div className="col-12">
                            <Pagenation />
                        </div>
                    </div>
                </div>
                <div className={`tab-pane fade ${selectedTab === 2 ? "show active" : ""}`} id="nav-manual" role="tabpanel"
                    aria-labelledby="nav-manual-tab">
                    <div className="col-12 mb-3">
                        <div className="d-md-flex justify-content-between align-items-center">
                            <h2 className="">Manual Assessment Report Listing</h2>
                            <button className="btn btn-sm btn-success"
                                onClick={() => { setOpenModal(true) }}>Deep Assessment
                                Report</button>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="gridContainer">
                            <div className="gridContainer">
                                {/* Reports Table */}
                                <ManualReportTable product_id={product_id} org_id={org_id} />
                            </div>
                            {/* Pagination */}
                            <div className="col-12">
                                <Pagenation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Deep assessment report pop up starts */}
            <DeepAssessmentReportDialog open={openModal} onClose={() => { setOpenModal(false) }} />

        </div>

    )
}

export default TabReportsListing