import { Snackbar, Button, IconButton } from "@mui/material";
import CrossIcon from "icons/cross/_Icon_.svg";

const MultiSelectorSnackBar = ({
  isOpen,
  onClose,
  onApprove,
  materialNumber,
  numbersOfSimilarCases,
}: any) => {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      message={`Do you want to apply changes for ${numbersOfSimilarCases} similar cases in this report?`}
      action={
        <>
          <Button
            color="primary"
            size="small"
            onClick={() => onApprove(materialNumber)}
          >
            YES
          </Button>
          <IconButton onClick={() => onClose()}>
            <img src={CrossIcon} alt="cross" />
          </IconButton>
        </>
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Positioning at the bottom center
      sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: "#3c3c3c", // Dark background like in the image
          color: "white",
        },
      }}
    />
  );
};

export default MultiSelectorSnackBar;
