import Chip from "@mui/material/Chip";
import { capitalizeFirstLetter } from "utils/capitalizeFirstLetter";

export function ReportStatus({ label, small }: any) {
  const ListOfStatusTypes: any = {
    REWORK: {
      background: "rgba(250, 240, 243, 1)",
      color: "#D12953",
      "&:hover": {
        background: "rgb(255, 189, 205)",
      },
    },
    PROCESSING: {
      background: "rgba(225, 252, 239, 1)",
      color: "#14804A",
    },

    MISSING: {
      background: "rgba(250, 240, 243, 1)",
      color: "#D12953",
      "&:hover": {
        background: "rgb(255, 189, 205)",
      },
    },

    REVIEW: {
      background: "#FCF2E6",
      color: "#AA5B00",
    },
    SUCCESS: {
      background: "#E1FCEF",
      color: "#14804A",
    },
    APPROVED: {
      background: "#E1FCEF",
      color: "#14804A",
    },
  };

  return (
    <Chip
      sx={{
        ...ListOfStatusTypes[label],
        fontSize: small ? "12px" : "14px",
        fontFamily: "Helvetica Neue",
        lineHeight: "18px",
        letterSpacing: "0.03em",
        padding: "1px 10px",
        "& .MuiChip-label": {
          padding: "0px",
        },
      }}
      size="small"
      label={capitalizeFirstLetter(label)}
    />
  );
}
