import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
// import { CustomButton } from "../DistributorsTable/components/CustomButton";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { ReactNode } from "react";

interface DatagridTableToolbarProps {
  children?: ReactNode;
}

export default function DatagridTableToolbar({
  children,
}: DatagridTableToolbarProps) {
  return (
    <GridToolbarContainer
      style={{ padding: "16px", display: "flex", gap: "16px" }}
    >
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      {/* <CustomButton
        IconComponent={MailOutlineIcon}
        buttonText="Share"
        handleClick={() => console.log("Share button clicked")}
      /> */}
      {children}
    </GridToolbarContainer>
  );
}
