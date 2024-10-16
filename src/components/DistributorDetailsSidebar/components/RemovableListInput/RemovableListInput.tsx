import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import InfoLabel from "../InfoLabel/InfoLabel";
import { DeleteOutline } from "@mui/icons-material";
import { isValidEmail } from "utils/isValidEmail";
import DeleteItemDialog from "components/DeleteItemDialog/DeleteItemDialog";
import { useState } from "react";
import { isValidPhoneNumber } from "utils/isValidPhoneNumber";

interface RemovableListInputProps {
  items: string[];
  handleDelete: (index: number) => void;
  handleChange: (index: number, value: string) => void;
  handleAdd: () => void;
  label: string;
  buttonText: string;
  isEmailField?: boolean;
}

function RemovableListInput({
  items,
  handleDelete,
  handleChange,
  handleAdd,
  label,
  buttonText,
  isEmailField,
}: RemovableListInputProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  function openDeleteItemDialog(index: number) {
    setDeleteIndex(index);
    setIsDialogOpen(true);
  }

  function closeDeleteItemDialog() {
    setIsDialogOpen(false);
  }

  function confirmDelete() {
    if (deleteIndex !== null) {
      handleDelete(deleteIndex);
    }
    closeDeleteItemDialog();
  }

  return (
    <div className="info-container">
      <InfoLabel text={label} />
      <div className="info-inputs">
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <TextField
              required
              type={isEmailField ? "email" : "tel"}
              error={
                ((isEmailField && !isValidEmail(item)) ||
                  (!isEmailField && !isValidPhoneNumber(item))) &&
                item !== ""
              }
              helperText={
                ((isEmailField && !isValidEmail(item)) ||
                  (!isEmailField && !isValidPhoneNumber(item))) &&
                item !== ""
                  ? `Invalid ${isEmailField ? "email address" : "phone number"}`
                  : null
              }
              fullWidth
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              InputProps={{
                style: { fontFamily: "Helvetica Neue" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => openDeleteItemDialog(index)}
                      edge="end"
                    >
                      <DeleteOutline />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        ))}
      </div>
      <Button
        variant="contained"
        color="inherit"
        size="small"
        onClick={handleAdd}
        sx={{
          marginTop: "16px",
          fontFamily: "inherit",
          border: "none",
          boxShadow: "none",
        }}
      >
        {buttonText}
      </Button>
      <DeleteItemDialog
        opened={isDialogOpen}
        onCancel={closeDeleteItemDialog}
        onDelete={confirmDelete}
      />
    </div>
  );
}

export default RemovableListInput;
