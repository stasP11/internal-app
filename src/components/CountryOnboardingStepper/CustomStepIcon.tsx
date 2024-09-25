import { Box, StepIconProps, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  const commonStyles = {
    width: "24px",
    lineHeight: "24px",
    borderRadius: "50%",
    textAlign: "center",
    backgroundColor: "rgb(7, 122, 7)",
    color: "white",
  };

  if (completed) {
    return <CheckCircleOutlineIcon style={{ color: "#0091DF" }} />;
  }

  if (active) {
    return (
      <Box
        sx={{
          ...commonStyles,
          bgcolor: "#0091DF",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "white", fontSize: "14px", lineHeight: "24px" }}
        >
          {icon}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...commonStyles,
        bgcolor: "#ECEFF1",
        color: "#10384F",
      }}
    >
      <Typography
        variant="caption"
        component="div"
        sx={{ fontSize: "14px", lineHeight: "24px" }}
      >
        {icon}
      </Typography>
    </Box>
  );
}

export default CustomStepIcon;
