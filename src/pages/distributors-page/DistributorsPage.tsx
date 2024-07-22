import DistributorsTable from "components/DistributorsTable/DistributorsTable";
import useDistributorsDetails from "hooks/swr-hooks/useDistributorsDetails";
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";
import { protectedResources } from "../../authConfig";
import { getFromLocalStorage } from "../../services/storageInterection";
import { CircularProgress } from "@mui/material";
import { useMemo } from "react";
import {
  DistributorDetails,
  DistributorRowData,
} from "components/DistributorsTable/types";

function getDistributorsRowData(
  data: DistributorDetails[]
): DistributorRowData[] {
  return data.map((distributor, index) => ({
    id: index + 1,
    distributorName: [distributor.distributor_name, distributor.distributor_id],
    email: distributor.emails.join(", "),
    phone: distributor.phone,
    injectionChannels: distributor.injection_channels,
    active: Boolean(distributor.active),
  }));
}

export default function DistributorsPage() {
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { data, isLoading } = useDistributorsDetails(
    authResult,
    selectedCountry
  );
  const distributorsData = data?.data;

  const rowData = useMemo(() => {
    if (Array.isArray(distributorsData)) {
      return getDistributorsRowData(distributorsData);
    }
    return [];
  }, [distributorsData]);

  return (
    <>
      {isLoading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {distributorsData?.length > 0 ? (
        <DistributorsTable rowData={rowData} />
      ) : (
        <DistributorsTable rowData={[]} />
      )}
    </>
  );
}
