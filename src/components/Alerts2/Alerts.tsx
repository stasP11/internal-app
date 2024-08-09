import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import './Alerts.scss'

export function SuccessAlert({ onClose, message }: any) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         {message}
        </Alert>
      </Collapse>
    </Box>
  );
}

export function ErrorAlert({ onClose, message }: any) {
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
        {message}
        </Alert>
      </Collapse>
    </Box>
  );
}

export function TimelinesAlert({ status, onClose }: any) {
  return (
    <div className="alert-window">
      {status?.type === "success" && <SuccessAlert onClose={onClose} message={status?.message} />}
      {status?.type === "error" && <ErrorAlert onClose={onClose} message={status?.message}/>}
      {status === null && <></>}
    </div>
  );
}