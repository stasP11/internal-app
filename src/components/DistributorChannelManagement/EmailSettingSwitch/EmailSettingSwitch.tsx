import { Switch } from "@mui/material";
import { ChangeEvent } from "react";

interface EmailSettingSwitchProps {
  value: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  id: number;
}

function EmailSettingSwitch({ value, onChange, id }: EmailSettingSwitchProps) {
  return (
    <Switch
      checked={value}
      onChange={(event) => onChange(event, id)}
      size="small"
    />
  );
}

export default EmailSettingSwitch;
