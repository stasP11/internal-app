import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";

function SftpTab() {
  const textFieldStyles = {
    width: "360px",
    marginBottom: "16px",
    "& .MuiInputBase-input": {
      fontFamily: "Helvetica Neue",
    },
  };
  return (
    <Box>
      <Box sx={{ paddingBlock: "16px" }}>
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontFamily: "Helvetica Neue",
            },
          }}
          control={<Switch defaultChecked />}
          label="Enable channel"
        />
      </Box>
      <FormGroup sx={{ fontFamily: "Helvetica Neue" }}>
        <TextField
          sx={textFieldStyles}
          label="Username"
          variant="outlined"
          size="medium"
        />
        <TextField
          sx={textFieldStyles}
          label="IP address"
          variant="outlined"
          size="medium"
        />
        <TextField
          sx={textFieldStyles}
          label="Port"
          variant="outlined"
          size="medium"
        />
      </FormGroup>
    </Box>
  );
}

export default SftpTab;
