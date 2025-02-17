import React from "react";

const DeleteConfirmationModal = ({ modalId, onDelete }) => {
  return (
    <div className="popUpMessageContainer">
      <div className="modal fade" id={modalId} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="heading">Confirm Delete</div>
              <div className="message">Are you sure you want to delete this record?</div>
            </div>
            <div className="modal-footer">
              <button onClick={onDelete} className="btn btn-danger" data-bs-dismiss="modal">
                Delete Record
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
