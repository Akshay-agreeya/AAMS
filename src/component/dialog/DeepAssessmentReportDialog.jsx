import React, { useEffect, useState } from 'react';

export const DeepAssessmentReportDialog = (props) => {
    const [showModal, setShowModal] = useState(false);

    const { modalId, onDelete, open, onClose = () => { } } = props;

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
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td></td>
                                                    <th scope="col">Report Name</th>
                                                    <th scope="col">Last Scan Date & Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault1"
                                                            id="flexRadioDefault1"
                                                            defaultChecked
                                                        />
                                                    </td>
                                                    <td scope="row">
                                                        <a href="viewAdminReport.html">AQMD Site Assessment Report-9</a>
                                                    </td>
                                                    <td>16 Jan 2025 - 20:55:12</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault1"
                                                            id="flexRadioDefault2"
                                                        />
                                                    </td>
                                                    <td scope="row">
                                                        <a href="viewAdminReport.html">AQMD Site Assessment Report-9</a>
                                                    </td>
                                                    <td>16 Jan 2025 - 20:55:12</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault1"
                                                            id="flexRadioDefault3"
                                                        />
                                                    </td>
                                                    <td scope="row">
                                                        <a href="viewAdminReport.html">AQMD Site Assessment Report-9</a>
                                                    </td>
                                                    <td>16 Jan 2025 - 20:55:12</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault1"
                                                            id="flexRadioDefault4"
                                                        />
                                                    </td>
                                                    <td scope="row">
                                                        <a href="viewAdminReport.html">AQMD Site Assessment Report-9</a>
                                                    </td>
                                                    <td>16 Jan 2025 - 20:55:12</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault1"
                                                            id="flexRadioDefault5"
                                                        />
                                                    </td>
                                                    <td scope="row">
                                                        <a href="viewAdminReport.html">AQMD Site Assessment Report-9</a>
                                                    </td>
                                                    <td>16 Jan 2025 - 20:55:12</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-12 mt-lg-0 mt-4">
                                    <h6>Manual Assessment List</h6>
                                    <div className="gridContainer" style={{ maxHeight: "350px" }}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td></td>
                                                    <th scope="col">Report Name</th>
                                                    <th scope="col">Last Scan Date & Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault6"
                                                            defaultChecked
                                                        />
                                                    </td>
                                                    <td scope="row">
                                                        <a href="viewAdminReport.html">AQMD Site Assessment Report-9</a>
                                                    </td>
                                                    <td>16 Jan 2025 - 20:55:12</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault7"
                                                        />
                                                    </td>
                                                    <td scope="row">
                                                        <a href="viewAdminReport.html">AQMD Site Assessment Report-9</a>
                                                    </td>
                                                    <td>16 Jan 2025 - 20:55:12</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault8"
                                                        />
                                                    </td>
                                                    <td scope="row">
                                                        <a href="viewAdminReport.html">AQMD Site Assessment Report-9</a>
                                                    </td>
                                                    <td>16 Jan 2025 - 20:55:12</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault9"
                                                        />
                                                    </td>
                                                    <td scope="row">
                                                        <a href="viewAdminReport.html">AQMD Site Assessment Report-9</a>
                                                    </td>
                                                    <td>16 Jan 2025 - 20:55:12</td>
                                                </tr>
                                            </tbody>
                                        </table>
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