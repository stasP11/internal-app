import React from 'react';
import { ChangeEvent, useState, useEffect, useRef } from "react";
import {
  Typography,
  Popover,
} from "@mui/material";

function BasicPopover({ targetEvent, setTargetEvent, children }: any) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  
    useEffect(() => {
      setAnchorEl(targetEvent);
    }, [targetEvent]);
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(targetEvent);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setTargetEvent(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
  
    return (
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography>{children}</Typography>
        </Popover>
      </div>
    );
}

export default BasicPopover