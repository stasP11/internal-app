import { Switch } from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function ToggleaSwitch({ initialValue }: { initialValue: boolean }) {
    const [checked, setChecked] = useState(initialValue);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };
  
    return <Switch checked={checked} onChange={handleChange} size="small" />;
  }