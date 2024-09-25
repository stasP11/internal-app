import { useContext, useEffect, useMemo } from "react";
import { PageInfoContext } from "contexts/PageInfoContext";
import DataStewardsTable from "components/DataStewardsTable/DataStewardsTable";
import { useFetchWithMsal2 } from "hooks/useFetchWithMsal";
import { protectedResources } from "authConfig";
import { getFromLocalStorage } from "services/storageInterection";
import useDataStewardsDetails from "hooks/swr-hooks/useDataStewardsDetails";
import { CircularProgress } from "@mui/material";

export type DataSteward = {
  id: number;
  name: string;
  active: DataStewardActiveStatus;
  email: string;
  country?: string;
  distributor_id?: string;
};

export type DataStewardActiveStatus = 1 | 0;

type DataStewardsRowData = DataSteward & { idx: number };

function DataStewardsPage() {
  const { setPageInfo } = useContext(PageInfoContext);

  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { data, isLoading } = useDataStewardsDetails(
    authResult,
    selectedCountry
  );

  const dataStewardsData = data?.data || [];

  useEffect(() => {
    setPageInfo({
      headerContent: "Data Stewards",
    });
  }, []);

  function getDataStewardsRowData(data: DataSteward[]): DataStewardsRowData[] {
    return data.map((dataSteward, index) => ({
      ...dataSteward,
      idx: index + 1,
      id: index + 1,
    }));
  }

  const dataStewardsRowData = useMemo(() => {
    if (Array.isArray(dataStewardsData)) {
      return getDataStewardsRowData(dataStewardsData);
    }
    return [];
  }, [dataStewardsData]);

  return (
    <>
      {isLoading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <DataStewardsTable
          dataStewards={dataStewardsData?.length > 0 ? dataStewardsRowData : []}
          country={selectedCountry}
          authResult={authResult}
        />
      )}
    </>
  );
}

export default DataStewardsPage;
