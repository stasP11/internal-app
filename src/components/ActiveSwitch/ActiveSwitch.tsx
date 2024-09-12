import { Switch } from "@mui/material";
import { ChangeEvent } from "react";

interface ActiveSwitchProps {
  value: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ActiveSwitch({ value, onChange }: ActiveSwitchProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <Switch
      checked={value}
      onClick={handleClick}
      onChange={handleChange}
      size="small"
    />
  );
}
