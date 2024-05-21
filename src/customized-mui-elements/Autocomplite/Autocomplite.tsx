import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function AutocompleteComponent({ data, onChoose, label }: any) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChoose = (event: any, value: any) => {
    console.log(value, "value");
    setSelectedValue(value ? value.label : null);
  };

  const handleOkClick = () => {
    onChoose(selectedValue);
  };

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        sx={{ width: 300 }}
        onChange={handleChoose}
        renderInput={(params) => (
          <TextField {...params} label={label} />
        )}
      />

      <Button onClick={handleOkClick}>Ok</Button>
    </>
  );
}
