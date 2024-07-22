import { Box } from "@mui/material";
import CustomLegendLabel from "./CustomLegendLabel";
import { CustomLegendProps } from "./types";

function CustomLegend({ legendConfig }: CustomLegendProps) {
  return (
    <Box display="flex" alignItems={"center"} gap={1}>
      {legendConfig.map((legend) => (
        <CustomLegendLabel
          key={legend.label}
          bgColor={legend.color}
          label={legend.label}
          shape={legend.shape}
        />
      ))}
    </Box>
  );
}

export default CustomLegend;
