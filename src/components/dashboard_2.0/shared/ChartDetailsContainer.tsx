import { Box } from "@mui/material";
import { ReactNode } from "react";

function ChartDetailsContainer({ children }: { children: ReactNode }) {
  const styles = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  };

  return <Box sx={styles}>{children}</Box>;
}

export default ChartDetailsContainer;
