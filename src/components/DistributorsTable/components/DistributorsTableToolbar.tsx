import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import CustomShareButton from "./CustomShareButton";

export default function DistributorsTableToolbar() {
  return (
    <GridToolbarContainer
      style={{ padding: "16px", display: "flex", gap: "16px" }}
    >
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <CustomShareButton />
    </GridToolbarContainer>
  );
}
