import { Box, Typography } from "@mui/material";

function CustomLegendLabel({
  bgColor,
  label,
  shape,
}: {
  bgColor: string;
  label: string;
  shape?: string;
}) {
  const labelTextStyles = {
    fontFamily: "Helvetica Neue",
    fontWeight: "400",
    fontSize: 12,
    color: "var(--grey-700)",
  };
  const rectangleStyles = {
    width: "8px",
    height: "2px",
    bgcolor: bgColor,
    mr: 1,
    alignSelf: "center",
  };

  const circleStyles = {
    width: "8px",
    height: "8px",
    bgcolor: bgColor,
    mr: 1,
    borderRadius: "50%",
  };
  return (
    <Box display="flex" alignItems="baseline">
      {shape === "rectangle" ? (
        <Box sx={rectangleStyles} />
      ) : (
        <Box sx={circleStyles} />
      )}
      <Typography variant="body2" sx={labelTextStyles}>
        {label}
      </Typography>
    </Box>
  );
}

export default CustomLegendLabel;
