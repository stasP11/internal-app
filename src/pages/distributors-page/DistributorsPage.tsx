import DistributorsTable from "components/DistributorsTable/DistributorsTable";
import useDistributorsDetails from "hooks/swr-hooks/useDistributorsDetails";
import { useFetchWithMsal2 } from "../../hooks/useFetchWithMsal";
import { protectedResources } from "../../authConfig";
import { getFromLocalStorage } from "../../services/storageInterection";
import { CircularProgress } from "@mui/material";
import { useMemo, useEffect, useContext, useState } from "react";
import { PageInfoContext } from "../../contexts/PageInfoContext";
import DistributorDetailsPage from "pages/distributor-details-page/DistributorDetailsPage";
import { useDistributorToShow } from "contexts/DistributorDetailsContext";
import {
  DistributorType,
  DistributorTypeWithIndex,
} from "components/DistributorsTable/types";

function getDistributorsRowData(
  data: DistributorType[]
): DistributorTypeWithIndex[] {
  return data.map((distributor, index) => ({
    idx: index + 1,
    ...distributor,
  }));
}

export default function DistributorsPage() {
  const { distributorToShowId, setDistributorToShowId } =
    useDistributorToShow();

  const { setPageInfo } = useContext(PageInfoContext);
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { data, isLoading } = useDistributorsDetails(
    authResult,
    selectedCountry
  );

  const distributors: DistributorType[] = data?.data;

  useEffect(() => {
    setPageInfo({
      headerContent: "Distributors",
    });
  }, []);

  const rowData = useMemo(() => {
    if (Array.isArray(distributors)) {
      return getDistributorsRowData(distributors);
    }
    return [];
  }, [distributors]);

  const distributorToShow = distributors?.find(
    (distributor) => distributor.distributor_id === distributorToShowId
  );

  const distributorToShowWithPhoneArray = distributorToShow && {
    ...distributorToShow,
    phone: distributorToShow.phone.split(", ").filter(Boolean),
  };

  function handleRowClick(id: number) {
    setDistributorToShowId(id);
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
          rowData={distributors?.length > 0 ? rowData : []}
        />
      )}
    </>
  );
}
