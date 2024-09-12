import { Box, Divider, Paper } from "@mui/material";
import BackButton from "components/BackButton/BackButton";
import DistributorChannelManagement from "components/DistributorChannelManagement/DistributorChannelManagement";
import DistributorDetailsSidebar from "components/DistributorDetailsSidebar/DistributorDetailsSidebar";
import { DistributorWithPhoneArray } from "components/DistributorsTable/types";
import { PageInfoContext } from "contexts/PageInfoContext";
import { useContext, useEffect } from "react";

function DistributorDetailsPage({
  distributor,
  setDistributorToShowId,
}: {
  setDistributorToShowId: (id: number | null) => void;
  distributor: DistributorWithPhoneArray;
}) {
  const { setPageInfo } = useContext(PageInfoContext);

  function onBackButtonClick() {
    setDistributorToShowId(null);
    setPageInfo({
      button: null,
      headerContent: "Distributors",
    });
  }

  useEffect(() => {
    setPageInfo({
      button: <BackButton onClick={onBackButtonClick} />,
      headerContent: distributor.distributor_name,
    });
  }, []);

  return (
    <Paper elevation={1} sx={{ borderRadius: "4px", overflow: "hidden" }}>
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: "75vh", xl: "85vh" },
          background: "#fff",
          display: "flex",
        }}
      >
        <DistributorDetailsSidebar distributor={distributor} />
        <Divider orientation="vertical" variant="middle" flexItem />
        <DistributorChannelManagement />
      </Box>
    </Paper>
  );
}

export default DistributorDetailsPage;
