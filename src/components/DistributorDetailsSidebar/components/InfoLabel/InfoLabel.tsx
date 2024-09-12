import { Typography } from "@mui/material";

function InfoLabel({ text }: { text: string }) {
  return (
    <Typography
      sx={{
        fontSize: 14,
        color: "inherit",
        fontFamily: "inherit",
        lineHeight: "48px",
      }}
      variant="h6"
    >
      {text}
    </Typography>
  );
}

export default InfoLabel;
