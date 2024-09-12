import { Box, FormControlLabel, Switch } from "@mui/material";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
// import { CustomButton } from "components/DistributorsTable/components/CustomButton";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";

function EmailsDatagridTableToolbar() {
  return (
    <GridToolbarContainer
      style={{
        padding: "16px 0px",
        fontFamily: "Helvetica Neue",
      }}
    >
      <FormControlLabel
        sx={{
          "& .MuiFormControlLabel-label": {
            fontFamily: "Helvetica Neue",
          },
        }}
        control={<Switch defaultChecked />}
        label="Enable channel"
      />
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          ".MuiButtonBase-root": {
            fontFamily: "inherit",
            color: "#0091DF",
          },
        }}
      >
        <GridToolbarExport />
        {/* <CustomButton
          IconComponent={MailOutlineIcon}
          buttonText="Share"
          handleClick={() => console.log("Share button clicked")}
        /> */}
      </Box>
      <FormControlLabel
        sx={{
          marginLeft: "auto",
          "& .MuiFormControlLabel-label": {
            fontFamily: "Helvetica Neue",
          },
        }}
        control={<Switch />}
        label="Reply to sender only"
      />
    </GridToolbarContainer>
  );
}

export default EmailsDatagridTableToolbar;
