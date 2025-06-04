import { useEffect, useState } from "react";

const FreeLiteAssessmentUrlInputDialog = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [freeLiteAssessmentUrl, setFreeLiteAssessmentUrl] = useState();

    const { modalId, handleFreeLiteAssessment, open, onClose = () => { } } = props;

    useEffect(() => {
        setShowModal(open);
    }, [open]);

    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    }

    return (
        <div className={`popUpMessageContainer ${showModal ? "d-block" : "d-none"}`}>
            <div className="modal fade show" id={modalId} tabIndex="-1" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>Enter Url</div>
                            <div>
                                <input placeholder="Enter url" className="w-100"
                                    onChange={(e) => { setFreeLiteAssessmentUrl(e.target.value) }} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={()=>handleFreeLiteAssessment(freeLiteAssessmentUrl)} className="btn btn-info" data-bs-dismiss="modal"
                                disabled={!freeLiteAssessmentUrl}>
                                Parse
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}
                                data-bs-dismiss="modal">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreeLiteAssessmentUrlInputDialog;