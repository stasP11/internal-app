import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import InfoLabel from "../InfoLabel/InfoLabel";
import { DeleteOutline } from "@mui/icons-material";

interface RemovableListInputProps {
  items: string[];
  handleDelete: (index: number) => void;
  handleChange: (index: number, value: string) => void; // Define expected parameters correctly
  handleAdd: () => void;
  label: string;
  buttonText: string;
}

function RemovableListInput({
  items,
  handleDelete,
  handleChange,
  handleAdd,
  label,
  buttonText,
}: RemovableListInputProps) {
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
              fullWidth
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              InputProps={{
                style: { fontFamily: "Helvetica Neue" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleDelete(index)} edge="end">
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
    </div>
  );
}

export default RemovableListInput;
