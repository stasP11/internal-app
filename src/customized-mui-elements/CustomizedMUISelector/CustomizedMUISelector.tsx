import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface CustomizedMUISelectorProps {
  data: any[]; // Assuming data is an array of strings, adjust type as needed
  value: any; // Assuming value is a string, adjust type as needed
  label: string;
  onUpdate: any;
  isDisabled?: boolean;
}

const CustomizedMUISelector: React.FC<CustomizedMUISelectorProps> = ({
  data,
  value,
  label,
  onUpdate,
  isDisabled,
}): JSX.Element => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        sx={{ textAlign: "left" }}
        value={value}
        label={label}
        fullWidth
        onChange={onUpdate}
        disabled={isDisabled}
      >
        {data.map((period: any) => (
          <MenuItem key={period} value={period}>
            {period}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomizedMUISelector;
