import { useEffect, useState } from "react";

const DeleteConfirmationModal = (props) => {

  const [showModal, setShowModal] = useState(false);

  const { modalId, onDelete, open, onClose = () => { } } = props;

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
              <div className="heading">Confirm Delete</div>
              <div className="message">Are you sure you want to delete this record?</div>
            </div>
            <div className="modal-footer">
              <button onClick={onDelete} className="btn btn-danger" data-bs-dismiss="modal">
                Delete Record
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal} data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;