import DistributorsTable from "components/DistributorsTable/DistributorsTable";
import useDistributorsDetails from "hooks/swr-hooks/useDistributorsDetails";
import { useFetchWithMsal2 } from "../../hooks/useFetchWithMsal";
import { protectedResources } from "../../authConfig";
import { getFromLocalStorage } from "../../services/storageInterection";
import { CircularProgress } from "@mui/material";
import { useMemo, useEffect, useContext, useState } from "react";
import {
  DistributorDetailsType,
  DistributorRowData,
} from "components/DistributorsTable/types";
import { PageInfoContext } from "../../contexts/PageInfoContext";
import DistributorDetailsPage from "pages/distributor-details-page/DistributorDetailsPage";
import { getUniqueEmails } from "utils/getUniqueEmails";

function getDistributorsRowData(
  data: DistributorDetailsType[]
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
  const [distributorToShowId, setDistributorToShowId] = useState<number | null>(
    null
  );
  const { setPageInfo } = useContext(PageInfoContext);
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { data, isLoading } = useDistributorsDetails(
    authResult,
    selectedCountry
  );
  const distributorsData: DistributorDetailsType[] = data?.data.map(
    (distributor: DistributorDetailsType) => {
      return {
        ...distributor,
        emails: getUniqueEmails(distributor.emails),
      };
    }
  );

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

  const distributorToShow = distributorsData?.find(
    (distributor) => distributor.distributor_id === distributorToShowId
  );

  const distributorToShowWithPhoneArray = distributorToShow && {
    ...distributorToShow,
    phone: distributorToShow.phone.split(", ").filter(Boolean),
  };

  function handleRowClick(id: number) {
    /*temporarily inactive functionality*/
   // setDistributorToShowId(id);
  }

  if (distributorToShowWithPhoneArray) {
    return (
      <DistributorDetailsPage
        setDistributorToShowId={setDistributorToShowId}
        distributor={distributorToShowWithPhoneArray}
      />
    );
  }
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
          handleRowClick={handleRowClick}
          country={selectedCountry}
          authResult={authResult}
          rowData={distributorsData?.length > 0 ? rowData : []}
        />
      )}
    </>
  );
}
