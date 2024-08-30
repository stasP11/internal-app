import { useState } from "react";
import CustomDialog from "customized-mui-elements/Dialog/CustomDialog";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import {
  DataSteward,
  DataStewardActiveStatus,
} from "pages/data-stewards-page/mockDataStewards";
interface AddDataStewardDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newSteward: DataSteward) => void;
}

function AddDataStewardDialog({
  open,
  onClose,
  onSave,
}: AddDataStewardDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = () => {
    if (name && email && status) {
      const newSteward = {
        id: Date.now(), //NOT RECOMMENDED FOR PRODUCTION, WILL CHANGE WHEN CONNECTED TO ENDPOINT
        name,
        email,
        active:
          status === "active"
            ? (1 as DataStewardActiveStatus)
            : (0 as DataStewardActiveStatus),
      };
      onSave(newSteward);
      onClose();
    } else {
      alert("All fields are required.");
    }
  };

  const actions = [
    { text: "Cancel", handler: onClose },
    { text: "Save", handler: handleSave },
  ];

  return (
    <CustomDialog
      opened={open}
      title="Add New Data Steward"
      actions={actions}
      onClose={onClose}
    >
      <Box
        sx={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextField
          label="Data Steward Name"
          placeholder="Data Steward Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="active">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    background: "#94D244",
                    borderRadius: "50%",
                    marginTop: "-2px",
                  }}
                ></div>
                <span
                  style={{ lineHeight: "24px", fontFamily: "Helvetica Neue" }}
                >
                  Active
                </span>
              </div>
            </MenuItem>
            <MenuItem value="onHold">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    background: "#E05781",
                    borderRadius: "50%",
                    marginTop: "-2px",
                  }}
                ></div>
                <span
                  style={{ lineHeight: "24px", fontFamily: "Helvetica Neue" }}
                >
                  On Hold
                </span>
              </div>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </CustomDialog>
  );
}

export default AddDataStewardDialog;
