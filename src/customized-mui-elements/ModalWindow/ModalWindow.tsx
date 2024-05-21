import "./ModalWindow.scss"
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function FilterModal({ open, onAction, children }: any) {
  const handleClose = () => onAction(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="filter-modal-content">
          {children}
          </div>
        </Box>
      </Modal>
    </div>
  );
}


export function ApproveWindow({open, onApprove, onCancel }: any){
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        closeAfterTransition
      >
        <Box sx={style}>
          <div className="filter-modal-content">
              <h1>Warning!</h1> 
              <p>Are you sure you want to delete this line?</p>
              <p>The changes are irreversible!</p>
          </div>
          <button onClick={onApprove}>Yes</button>
          <button onClick={onCancel}>No</button>
        </Box>
      </Modal>
    </div>
  );
}
