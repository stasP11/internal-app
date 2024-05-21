import Chip from "@mui/material/Chip";

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
    MISSED: {
      background: "grey",
      color: "white",
    },
  };

  return (
    <Chip
      sx={{
        ...ListOfStatusTypes[label],
        fontSize: small ? "12px" : "14px",
        marginBottom: small ? "5px" : "0",
      }}
      size="small"
      label={label}
    />
  );
}
