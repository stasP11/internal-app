import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function CustomizedSwitches({ value, label, onChange }: any) {
  return (
      <FormGroup sx={{ width: "180px" }}>
        <FormControlLabel
          control={
            <Switch
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          }
          label={label}
        />
      </FormGroup>
  );
}
