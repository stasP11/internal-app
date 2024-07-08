import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { CustomButton } from "./CustomButton";
import MailOutlineIcon from "@mui/icons-material/MailOutline";


export default function DistributorsTableToolbar() {
  return (
    <GridToolbarContainer
      style={{ padding: "16px", display: "flex", gap: "16px" }}
    >
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <CustomButton IconComponent={MailOutlineIcon} buttonText="Share" handleClick={()=> console.log('Share button clicked')}/>
    </GridToolbarContainer>
  );
}
