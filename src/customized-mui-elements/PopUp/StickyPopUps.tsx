import Popover from '@mui/material/Popover';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export function StickyBottomPopUp({anchorEl, setAnchorEl, children}: any) {


  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
            <div>
            {children}
          </div>
        </ClickAwayListener>
      </Popover>
    </div>
  );
}
