import DistributorsTable from "components/DistributorsTable/DistributorsTable";
import useDistributorsDetails from "hooks/swr-hooks/useDistributorsDetails";
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";
import { protectedResources } from "../../authConfig";
import { getFromLocalStorage } from "../../services/storageInterection";
import { CircularProgress } from "@mui/material";
import { useMemo, useEffect, useContext } from "react";
import {
  DistributorDetails,
  DistributorRowData,
} from "components/DistributorsTable/types";
import { PageInfoContext } from "../../contexts/PageInfoContext";

function getDistributorsRowData(
  data: DistributorDetails[]
): DistributorRowData[] {
  return data.map((distributor, index) => ({
    idx: index + 1,
    distributorId: distributor.distributor_id,
    distributorName: [distributor.distributor_name, distributor.distributor_id],
    email: distributor.emails.join(", "),
    phone: distributor.phone,
    injectionChannels: distributor.injection_channels,
    active: distributor.active,
  }));
}

export default function DistributorsPage() {
  const { setPageInfo } = useContext(PageInfoContext);
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { data, isLoading } = useDistributorsDetails(
    authResult,
    selectedCountry
  );
  const distributorsData = data?.data;

  useEffect(() => {
    setPageInfo({
      headerContent: "Distributors",
    });
  }, []);

  const rowData = useMemo(() => {
    if (Array.isArray(distributorsData)) {
      return getDistributorsRowData(distributorsData);
    }
    return [];
  }, [distributorsData]);

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
        <DistributorsTable
          country={selectedCountry}
          authResult={authResult}
          rowData={distributorsData?.length > 0 ? rowData : []}
        />
      )}
    </>
  );
}
