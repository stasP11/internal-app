import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton sx={{ marginRight: "8px" }} onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  );
}

export default BackButton;
