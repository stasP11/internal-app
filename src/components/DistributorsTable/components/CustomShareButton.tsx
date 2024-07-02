import { Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function CustomShareButton() {
    const handleClick = () => {
    // Open email client
      console.log("SHARE button clicked");
    };
  
    return (
      <Button onClick={handleClick} startIcon={<MailOutlineIcon />}>
        Share
      </Button>
    );
  }