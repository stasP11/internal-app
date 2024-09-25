import { Box, CircularProgress, Divider, Paper } from "@mui/material";
import { protectedResources } from "authConfig";
import BackButton from "components/BackButton/BackButton";
import DistributorChannelManagement from "components/DistributorChannelManagement/DistributorChannelManagement";
import DistributorDetailsSidebar from "components/DistributorDetailsSidebar/DistributorDetailsSidebar";
import { DistributorWithPhoneArray } from "components/DistributorsTable/types";
import { PageInfoContext } from "contexts/PageInfoContext";
import { useFetchWithMsal2 } from "hooks/useFetchWithMsal";
import { useContext, useEffect, useState } from "react";

function DistributorDetailsPage({
  distributor,
  setDistributorToShowId,
}: {
  setDistributorToShowId: (id: number | null) => void;
  distributor: DistributorWithPhoneArray;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setPageInfo } = useContext(PageInfoContext);
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

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

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1000,
  };

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
        {isLoading && (
          <Box sx={overlayStyle}>
            <CircularProgress />
          </Box>
        )}
        <DistributorDetailsSidebar
          authResult={authResult}
          distributor={distributor}
          setIsLoading={setIsLoading}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <DistributorChannelManagement />
      </Box>
    </Paper>
  );
}

export default DistributorDetailsPage;
