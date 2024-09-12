import { MenuItem, TextField } from "@mui/material";
import { DistributorActiveStatus } from "components/DistributorsTable/types";

interface SelectStatusFieldProps {
  value: DistributorActiveStatus;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

function SelectStatusField({ value, onChange }: SelectStatusFieldProps) {
  return (
    <TextField
      fullWidth
      select
      label="Status"
      value={value === 1 ? "Active" : "On-hold"}
      onChange={onChange}
    >
      <MenuItem value="Active">
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
          <span style={{ lineHeight: "24px", fontFamily: "Helvetica Neue" }}>
            Active
          </span>
        </div>
      </MenuItem>
      <MenuItem value="On-hold">
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
          <span style={{ lineHeight: "24px", fontFamily: "Helvetica Neue" }}>
            On-hold
          </span>
        </div>
      </MenuItem>
    </TextField>
  );
}

export default SelectStatusField;
