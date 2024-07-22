import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type ChartContainerProps = {
  title: ReactNode;
  children: ReactNode;
};

const cardStyles = {
  width: 550,
  p: "24px",
  boxShadow: "0px 4px 5px 0px #C2C2C233",
  bgcolor: "#fff",
};

function ChartContainer({ title, children }: ChartContainerProps) {
  return (
    <>
      <Box sx={cardStyles}>
        <Typography
          color={"var(--grey-800)"}
          mb={"12px"}
          variant="h5"
          textAlign={"left"}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </>
  );
}

export default ChartContainer;
