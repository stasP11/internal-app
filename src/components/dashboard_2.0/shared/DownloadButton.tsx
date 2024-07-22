import { Button } from "@mui/material";
import { ReactComponent as IconDownload } from "../../../icons/download/Transition-Download-Simple.svg";

const downloadBtnStyles = {
  marginLeft: "8px",
  border: "1px solid var(--grey-300)",
  height: "20px",
  width: "20px",
  minWidth: "0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0",
  "& .MuiButton-startIcon": {
    margin: "0",
  },
};

function DownloadButton() {
  return <Button sx={downloadBtnStyles} startIcon={<IconDownload />} />;
}

export default DownloadButton;
