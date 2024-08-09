import { Switch } from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function ToggleActiveSwitch({
  initialValue, rowValue, onSwitch
}: any) {
  const [checked, setChecked] = useState(initialValue);



  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSwitch(rowValue, event.target.checked)
    setChecked(event.target.checked);
  };

  return <Switch checked={checked} onChange={handleChange} size="small" />;
}
