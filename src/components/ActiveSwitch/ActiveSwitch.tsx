import { Switch } from "@mui/material";
import { ChangeEvent } from "react";

interface ActiveSwitchProps {
  value: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ActiveSwitch({ value, onChange }: ActiveSwitchProps) {
  return <Switch checked={value} onChange={onChange} size="small" />;
}
