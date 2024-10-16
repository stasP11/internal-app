import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

interface DataStewardFormProps {
  name: string;
  email: string;
  status: number;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onStatusChange: (status: number) => void;
  isValidEmail: boolean;
  isEmailDuplicate: boolean;
}

const DataStewardForm = ({
  name,
  email,
  status,
  onNameChange,
  onEmailChange,
  onStatusChange,
  isValidEmail,
  isEmailDuplicate,
}: DataStewardFormProps) => {
  return (
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
        onChange={(e) => onNameChange(e.target.value)}
        fullWidth
      />
      <TextField
        label="Email"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        fullWidth
        error={(!isValidEmail || isEmailDuplicate) && email !== ""}
        helperText={
          email === ""
            ? null
            : !isValidEmail
            ? "Invalid email address"
            : isEmailDuplicate
            ? "Email already exists in our system"
            : null
        }
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => onStatusChange(Number(e.target.value))}
          fullWidth
        >
          <MenuItem value={1}>
            <StatusLabel color="#94D244" text="Active" />
          </MenuItem>
          <MenuItem value={0}>
            <StatusLabel color="#E05781" text="On Hold" />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const StatusLabel = ({ color, text }: { color: string; text: string }) => (
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
        background: color,
        borderRadius: "50%",
        marginTop: "-2px",
      }}
    ></div>
    <span style={{ lineHeight: "24px", fontFamily: "Helvetica Neue" }}>
      {text}
    </span>
  </div>
);

export default DataStewardForm;
