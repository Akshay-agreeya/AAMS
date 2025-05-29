import React, { useEffect, useState } from 'react';
import { getData } from '../../utils/CommonApi';
import Table from '../table/Table';
import { getFormattedDateWithTime } from '../input/DatePicker';
import { API_BASE_URL } from '../../utils/Constants';

export const DeepAssessmentReportDialog = (props) => {
    const [showModal, setShowModal] = useState(false);

    const { product_id, open, onClose = () => { } } = props;

    const [reports, setReports] = useState([]);
    const [manualReports, setManualReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAssessmentId, setSelectedAssessmentId] = useState();
    const [selectedTransactionId, setSelectedTransactionId] = useState();


    useEffect(() => {
        const fetchReports = async () => {
            try {
                setSelectedAssessmentId(undefined);
                setLoading(true);
                const response = await getData(`/report/get/assessments/${product_id}`);
                setReports(response.contents);
                setSelectedAssessmentId(response.contents?.[0]?.assessment_id);
            }
            catch (error) {
                console.error("Error fetching reports:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchManualReports = async () => {
            try {
                setSelectedTransactionId(undefined);
                setLoading(true);
                const response = await getData(`/manual/list/${product_id}`);
                response.contents = response.contents?.map(item => ({ ...item, scan_date: item.timestamp }))
                setManualReports(response.contents);
                setSelectedTransactionId(response.contents?.[0]?.txn_id);
            }
            catch (error) {
                console.error("Error fetching reports:", error);
                setManualReports([]);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
        fetchManualReports();
    }, [product_id]);

    useEffect(() => {
        if (open) {
            document.body.classList.add("modal-open");
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px';
        }

        return () => {
            document.body.classList.remove("modal-open");
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [open]);

    useEffect(() => {
        setShowModal(open);
    }, [open]);

    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    }

    if (!open) return null;

    const reportColumns = [{
        title: '',
        dataIndex: 'checkbox',
        render: (_, record, index) => (
            <input
                className="form-check-input"
                type="radio"
                name={record.assessment_id ? "flexRadioDefault1" : "flexRadioDefault"}
                id={record.assessment_id || record.txn_id}
                defaultChecked={index === 0 ? true : false}
                onChange={() => {
                    record.assessment_id ? setSelectedAssessmentId(record.assessment_id) :
                        setSelectedTransactionId(record.txn_id);
                }}
            />
        )
    },
    {
        title: "Report Name",
        dataIndex: 'report_name',
        scop: 'col'
    },
    {
        title: "Last Scan Date & Time",
        dataIndex: 'scan_date',
        scop: 'col',
        render: (text) => (
            <span>{text ? getFormattedDateWithTime(new Date(text), "dd MMM yyyy - HH:mm:ss") : ''}</span>
        )
    }];

    const handleGenerateAndDownload = () => {
        try {
            window.open(`${API_BASE_URL}/misc/download-deep-docx?assessment_id=${selectedAssessmentId}&txn_id=${selectedTransactionId}`);
            return true;
        } catch (err) {
            console.error("Error downloading DOCX report:", err);
            return false;
        }
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`modal-backdrop fade ${showModal ? "show" : ""}`}
                style={{
                    opacity: showModal ? 0.5 : 0,
                    display: showModal ? "block" : "none"
                }}
            />

            {/* Modal */}
            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                id="deepAssessmentReport"
                tabIndex="-1"
                aria-labelledby="deepAssessmentReportLabel"
                aria-modal="true"
                role="dialog"
                style={{ display: showModal ? "block" : "none" }}
            >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deepAssessmentReportLabel">Deep Assessment Report</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleCloseModal}
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row myReportsGridContainer mt-0">
                                <div className="col-lg-6 col-12">
                                    <h6>Lite Assessment List</h6>
                                    <div className="gridContainer" style={{ maxHeight: "350px" }}>
                                        <Table columns={reportColumns} dataSource={reports} rowKey="report_id" loading={loading} />
                                    </div>
                                </div>

                                <div className="col-lg-6 col-12 mt-lg-0 mt-4">
                                    <h6>Manual Assessment List</h6>
                                    <div className="gridContainer" style={{ maxHeight: "350px" }}>
                                       
                                        <Table columns={reportColumns} dataSource={manualReports} rowKey="report_id" loading={loading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{ backgroundColor: "#06C" }}
                                onClick={handleGenerateAndDownload}
                                disabled={!selectedAssessmentId || !selectedTransactionId}
                            >
                                Generate & Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};