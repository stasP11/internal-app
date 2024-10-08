import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = ["View", "Approve", "Reject"];

const ITEM_HEIGHT = 48;

// onReject, onApprove, onView

export default function TableMenuPopup({ onSelect, params }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChoose = (value) => {
    onSelect(value);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={() =>
            handleChoose({
              selectedAction: "view",
              params: params?.row,
            })
          }
        >
          View report
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleChoose({
              selectedAction: "view",
              params: params?.row,
            })
          }
        >
          Approve report
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleChoose({
              selectedAction: "reject",
              params: params?.row,
            })
          }
        >
          Reject report
        </MenuItem>
      </Menu>
    </div>
  );
}
