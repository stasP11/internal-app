import "./EmailStatuses.scss";
import Chip from "@mui/material/Chip";

function EmailStatuses({ emailType }: any) {
  const chipStyles = {
    fontSize: "13px",
    fontFamily: "Helvetica Neue",
    lineHeight: "18px",
    color: "#FFF",
  };
  console.log(emailType, emailType === "Success", "emailType");
  if (emailType === "Success") {
    return (
      <Chip
        label="Success"
        sx={{
          backgroundColor: "rgba(102, 181, 18, 1)",
          ...chipStyles,
        }}
      />
    );
  } else if (emailType === "Error") {
    return (
      <Chip
        label="Error"
        sx={{ backgroundColor: "rgba(224, 87, 129, 1)", ...chipStyles }}
      />
    );
  } else if (emailType === "Info") {
    return (
      <Chip
        label="Info"
        sx={{ backgroundColor: "rgba(53, 160, 254, 1)", ...chipStyles }}
      />
    );
  } else if (emailType === "Attention") {
    return (
      <Chip
        label="Attention"
        sx={{ backgroundColor: "rgba(223, 147, 0, 1)", ...chipStyles }}
      />
    );
  } else {
    return (
      <Chip
        label="Unclear"
        sx={{
          ...chipStyles,
        }}
      />
    );
  }
}

export default EmailStatuses;