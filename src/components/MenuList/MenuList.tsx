import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface OptionType {
  value: string;
  label: string;
}

interface MenuListProps {
  label: string;
  options: OptionType[];
  onSelect: (value: string) => void;
}

function MenuList({ label, options, onSelect }: MenuListProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: string) => {
    onSelect(value);
    handleClose();
  };

  const isOpen = Boolean(anchorEl);

  const btnStyles = {
    fontFamily: "Helvetica Neue",
    lineHeight: "24px",
    padding: "6px 16px",
    borderColor: "#0000006B",
  };
  return (
    <Box marginLeft={"auto"}>
      <Button
        sx={btnStyles}
        variant="outlined"
        size="medium"
        color="inherit"
        onClick={handleClick}
        endIcon={isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      >
        {label}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleMenuItemClick(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MenuList;
