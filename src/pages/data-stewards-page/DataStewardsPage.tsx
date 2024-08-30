import { useContext, useEffect, useMemo } from "react";
import { PageInfoContext } from "contexts/PageInfoContext";
import { DataSteward, mockDataStewards } from "./mockDataStewards";
import DataStewardsTable from "components/DataStewardsTable/DataStewardsTable";

type DataStewardsRowData = DataSteward & { idx: number };

function DataStewardsPage() {
  const { setPageInfo } = useContext(PageInfoContext);

  // TODO: when endpoint for Data Stewards will be created

  //   const { error: authError, result: authResult }: any = useFetchWithMsal2({
  //     scopes: protectedResources.apiTodoList.scopes.read,
  //   });
  //   const selectedCountry = getFromLocalStorage("selectedCountry");
  //   const { data, isLoading } = useDataStewardsData(authResult, selectedCountry);
  //   const dataStewardsData = data?.data;

  const dataStewardsData = mockDataStewards;

  useEffect(() => {
    setPageInfo({
      headerContent: "Data Stewards",
    });
  }, []);

  function getDataStewardsRowData(data: DataSteward[]): DataStewardsRowData[] {
    return data.map((dataSteward, index) => ({
      idx: index + 1,
      ...dataSteward,
    }));
  }

  const dataStewardsRowData = useMemo(() => {
    if (Array.isArray(dataStewardsData)) {
      return getDataStewardsRowData(dataStewardsData);
    }
    return [];
  }, [dataStewardsData]);

  return (
    // TODO: to implement when we have endpoint and hook for real data
    // <>
    //   {isLoading ? (
    //     <CircularProgress
    //       sx={{
    //         position: "absolute",
    //         top: "50%",
    //         left: "50%",
    //         transform: "translate(-50%, -50%)",
    //       }}
    //     />
    //   ) : (
    //     <ProductsTable
    //       products={productsData?.length > 0 ? productsRowData : []}
    //     />
    //   )}
    // </>
    <DataStewardsTable
      dataStewards={dataStewardsData?.length > 0 ? dataStewardsRowData : []}
    />
  );
}

export default DataStewardsPage;
